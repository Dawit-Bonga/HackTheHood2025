from fastapi import FastAPI, Request, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from groq import Groq
import os
from dotenv import load_dotenv
from supabase import create_client, Client
import json
from datetime import datetime
from slowapi import Limiter, _rate_limit_exceeded_handler  # Add these
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
load_dotenv()

client = Groq(
    api_key=os.environ.get("GROQ_API_KEY")
)

# Supabase setup
supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_SERVICE_KEY")
supabase: Client = create_client(supabase_url, supabase_key)

app = FastAPI()
security = HTTPBearer()

#gets their address
limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5175",
        "http://localhost:5176",
        "http://localhost:5177",
        "https://hack-the-hood2025.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Verify Supabase JWT token
async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    
    # Dev mode bypass (optional - for local testing)
    if os.getenv('DEV_MODE') == 'true' and token == 'dev-token-bypass':
        from types import SimpleNamespace
        return SimpleNamespace(id='dev-user-123', email='dev@test.com')
    
    try:
        user = supabase.auth.get_user(token)
        return user.user
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials"
        )


def validate_roadmap_input(data):
    """Validate user input to prevent abuse"""
    # Check required fields
    required = ['gpa', 'grade', 'interests']
    for field in required:
        if not data.get(field):
            raise HTTPException(status_code=400, detail=f"Missing required field: {field}")
    
    # Validate GPA
    try:
        gpa = float(data.get('gpa'))
        if not 0 <= gpa <= 5:
            raise HTTPException(status_code=400, detail="GPA must be between 0 and 5")
    except (ValueError, TypeError):
        raise HTTPException(status_code=400, detail="Invalid GPA format")
    
    # Validate string lengths (prevent spam/abuse)
    text_fields = {
        'interests': 2000,
        'activities': 2000,
        'demographic': 1000,
        'testing': 1000,
        'collegeGoals': 1000,
        'classes': 2000,
        'location': 500
    }
    
    for field, max_length in text_fields.items():
        value = data.get(field, '')
        if len(str(value)) > max_length:
            raise HTTPException(
                status_code=400, 
                detail=f"{field} is too long (max {max_length} characters)"
            )

@app.post("/generate")
@limiter.limit("3/minute")
async def generate_roadmap(request: Request, current_user = Depends(get_current_user)):
    data = await request.json()
    
    # Extract data
    validate_roadmap_input(data)
    gpa = data.get("gpa")
    grade = data.get("grade")
    interests = data.get("interests")
    activities = data.get("activities")
    demographic = data.get("demographics")
    testing = data.get("testing")
    goals = data.get("collegeGoals")
    classes = data.get("classes")
    location = data.get("location")
    
#     try:
#         gpa_float = float(gpa)
#         if not 0 <= gpa_float <= 5:  # Allow for weighted GPAs
#             raise HTTPException(status_code=400, detail="GPA must be between 0 and 5")
#     except ValueError:
#         raise HTTPException(status_code=400, detail="Invalid GPA format")

