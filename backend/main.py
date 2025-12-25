from fastapi import FastAPI, Request, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from groq import Groq
import os
from dotenv import load_dotenv
from supabase import create_client, Client
import json
from datetime import datetime

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



@app.post("/generate")
async def generate_roadmap(request: Request, current_user = Depends(get_current_user)):
    data = await request.json()
    
    # Extract data
    gpa = data.get("gpa")
    grade = data.get("grade")
    interests = data.get("interests")
    activities = data.get("activities")
    demographic = data.get("demographics")
    testing = data.get("testing")
    goals = data.get("collegeGoals")
    classes = data.get("classes")
    location = data.get("location")
    
    try:
        gpa_float = float(gpa)
        if not 0 <= gpa_float <= 5:  # Allow for weighted GPAs
            raise HTTPException(status_code=400, detail="GPA must be between 0 and 5")
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid GPA format")

# Limit string lengths to prevent abuse
    if len(str(interests)) > 2000 or len(str(activities)) > 2000:
        raise HTTPException(status_code=400, detail="Input too long")
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
async def grade_essay(request: Request, current_user = Depends(get_current_user)):
    data = await request.json()
    grade = data.get("grade")
    prompt = data.get("prompt")
    essay = data.get("essay")
    program = data.get("program")
    
    advice = """
"""
    prompt = (
      f""" 
      You are a college admissions coach giving supportive and constructive feedback on student essays. The student may be a first-generation applicant or from an underrepresented background, so prioritize encouragement and clarity.

Here is the prompt they are responding to:
{prompt}

They are applying to:
{program}

The student's grade level is: {grade}

Here is their essay:
{essay}

Please provide feedback focused on:
- Clarity of ideas
- Storytelling and emotional impact
- Structure and organization
- Grammar and sentence fluency
- How well it answers the prompt
- What could be improved, and what is strong
-final grade and thoughts
-Be specific with your feedback and don't be afraid to make it long. The more detailed and actually attentive you are, the better.

Use a warm, helpful tone. Speak directly to the student (e.g., “One thing you’re doing well is…” or “You might consider…”). Be clear, actionable, and encouraging.

However also be realistic and critical when necessary with your judgmenets so that the student can get the most benefit out of this. At the end of your feedback have a Grade:[The grade you'd give them out of a 100] and then say resubmit after your changes to see the new grade.

Also make sure to say this advice is to be taken with a grain of salt because you don't always need to take advice if you think it works for you.


      
      
      """
)
    
    
    try:
        print(f"✍️ Essay feedback request received for {program}")
        
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
            model="llama-3.3-70b-versatile",  # Fast and high quality
            temperature=0.7,
            max_tokens=5500
        )
        feedback = chat_completion.choices[0].message.content
        
        # Save essay feedback to Supabase
        try:
            result = supabase.table('essays').insert({
                'user_id': str(current_user.id),
                'grade': grade,
                'prompt': data.get("prompt"),
                'essay_text': essay,
                'program': program,
                'feedback': feedback
            }).execute()
            
            return {"feedback": feedback, "id": result.data[0]['id']}
        except Exception as db_error:
            # Still return feedback even if save fails
            print(f"Database error: {str(db_error)}")
            return {"feedback": feedback, "warning": "Feedback generated but not saved"}
            
    except Exception as e:
        print(f"Groq API Error: {e}")
        raise HTTPException(
            status_code=500, 
            detail="AI service temporarily unavailable. Please try again."
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