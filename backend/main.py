from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
import os
from dotenv import load_dotenv

from datetime import datetime

load_dotenv()

open_ai_key = os.getenv("OPEN_AI_KEY")
client = OpenAI(api_key=open_ai_key)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5177",
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
    f"You are a college admissions mentor writing a personalized roadmap for a high school student. "
    f"The student is {grade} grade, has a {gpa} GPA, is interested in {interests}, and participates in {activities}. "
    f"They are from a {demographic} background so keep that in mind "

    "You should write month-by-month and grade-by-grade advice that is practical, empathetic, and tailored to their personal background. "
    "Give academic goals, extracurricular tips, and summer suggestions that are aligned with their stated interests and clubs. "
    "Reference their current activities directly and suggest specific scholarships, programs, or competitions that match their situation. "
    f"also take this information about their testing into account: {testing}"
    
    f"The student is aiming for this in their colleges: {goals} and you should advice them on routes they should take and also advice them on other options of school if neccesary(if they are for example very below the standard). Make sure to give them advice about colleges outside of their goals too since it is important to not be limited"

    f"Use this timeline format as an example of what the structure should look like:\n\n{example_timeline}\n\n"
    
    "DO NOT give generic advice like 'join clubs' — personalize it based on what they've already done. "
    "Be warm, helpful, and encouraging in tone, while still being strategic. Make it feel like it was written just for them."
    
    "After your final thoughts and encourgments, don't say anything else like asking to review the students essay or anything like that. "
    
    "Throughout this process be honest and reasonable while being uplifitng and helpful. Also make sure when you give backup options for schools, you don't calls schools that aren't actually safeties, safeties. Also be clear what school year you're reffering to so it doesn't get confusing, example: don't just switch from one grade to another in the middle of the year like in decemeber"
    
    f"This additional information about their classes: {classes} so take this into consideration too. However you can't be certain what their school offers so everything should be a suggestion for future courses to take."
    
#     "also stop using ** and things like that to make characters bold, the character output where you appear doesn't allow that"
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
  
   