# # Limit string lengths to prevent abuse
#     if len(str(interests)) > 2000 or len(str(activities)) > 2000:
#         raise HTTPException(status_code=400, detail="Input too long")
    # 1. Get Current Date & Logic
    now = datetime.now()
    current_date_str = now.strftime("%B %Y")
    
    # Determine timeline duration
    if "9" in str(grade) or "freshman" in str(grade).lower():
        duration_note = "Start NOW. Cover 9th and 10th grade in semesters, then 11th/12th in detail."
    elif "10" in str(grade) or "sophomore" in str(grade).lower():
        duration_note = "Start NOW. Cover the rest of 10th, all of 11th, and end at Jan of 12th Grade."
    elif "11" in str(grade) or "junior" in str(grade).lower():
        duration_note = "Start NOW. Cover 11th Spring/Summer and 12th Fall/Winter in detail."
    else:
        duration_note = "Start NOW. Focus on Senior Winter/Spring transition to college."

    # 2. STRICT JSON SCHEMA
    # We define this as a template the AI must fill
    # 2. JSON SCHEMA
    json_schema = """
    {
      "student_summary": "A warm, personalized paragraph summarizing their profile.",
      "college_list_suggestions": {
         "reach": ["School A", "School B", "School C"],
         "target": ["School C", "School D", "School E"],
         "safety": ["School E", "School F", "School N"]
      },
      "academic_plan": {
         "course_suggestions": ["Class 1", "Class 2"],
         "testing_strategy": "Advice on SAT/ACT or Portfolio"
      },
      "extracurriculars": {
         "current_optimization": "How to improve current clubs",
         "new_opportunities": ["Opportunity 1", "Opportunity 2"]
      },
      "timeline": [
        {
          "period": "Season/Year", 
          "focus": "Main Theme",
          "tasks": ["Task 1", "Task 2"]
        }
      ]
    }
    """

    # 3. STRATEGIC GUIDELINES (The "Softer" Logic)
    logic_constraints = f"""
    1. TIMELINE CONTEXT: Current date is {current_date_str}. {duration_note}
    2. MANDATORY SECTIONS: Fill every field in the JSON schema.
    
    3. LOCATION STRATEGY: 
       - User Preference: "{location}"
       - Prioritize schools in this region. 
       - However, you may suggest exceptional schools outside this region if they are a perfect academic match or offer better financial aid, but note why.
    
    4. SCHOOL LIST REALISM:
       - Ensure "Safety" schools are actually safe (typically >50% acceptance or local options). 
       - Be cautious with competitive majors. For example, CS at schools like UIUC or Washington is very hard to get into, so they are usually "Targets" or "Reaches" rather than Safeties.
       - For Art majors, schools like RISD or CalArts are Reaches. Look for state schools with good art programs for Safeties.
       
    5. TESTING ADVICE:
       - If they are young (9th/10th), encourage establishing a baseline (PSAT) before deciding to go test-optional.
       - If they are older or strictly against testing, respect their "Test Optional" choice.
       
    6. HOLISTIC PROFILE:
       - Look for connections between their activities. (e.g. If they like Art + Biology, suggest Medical Illustration).
    """

    # 4. Final Prompt
    prompt = (
        f"You are a supportive college admissions mentor. Generate a personalized JSON roadmap.\n"
        f"Student: Grade {grade}, GPA {gpa}, Interests {interests}, Activities {activities}.\n"
        f"Demographics: {demographic}. Testing: {testing}. Goals: {goals}. Location Preference: {location}.\n\n"
        
        f"### STRATEGIC GUIDELINES\n"
        f"{logic_constraints}\n\n"

        f"### OUTPUT INSTRUCTIONS\n"
        f"You must output valid JSON using the exact schema below. Fill in EVERY field.\n"
        f"{json_schema}"
    )

    try:
        print(f"📋 Roadmap request for {grade} student")
        
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "system", 
                    "content": "You are a JSON-only API. You must return valid JSON with all requested fields."
                },
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
            model="llama-3.3-70b-versatile",
            temperature=0.7,
            max_tokens=4000, 
            response_format={"type": "json_object"}
        )
        
        roadmap_content_str = chat_completion.choices[0].message.content
        
        # Verify JSON before returning
        try:
            roadmap_json = json.loads(roadmap_content_str)
        except json.JSONDecodeError:
            print("⚠️ AI generated invalid JSON")
            # You might want to retry here or return an error, but for now we pass it through
            roadmap_json = {"error": "Invalid JSON", "raw": roadmap_content_str}

        # Save to Supabase (saving the raw string for DB)
        try:
            result = supabase.table('roadmaps').insert({
                'user_id': str(current_user.id),
                'gpa': gpa,
                'grade': grade,
                'interests': interests,
                'activities': activities,
                'demographics': demographic,
                'testing': testing,
                'college_goals': goals,
                'location':location,
                'classes': classes,
                'roadmap_content': roadmap_content_str 
            }).execute()
            
            return {"roadmap": roadmap_json, "id": result.data[0]['id']}
        except Exception as db_error:
            print(f"Database error: {str(db_error)}")
            return {"roadmap": roadmap_json, "warning": "Roadmap generated but not saved"}
            
    except Exception as e:
        print(f"Groq API Error: {e}")
        raise HTTPException(
            status_code=500, 
            detail="AI service temporarily unavailable."
        )
      
      
