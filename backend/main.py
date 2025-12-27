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
        "http://localhost:5179",
        "http://localhost:5180",
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
    
    # ... (Keep existing word count logic) ...
    word_count = len(essay.split())
    length_instruction = f"Current Word Count: {word_count} words."
    if word_limit:
        length_instruction += f" / Limit: {word_limit} words."
    else:
        length_instruction += " (No specific limit provided)."

    # 1. NEW JSON SCHEMA: COMPONENT SCORING
    json_schema = """
    {
      "pre_grading_analysis": {
        "cliche_count": 0,
        "cliches_found": ["List phrases"],
        "is_generic_topic": true,
        "predicted_impact": "Will the reader yawn or cry?"
      },
      "scoring_breakdown": {
        "voice_and_authenticity": { "score": 15, "max": 20, "reason": "..." },
        "insight_and_growth": { "score": 15, "max": 20, "reason": "..." },
        "storytelling_and_craft": { "score": 15, "max": 20, "reason": "..." },
        "originality_and_risk": { "score": 15, "max": 20, "reason": "..." },
        "prompt_responsiveness": { "score": 15, "max": 20, "reason": "..." }
      },
      "letter_grade": 75,
      "summary_badge": "Generic & Safe | Risky & Raw | Polished but Boring | Exceptional",
      "key_strengths": ["Strength 1", "Strength 2"],
      "areas_for_improvement": ["Fix 1", "Fix 2"],
      "final_summary": "Summary...",
      "detailed_action_plan": "Specific next steps..."
    }
    """

    # 2. SYSTEM PROMPT: FORCE DISTRIBUTION
    system_instruction = f"""
You are a **CYNICAL ADMISSIONS OFFICER** who is tired of reading generic essays.
Student Context: Grade {grade}, applying to {program}.

### SCORING PROTOCOL (COMPONENT METHOD)
You must grade on 5 distinct components (Max 20 points each).
**TOTAL SCORE = Sum of components.**

**1. Voice & Authenticity (Max 20)**
- 18-20: Sounds exactly like a teenager talking to a friend. Raw, vulnerable.
- 14-17: Polished but slightly "resume-speak."
- <14: Sounds like ChatGPT or a parent wrote it.

**2. Insight & Growth (Max 20)**
- 18-20: A profound realization that changes their worldview.
- 14-17: "I worked hard and succeeded." (Standard)
- <14: No lesson learned, or the lesson is a cliché.

**3. Storytelling & Craft (Max 20)**
- 18-20: vivid imagery, "Show don't tell," cinematic pacing.
- 14-17: Readable but relies on adjectives ("it was difficult") rather than scenes.
- <14: Confusing structure or boring list of events.

**4. Originality & Risk (Max 20)**
- 18-20: Topic or angle I have NEVER seen before.
- 14-17: Common topic (sports/mission trip) but with a slight twist.
- <14: The "Costco Rotisserie Chicken" of generic essays (Sports, Dead Pet, Divorce, Moving). **CAP THIS AT 12 POINTS IF GENERIC.**

**5. Prompt Responsiveness (Max 20)**
- 18-20: Answers the prompt deeply and directly.
- <14: Ignores the prompt to tell a tangentially related story.

### MANDATORY PENALTIES
- If the essay is a "Sports Injury" or "Mission Trip" essay: **Max Total Score is 82** (unless it subverts the genre perfectly).
- If cliches > 3: **Deduct 5 points from total.**

### GRADE CALIBRATION
- **93+**: Top 1% of applicants. (Requires 19/20 in Originality).
- **85-92**: Strong, admit-ready.
- **75-84**: The "Safe Zone." Good grammar, boring content. **MOST ESSAYS ARE HERE.**
- **< 75**: Weak.

**DO NOT DEFAULT TO 93.** If it feels "fine," give it a 78.
"""

    user_content = f"""
Prompt: {prompt_text}

Student Essay:
{essay}

Analyze and grade based on the component system. 
Calculate the 'letter_grade' by summing the 5 component scores.
Output valid JSON:
{json_schema}
"""
    
    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {"role": "system", "content": system_instruction},
                {"role": "user", "content": user_content}
            ],
            model="llama-3.3-70b-versatile",
            temperature=0.4, # Keep it low to enforce strict rubric
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


@app.delete("/roadmaps/{roadmap_id}")
async def delete_roadmap(roadmap_id: str, current_user = Depends(get_current_user)):
    try:
        # Verify the roadmap belongs to the user before deleting
        result = supabase.table('roadmaps')\
            .delete()\
            .eq('id', roadmap_id)\
            .eq('user_id', str(current_user.id))\
            .execute()
        
        if not result.data:
            raise HTTPException(status_code=404, detail="Roadmap not found or unauthorized")
            
        return {"message": "Roadmap deleted successfully", "id": roadmap_id}
    except Exception as e:
        print(f"Delete error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to delete roadmap")

# Delete a specific essay
@app.delete("/essays/{essay_id}")
async def delete_essay(essay_id: str, current_user = Depends(get_current_user)):
    try:
        # Verify the essay belongs to the user before deleting
        result = supabase.table('essays')\
            .delete()\
            .eq('id', essay_id)\
            .eq('user_id', str(current_user.id))\
            .execute()
        
        if not result.data:
            raise HTTPException(status_code=404, detail="Essay not found or unauthorized")
            
        return {"message": "Essay deleted successfully", "id": essay_id}
    except Exception as e:
        print(f"Delete error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to delete essay")
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