// If your frontend tries to `JSON.parse` that string, it will crash and fall back to the ugly raw text view.

// Here is the **refined version** of your component. I updated the **`useMemo`** section to strip out any markdown characters before parsing, making it "bulletproof."

// ### Updated `RoadmapDisplay.jsx`

// ```jsx
import React, { useMemo } from 'react';
import Feedback from "./Feedback";
import Card from "./ui/Card";

function RoadmapDisplay({ roadmap, loading }) {
  
  // 1. ROBUST PARSING LOGIC
  // This is the critical update. It cleans the AI response before parsing.
const roadmapData = useMemo(() => {
    if (!roadmap) return null;
    
    // If it's already an object, use it; otherwise parse the string
    let parsedData = roadmap;
    if (typeof parsedData !== 'object') {
      try {
        // Clean markdown code blocks
        const cleanJson = roadmap.replace(/```json\n?|```/g, '').trim();
        parsedData = JSON.parse(cleanJson);
      } catch (e) {
        console.error("JSON Parse Error:", e);
        return null;
      }
    }

    // --- THE FIX: Handle Nested JSON ---
    // Sometimes the AI returns { "roadmap": { ... } } instead of just { ... }
    // We check if the expected keys are inside a sub-property
    if (parsedData.roadmap) {
      return parsedData.roadmap;
    }
    if (parsedData.response) {
      return parsedData.response;
    }
    
    // Debugging: Log what we actually got to the console
    console.log("Parsed Roadmap Data:", parsedData);
    
    return parsedData;
  }, [roadmap]);

  // Loading State
  if (loading) {
    return (
      <div className="max-w-3xl mx-auto">
        <Card variant="elevated" padding="lg">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-[var(--color-border)] border-t-[var(--color-primary)] mb-6"></div>
            <h3 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-3">
              Generating Your Personalized Roadmap
            </h3>
            <p className="text-[var(--color-text-secondary)] mb-6">
              Our AI is analyzing your profile and projecting your timeline...
            </p>
          </div>
        </Card>
      </div>
    );
  }
  
  if (!roadmap) return null;

  // 2. FALLBACK VIEW (If parsing failed or JSON is invalid)
  if (!roadmapData) {
    return (
      <div className="max-w-3xl mx-auto animate-[slideUp_0.5s_ease-out]">
        <Card variant="elevated" padding="lg">
          <div className="p-4 bg-yellow-50 text-yellow-800 rounded-md mb-4 text-sm">
            <strong>Note:</strong> We couldn't format this into the visual roadmap, but here is your advice:
          </div>
          <div className="roadmap-display">
            <pre className="whitespace-pre-wrap text-sm font-sans">{roadmap}</pre>
          </div>
        </Card>
      </div>
    );
  }

  // 3. MAIN JSON VIEW
  return (
    <div className="max-w-4xl mx-auto animate-[slideUp_0.5s_ease-out] space-y-6">
      
      {/* HEADER & SUMMARY */}
      <Card variant="elevated" padding="lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-[var(--color-primary-light)] rounded-lg flex items-center justify-center">
            {/* Icon */}
            <svg className="w-6 h-6 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
            Your Personalized Strategy
          </h2>
        </div>
        
        {/* Student Summary */}
        {roadmapData.student_summary && (
          <div className="bg-[var(--color-bg-secondary)] p-5 rounded-lg border border-[var(--color-border)] italic text-[var(--color-text-primary)] leading-relaxed">
            "{roadmapData.student_summary}"
          </div>
        )}
      </Card>

      {/* COLLEGE LIST GRID */}
      {/* Safe check: Ensure college_list_suggestions exists before rendering */}
      {roadmapData.college_list_suggestions && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['reach', 'target', 'safety'].map((type) => (
            <Card key={type} variant="outlined" className="h-full">
              <div className="uppercase tracking-wide text-xs font-bold text-[var(--color-text-secondary)] mb-3 border-b border-[var(--color-border)] pb-2">
                {type} Schools
              </div>
              <ul className="list-none space-y-2 text-sm text-[var(--color-text-primary)]">
                {roadmapData.college_list_suggestions[type]?.map((school, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[var(--color-primary)] mt-1">•</span>
                    <span>{school}</span>
                  </li>
                )) || <li className="text-gray-400 italic">None listed</li>}
              </ul>
            </Card>
          ))}
        </div>
      )}

      {/* TIMELINE SECTION */}
      {/* This automatically handles long lists (Sophomore -> Senior) */}
      {roadmapData.timeline && (
        <Card variant="elevated" padding="lg">
          <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-6 border-b border-[var(--color-border)] pb-2">
            Action Timeline
          </h3>
          <div className="space-y-0">
            {roadmapData.timeline.map((item, index) => (
              <div key={index} className="relative pl-8 pb-8 border-l-2 border-[var(--color-border)] last:border-0 last:pb-0">
                {/* Timeline Dot */}
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[var(--color-primary)] border-4 border-[var(--color-bg-primary)]"></div>
                
                {/* Period Header */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-2">
                  <span className="text-sm font-bold text-[var(--color-primary)] uppercase tracking-wider bg-[var(--color-primary-light)] px-2 py-0.5 rounded w-fit">
                    {item.period}
                  </span>
                  <span className="text-sm text-[var(--color-text-secondary)] font-medium">
                     {item.focus}
                  </span>
                </div>
                
                {/* Task Checklist */}
                <div className="mt-2 space-y-2">
                  {item.tasks?.map((task, tIndex) => (
                    <div key={tIndex} className="flex items-start gap-3 group">
                      <input 
                        type="checkbox" 
                        className="mt-1 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)] cursor-pointer" 
                      />
                      <span className="text-sm leading-relaxed text-[var(--color-text-primary)] group-hover:text-[var(--color-text-secondary)] transition-colors">
                        {task}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* ACADEMICS & EXTRACURRICULARS SPLIT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Academics */}
        {roadmapData.academic_plan && (
          <Card variant="outlined">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-[var(--color-text-primary)]">
              📚 Academic Plan
            </h3>
            <div className="space-y-5 text-sm">
              <div>
                <strong className="block text-[var(--color-text-secondary)] text-xs uppercase mb-2">Recommended Courses</strong>
                <div className="flex flex-wrap gap-2">
                  {roadmapData.academic_plan.course_suggestions?.map((c, i) => (
                    <span key={i} className="bg-[var(--color-bg-secondary)] px-2.5 py-1 rounded-md text-[var(--color-text-primary)] border border-[var(--color-border)] font-medium">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <strong className="block text-[var(--color-text-secondary)] text-xs uppercase mb-1">Testing Strategy</strong>
                <p className="text-[var(--color-text-primary)] leading-relaxed">{roadmapData.academic_plan.testing_strategy}</p>
              </div>
            </div>
          </Card>
        )}

        {/* Extracurriculars */}
        {roadmapData.extracurriculars && (
          <Card variant="outlined">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-[var(--color-text-primary)]">
              🏆 Extracurriculars
            </h3>
            <div className="space-y-5 text-sm">
               <div>
                <strong className="block text-[var(--color-text-secondary)] text-xs uppercase mb-1">Current Optimization</strong>
                <p className="text-[var(--color-text-primary)] leading-relaxed">{roadmapData.extracurriculars.current_optimization}</p>
              </div>
               <div>
                <strong className="block text-[var(--color-text-secondary)] text-xs uppercase mb-2">New Opportunities</strong>
                <ul className="space-y-1">
                  {roadmapData.extracurriculars.new_opportunities?.map((op, i) => (
                     <li key={i} className="flex items-start gap-2 text-[var(--color-text-primary)]">
                       <span className="text-[var(--color-primary)]">→</span>
                       {op}
                     </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* FOOTER TIP */}
      <div className="p-4 bg-[var(--color-primary-light)] rounded-lg flex items-start gap-3 border border-[var(--color-primary)]/20">
        <div className="text-sm text-[var(--color-primary-dark)]">
          <strong className="font-semibold block mb-1">💡 Pro Tip</strong> 
          Save this roadmap! Since we generated a long-term plan, check back every semester to stay on track.
        </div>
      </div>
      
      <div className="mt-8">
        <Feedback />
      </div>
    </div>
  );
}

export default RoadmapDisplay;