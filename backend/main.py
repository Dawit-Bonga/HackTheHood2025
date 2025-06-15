from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
import os
from dotenv import load_dotenv
import psycopg2 
from psycopg2.extras import RealDictCursor
from datetime import datetime

load_dotenv()

open_ai_key = os.getenv("OPEN_AI_KEY")
client = OpenAI(api_key=open_ai_key)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://roadmap-gen.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def init_db():
    DATABASE_URL = os.getenv("DATABASE_URL")
    conn = psycopg2.connect(DATABASE_URL)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS feedback (
            id SERIAL PRIMARY KEY,
            feedback_text TEXT NOT NULL,
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            user_ip TEXT
        )
    ''')
    conn.commit()
    conn.close()
    
init_db()

@app.post("/feedback")
async def submit_feedback(request: Request):
  DATABASE_URL = os.getenv("DATABASE_URL")
  data = await request.json()
  feedback_text = data.get("feedback")
  
  if not feedback_text:
    return {"error": "Feedback cannot be empty"}
  
  try:
    conn = psycopg2.connect(DATABASE_URL)
    cursor = conn.cursor()
    cursor.execute("INSERT INTO feedback (feedback_text, user_ip) VALUES (%s, %s)",
                   (feedback_text, request.client.host)
                   )
    conn.commit()
    conn.close()
    return {"success": True, "message": "Feedback received successfully"}
  except Exception as e:
    return {"error": f"failed to save feedback: {str(e)}"}
  
  
  
@app.get("/admin/feedback")
async def get_feedback():
    DATABASE_URL = os.getenv("DATABASE_URL")
    try:
        conn = psycopg2.connect(DATABASE_URL)
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        cursor.execute("SELECT * FROM feedback ORDER BY timestamp DESC")
        rows = cursor.fetchall()
        conn.close()
        
        feedback_list = [dict(row) for row in rows]
        return {"feedback": feedback_list}
    except Exception as e:
        return {"error": str(e)}
    


@app.post("/generate")
async def generate_roadmap(request: Request):
    data = await request.json()
    gpa = data.get("gpa")
    grade = data.get("grade")
    interests = data.get("interests")
    activities = data.get("activities")
    demographic = data.get("demographics")
    testing = data.get("testing")
    goals = data.get("collegeGoals")
    classes = data.get("classes")
    
    example_timeline = """
**May–August**
- May–July: Your summer time. Many use this for programs, research, starting college essay drafts, jobs, etc.
- Late July: QuestBridge application opens
- August 1st: UC app opens
- August 1st: Common App opens  
  ○ This is where most people apply to college. You should at least fill out your personal info by the end of August.
- Mid-late August: SAT

**September**
- Keep working on your main essays and try to finalize your college list.
- ~September 26: QuestBridge application deadline  
  ○ Submit by this deadline to be considered a finalist.
- Ask teachers for letters of recommendation if you haven’t already
- September ACT

**October**
- If applying early, finalize your main essay and start supplementals.
- October 18th: QuestBridge finalists’ results released
- Take the October SAT if needed
- Keep working on UC applications

**November**
- November 1st:
  ○ QuestBridge Match application is due
  ○ Early Action/Decision apps due
- Work on supplements for the schools you’re applying to
  ○ Create templates for common questions like “Why Major” to save time
- November 30 – Early December: UC applications due

**December–January**
- Dec 1st: QuestBridge Match results released  
  ○ If not matched, apply Regular Decision or via Common App
- Mid Dec–Jan: ED/EA results come out  
  ○ If deferred, write a Letter of Continued Interest
- Finish all college apps (many due early January)

**January–March**
- If new updates happen (awards, ECs), send them to colleges
- March: Most decisions come out — stay positive and prepare for next steps
- Enjoy the rest of senior year once applications are done
"""
    
    
    prompt = (
    f"You are an expert college admissions counselor creating a personalized roadmap. "
    f"Student Profile: {grade} grade, {gpa} GPA, SAT/testing: {testing}, "
    f"interests: {interests}, activities: {activities}, background: {demographic}, "
    f"college goals: {goals}, current classes: {classes}.\n\n"
    
    f"REQUIREMENTS:\n"
    f"1. Start timeline from their CURRENT grade ({grade}) - don't go backwards\n"
    f"2. Be realistic about their stats vs their goals\n"
    f"3. Reference their specific activities and interests throughout\n"
    f"4. Suggest concrete programs, scholarships, competitions that match their profile\n"
    f"5. Include both reach and realistic backup options\n"
    f"6. Use month-by-month format like this example:\n\n{example_timeline}\n\n"
    
    f"TONE: Encouraging but honest. If their stats don't match their goals, gently suggest "
    f"ways to improve OR better-fit schools. Don't just say 'work harder' - give specific actionable steps.\n\n"
    
    f"PERSONALIZATION: Don't give generic advice. Build on what they're already doing. "
    f"If they're in debate club, suggest debate-related opportunities. If they want CS, "
    f"suggest CS competitions and programs.\n\n"
    
    f"OUTPUT: Month-by-month timeline starting from where they are now. End with encouraging "
    f"final thoughts. No follow-up questions or offers to review essays."
)

        
        
    try:
        response = client.chat.completions.create(
            model="gpt-4.1-mini",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7,
            # max_tokens=2300
        )
        roadmap = response.choices[0].message.content
        return {"roadmap": roadmap}
    except Exception as e:
        return {"error": str(e)}
      
      
@app.post("/essay")
async def grade_essay(request: Request):
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
        response = client.chat.completions.create(
            model="gpt-4.1-mini",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7,
            # max_tokens=2300
        )
        feedback = response.choices[0].message.content
        return {"feedback": feedback}
    except Exception as e:
        return {"error": str(e)}
  
   