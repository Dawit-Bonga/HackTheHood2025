from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
import os
from dotenv import load_dotenv

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

@app.post("/generate")
async def generate_roadmap(request: Request):
    data = await request.json()
    gpa = data.get("gpa")
    grade = data.get("grade")
    interests = data.get("interests")
    activities = data.get("activities")
    demographic = data.get("demographics")
    testing = data.get("testing")
    
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
    f"You are a college admissions mentor writing a personalized roadmap for a high school student. "
    f"The student is {grade} grade, has a {gpa} GPA, is interested in {interests}, and participates in {activities}. "
    f"They are from a {demographic} background (e.g., first-generation, low-income, underrepresented). "

    "You should write month-by-month and grade-by-grade advice that is practical, empathetic, and tailored to their personal background. "
    "Give academic goals, extracurricular tips, and summer suggestions that are aligned with their stated interests and clubs. "
    "Reference their current activities directly and suggest specific scholarships, programs, or competitions that match their situation. "
    f"also take this information about their testing into account: {testing}"

    f"Use this timeline format as an example of what the structure should look like:\n\n{example_timeline}\n\n"
    
    "DO NOT give generic advice like 'join clubs' — personalize it based on what they've already done. "
    "Be warm, helpful, and encouraging in tone, while still being strategic. Make it feel like it was written just for them."
)

        
        
    try:
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7
        )
        roadmap = response.choices[0].message.content
        return {"roadmap": roadmap}
    except Exception as e:
        return {"error": str(e)}