@app.post("/essay")
@limiter.limit("3/minute")
async def grade_essay(request: Request, current_user = Depends(get_current_user)):
    data = await request.json()
    grade = data.get("grade")
    prompt_text = data.get("prompt")
    essay = data.get("essay")
    program = data.get("program")
    word_limit = data.get("word_limit")
    
    word_count = len(essay.split())
    length_instruction = f"Current Word Count: {word_count} words."
    if word_limit:
        length_instruction += f" / Limit: {word_limit} words."
        if word_count > int(word_limit):
            length_instruction += "\nCRITICAL: The student is OVER the limit. Your 'detailed_action_plan' MUST suggest specific cuts or sentences to remove."
        elif word_count < int(word_limit) * 0.6:
            length_instruction += "\nCRITICAL: The essay is significantly UNDER the limit. Suggest areas to expand."
    else:
        length_instruction += " (No specific limit provided, assume standard Common App length of ~650 words)."
    
    # Enhanced JSON Schema
    json_schema = """
    {
      "is_relevant": true,
      "essay_style": "traditional_narrative|experimental|intellectual_exploration|cultural_reflection|humor_based|generic_achievement",
      "cliche_count": 3,
      "shows_vs_tells_ratio": "mostly_tells",
      "risk_assessment": {
        "took_creative_risks": false,
        "risks_paid_off": false,
        "explanation": "Explain what risks they took (or didn't take) and whether they worked"
      },
      "critique_breakdown": {
        "authenticity_and_voice": "Does this sound like a real 17-year-old, not an essay robot?",
        "insight_and_growth": "What did they learn? Is the reflection deep or surface-level?",
        "storytelling_and_impact": "Emotional resonance, imagery, memorable moments",
        "structure_and_craft": "Flow, transitions, intentional choices (even if unconventional)",
        "prompt_responsiveness": "Did they answer the prompt in their own way?"
      },
      "key_strengths": ["Strength 1", "Strength 2"],
      "areas_for_improvement": ["Critical issue 1", "Critical issue 2", "Critical issue 3"],
      "letter_grade": 75,
      "is_this_a_risk_worth_taking": "N/A for generic essays",
      "final_summary": "Would an admissions officer remember this essay a week later?",
      "detailed_action_plan": "Specific next steps with concrete examples from their essay"
    }
    """

    # STRICTER Holistic Review System
    system_instruction = f"""
You are an **EXPERIENCED COLLEGE ADMISSIONS OFFICER** at a highly selective institution (think Stanford, Yale, Amherst).
You've read 10,000+ essays. You can spot generic writing instantly.
Student Context: Grade {grade}, applying to {program}.

### LENGTH CHECK
{length_instruction}

### CRITICAL INSTRUCTION: BE STRICTER WITH GENERIC ESSAYS

**You are TOO LENIENT with generic, safe essays.** The 80-89 range should be reserved for essays that are genuinely strong but not exceptional. Most "sports leadership," "mission trip," or "overcoming adversity" essays belong in the 70-79 range UNLESS they do something truly unique.

### AUTOMATIC PENALTIES (Apply these BEFORE detailed grading)

**CLICHÉ DETECTION (Subtract 5-10 points per category):**
- Contains phrases like: "never give up," "hard work pays off," "believe in yourself," "taught me teamwork," "overcame obstacles," "rose to the challenge"
- Uses inspirational speech language without showing actual words spoken
- Relies on vague abstractions: "dedication," "perseverance," "leadership" without specific examples
- Hollywood ending (last-second shot, dramatic rescue, perfect outcome)

**"TELLS NOT SHOWS" PENALTY (Subtract 5-10 points):**
- Says "I gave an inspirational speech" but doesn't quote what was said
- Says "my teammates were energized" but doesn't describe how
- Uses adjectives instead of scenes: "intense," "important," "valuable lessons"
- Lists what happened without sensory details or dialogue

**GENERIC TOPIC PENALTY (Subtract 5-10 points if all apply):**
- Topic is: sports championship, mission trip, debate tournament win, overcoming injury, or volunteering revelation
- AND the treatment is predictable (problem → effort → success → lesson)
- AND the lesson could apply to anyone ("I learned leadership")
- AND there's no unique personal voice or unexpected angle

**"COULD BE ANYONE" TEST:**
If you can swap the student's name with another applicant and the essay still works → Maximum score is 75.

### GRADING PHILOSOPHY

**RECOGNIZE UNCONVENTIONAL EXCELLENCE:**
These patterns should NEVER be marked down:
- Mundane moments with deep reflection (eating breakfast → philosophy)
- Non-linear/experimental structure that serves a purpose
- Humor with vulnerability
- Small cultural stories (family recipes, language barriers)
- Intellectual curiosity (exploring ideas, not achievements)
- Quiet introspection without drama

**RED FLAGS THAT MUST BE PENALIZED:**
- Generic adversity without personal reflection
- Thesaurus abuse / unnatural vocabulary
- Listing achievements without vulnerability
- Clichés without subversion
- Lack of specific, concrete details
- Savior complex (especially mission trips)
- Resume disguised as essay
- Vague future promises ("I will bring this to your campus")

### SCORING GUIDE (CALIBRATED TO BE STRICTER)

**95-100 (Exceptional - Top 2%):**
Takes creative risks AND lands them perfectly. Unforgettable voice. You'd remember this essay 6 months later. Makes you want to meet this student immediately.
- Example: Opens with grandmother's silence, uses white space on page to show it, ends with understanding communication beyond words

**90-94 (Admit Strong - Top 10%):**
Genuine authenticity, clear vulnerability, sophisticated reflection. Either executes traditional approach flawlessly OR takes risks that mostly work.
- Example: Sports essay that subverts expectations—focuses on benched game where student learned more watching than playing

**85-89 (Strong - Top 25%):**
Solid voice, some vulnerability, clear growth shown (not just stated). Has at least ONE memorable moment or insight. May be safe, but executed very well.
- Example: Volunteer essay with one specific conversation that changed perspective, shows not tells

**80-84 (Good - Top 40%):**
Competent writing, some personal voice, but predictable structure. May have good moments but lacks consistent depth or memorability.
- Example: Music essay with decent reflection but obvious conclusions

**70-79 (Average - Top 60%):**
Generic topic OR generic treatment. Relies on clichés, tells more than shows, lacks distinct voice. The DEFAULT score for "safe" essays.
- Example: Sports championship essay that hits all predictable beats, Hollywood ending, vague lessons

**65-69 (Weak - Bottom 30%):**
Confusing, minimal reflection, reads like resume. Misses the point of personal essays.
- Example: Lists community service hours, talks about impact on others but not self

**< 65 (Concerning):**
Off-topic, incoherent, ethical issues, or extremely short.

### SPECIFIC CALIBRATION EXAMPLES

**"Basketball Championship with Inspirational Speech" Essay:**
- If it includes: generic "never give up" speech, Hollywood ending (last-second shot), vague lessons about leadership, telling not showing
- **Score: 72-76** (not 85!)
- Why: Hits every generic sports essay cliché without subversion

**Same Topic, But Better Version:**
- Opens with the missed free throw in practice the day before
- Focuses on the quiet moment with one teammate, not the whole team
- The shot misses but team still wins, lesson is about trust not heroism
- **Score: 88-91**
- Why: Subverts expectations, shows vulnerability, has specific details

### EVALUATION CHECKLIST

Before assigning score, count:
1. **Clichés used:** Each one = -2 points from baseline 85
2. **"Show not tell" failures:** -5 points if mostly telling
3. **Generic topic + treatment:** -10 points
4. **No specific sensory details:** -5 points
5. **Vague lessons anyone could learn:** -5 points

**Starting baseline for generic essay = 75, NOT 85**

### FEEDBACK TONE

- **For generic essays (70-79):** Be direct but encouraging. "This topic can work, but you're treating it the way 10,000 other students do. What made YOUR experience different?"
- **For strong essays (85+):** Validate specifically what works
- **Always:** Cite 2-3 specific sentences from their essay to prove you read carefully
- **Push for specificity:** Replace every vague statement with "Show us a moment when..."

### FINAL CALIBRATION CHECK

Before submitting score, ask yourself:
1. If this student applied to Stanford, would this essay help or hurt them? (85+ should help)
2. Would I remember this essay next week? (90+ must be yes)
3. Can I picture this student as a real person? (If no → max 75)
4. Did they take ANY creative risk? (If no → probably 70-79)

**Remember: You are STRICTER than you think you need to be. Most essays are average. That's okay.**
"""

    # Enhanced User Prompt with Pre-Grading Checklist
    user_content = f"""
Prompt: {prompt_text}

Student Essay:
{essay}

**MANDATORY PRE-GRADING ANALYSIS:**

Before grading, explicitly count and list:
1. Clichés used (list each phrase)
2. "Telling" vs "Showing" moments (give ratio)
3. Specific sensory details (count them)
4. Whether the topic is generic (yes/no + why)
5. Whether you'd remember this essay in 2 weeks (yes/no + why)

**GRADING PENALTIES TO APPLY:**
- Cliché penalty: ___
- Tells-not-shows penalty: ___
- Generic topic penalty: ___
- Total deduction from baseline: ___

**BASELINE SCORE:** 
- If unconventional/risky essay: Start at 85
- If generic topic with generic treatment: Start at 75
- Apply penalties from there

Now provide your holistic evaluation following this JSON schema:
{json_schema}

**CRITICAL REMINDER:** An 85 means "this essay would help at Stanford." Be honest about whether that's true.
"""
    
    try:
        print(f"✍️ Essay feedback request received for {program}")
        
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": system_instruction
                },
                {
                    "role": "user",
                    "content": user_content,
                }
            ],
            model="llama-3.3-70b-versatile",
            temperature=0.5,  # Lower = more consistent, stricter grading
            top_p=0.85,  # Slightly lower for more focused evaluation
            max_tokens=4000,
            response_format={"type": "json_object"}
        )
        
        feedback_content_str = chat_completion.choices[0].message.content
        
        # Parse JSON response
        try:
            feedback_json = json.loads(feedback_content_str)
        except json.JSONDecodeError:
            feedback_json = {"error": "Invalid JSON", "raw_text": feedback_content_str}
            
        # Save to database
        try:
            result = supabase.table('essays').insert({
                'user_id': str(current_user.id),
                'grade': grade,
                'prompt': prompt_text,
                'essay_text': essay,
                'program': program,
                'feedback': feedback_content_str 
            }).execute()
            
            return {"feedback": feedback_json, "id": result.data[0]['id']}
        except Exception as db_error:
            print(f"Database error: {str(db_error)}")
            return {"feedback": feedback_json, "warning": "Feedback generated but not saved"}
            
    except Exception as e:
        print(f"Groq API Error: {e}")
        raise HTTPException(
            status_code=500, 
            detail="AI service temporarily unavailable."
        )

# Get user's saved roadmaps
@app.get("/roadmaps")
async def get_roadmaps(current_user = Depends(get_current_user)):
    try:
        result = supabase.table('roadmaps').select('*').eq('user_id', str(current_user.id)).order('created_at', desc=True).execute()
        return {"roadmaps": result.data}
    except Exception as e:
        return {"error": str(e)}

# Get user's saved essays
@app.get("/essays")
async def get_essays(current_user = Depends(get_current_user)):
    try:
        result = supabase.table('essays').select('*').eq('user_id', str(current_user.id)).order('created_at', desc=True).execute()
        return {"essays": result.data}
    except Exception as e:
        return {"error": str(e)}