import React, { useMemo } from 'react';
import Card from './ui/Card';

function EssayDisplay({ essay, loading }) {
  
  // Safe Parsing Logic
  const feedbackData = useMemo(() => {
    if (!essay) return null;
    if (typeof essay === 'object') return essay;
    try {
      const cleanJson = essay.replace(/```json\n?|```/g, '').trim();
      return JSON.parse(cleanJson);
    } catch (e) {
      console.error("Essay Parse Error:", e);
      return null;
    }
  }, [essay]);

  // Enhanced Grade Colors & Labels
  const getGradeInfo = (score) => {
    if (score >= 95) return { 
      color: "text-purple-700 bg-purple-50 border-purple-300",
      label: "Exceptional",
      icon: "🌟",
      description: "Admit Strong"
    };
    if (score >= 90) return { 
      color: "text-green-700 bg-green-50 border-green-300",
      label: "Admit Quality",
      icon: "✨",
      description: "Strong Admit"
    };
    if (score >= 80) return { 
      color: "text-blue-600 bg-blue-50 border-blue-200",
      label: "Competitive",
      icon: "👍",
      description: "Strong Essay"
    };
    if (score >= 70) return { 
      color: "text-yellow-600 bg-yellow-50 border-yellow-200",
      label: "Average",
      icon: "📝",
      description: "Needs Work"
    };
    return { 
      color: "text-red-600 bg-red-50 border-red-200",
      label: "Weak",
      icon: "⚠️",
      description: "Major Revisions"
    };
  };

  // Loading State
  if (loading) {
    return (
      <div className="max-w-3xl mx-auto">
        <Card variant="elevated" padding="lg">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-blue-600 mb-6"></div>
            <h3 className="text-2xl font-semibold text-gray-900">
              Analyzing Your Essay...
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              Evaluating authenticity, voice, and insight
            </p>
          </div>
        </Card>
      </div>
    );
  }
  
  if (!feedbackData) return null;

  const gradeInfo = getGradeInfo(feedbackData.letter_grade);

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      
      {/* ENHANCED HEADER with Risk Badge */}
      {feedbackData.letter_grade !== undefined && (
        <Card variant="elevated" padding="lg">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold text-gray-900">
                  Essay Feedback Report
                </h2>
                {feedbackData.risk_assessment?.took_creative_risks && (
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full flex items-center gap-1">
                    🎨 Creative Risk
                  </span>
                )}
              </div>
              
              {/* Essay Style Badge */}
              {feedbackData.essay_style && (
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-gray-500">Style:</span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                    {feedbackData.essay_style.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                </div>
              )}
            </div>
            
            {/* Enhanced Grade Display */}
            <div className={`flex flex-col items-center justify-center p-5 rounded-xl border-2 ${gradeInfo.color} min-w-[140px]`}>
              <div className="text-3xl mb-1">{gradeInfo.icon}</div>
              <span className="text-5xl font-black">{feedbackData.letter_grade}</span>
              <span className="text-xs font-bold uppercase tracking-wider mt-1">{gradeInfo.label}</span>
              <span className="text-xs opacity-75 mt-1">{gradeInfo.description}</span>
            </div>
          </div>

          {/* Risk Assessment Callout */}
          {feedbackData.risk_assessment && (
            <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎯</span>
                <div className="flex-1">
                  <h4 className="font-bold text-purple-900 mb-1">Creative Risk Assessment</h4>
                  <p className="text-sm text-purple-800 leading-relaxed">
                    {feedbackData.risk_assessment.explanation}
                  </p>
                  {feedbackData.risk_assessment.risks_paid_off && (
                    <div className="mt-2 text-xs font-semibold text-purple-700">
                      ✓ Risks paid off successfully
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Final Summary */}
          {feedbackData.final_summary && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-bold text-gray-600 uppercase mb-2 flex items-center gap-2">
                <span>💭</span> Memorability Check
              </h3>
              <p className="text-gray-900 leading-relaxed italic text-base">
                "{feedbackData.final_summary}"
              </p>
            </div>
          )}
        </Card>
      )}

      {/* Risk Worth Taking Callout (for unconventional essays) */}
      {feedbackData.is_this_a_risk_worth_taking && (
        <Card variant="outlined" className="border-l-4 border-l-purple-500 bg-purple-50">
          <h3 className="font-bold text-lg text-purple-900 mb-2 flex items-center gap-2">
            🎲 Risk Evaluation
          </h3>
          <p className="text-sm text-purple-800 leading-relaxed">
            {feedbackData.is_this_a_risk_worth_taking}
          </p>
        </Card>
      )}

      {/* STRENGTHS & IMPROVEMENTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        <Card variant="outlined" className="border-l-4 border-l-green-500">
          <h3 className="font-bold text-lg text-green-700 mb-4 flex items-center gap-2">
            <span className="text-2xl">✅</span> Key Strengths
          </h3>
          <ul className="space-y-3">
            {feedbackData.key_strengths?.length > 0 ? (
              feedbackData.key_strengths.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-800">
                  <span className="text-green-500 mt-0.5 shrink-0 font-bold">✓</span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))
            ) : (
              <li className="text-sm text-gray-500 italic">No specific strengths highlighted.</li>
            )}
          </ul>
        </Card>

        {/* Improvements */}
        <Card variant="outlined" className="border-l-4 border-l-amber-500">
          <h3 className="font-bold text-lg text-amber-700 mb-4 flex items-center gap-2">
            <span className="text-2xl">💡</span> Areas to Enhance
          </h3>
          <ul className="space-y-3">
            {feedbackData.areas_for_improvement?.length > 0 ? (
              feedbackData.areas_for_improvement.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-800">
                  <span className="text-amber-500 mt-0.5 shrink-0 font-bold">→</span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))
            ) : (
              <li className="text-sm text-gray-500 italic">No improvements needed—strong draft!</li>
            )}
          </ul>
        </Card>
      </div>

      {/* DETAILED CRITIQUE with Better Labels */}
      {feedbackData.critique_breakdown && Object.keys(feedbackData.critique_breakdown).length > 0 && (
        <Card variant="elevated" padding="lg">
          <h3 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-3 flex items-center gap-2">
            <span className="text-2xl">📊</span> Detailed Breakdown
          </h3>
          <div className="space-y-6">
            {Object.entries(feedbackData.critique_breakdown).map(([key, value]) => {
              // Icon mapping for each category
              const categoryIcons = {
                'authenticity_and_voice': '🎭',
                'insight_and_growth': '🌱',
                'storytelling_and_impact': '📖',
                'structure_and_craft': '🏗️',
                'prompt_responsiveness': '🎯',
                'clarity_and_ideas': '💡',
                'grammar_and_fluency': '✍️'
              };
              
              return (
                <div key={key} className="pb-4 border-b border-gray-100 last:border-0">
                  <h4 className="text-sm font-bold text-blue-600 uppercase tracking-wide mb-2 flex items-center gap-2">
                    <span>{categoryIcons[key] || '•'}</span>
                    {key.replace(/_/g, ' ')}
                  </h4>
                  <p className="text-sm text-gray-700 leading-relaxed pl-6">
                    {value}
                  </p>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* ACTION PLAN - More Prominent */}
      {feedbackData.detailed_action_plan && (
        <Card variant="elevated" padding="lg" className="border-t-4 border-t-blue-600 bg-gradient-to-br from-blue-50 to-white">
          <div className="flex items-start gap-4">
            <div className="bg-blue-600 p-3 rounded-full hidden sm:block shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-1 flex items-center gap-2">
                Your Next Steps
              </h3>
              <p className="text-xs text-gray-600 mb-4 uppercase font-bold tracking-wider">
                Concrete Action Plan
              </p>
              <div className="bg-white p-6 rounded-lg border-2 border-blue-200 shadow-sm">
                <div className="text-sm leading-relaxed text-gray-800 whitespace-pre-line">
                  {feedbackData.detailed_action_plan}
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Enhanced Disclaimer */}
      <div className="p-5 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
        <div className="flex items-start gap-3">
          <span className="text-xl">ℹ️</span>
          <div>
            <p className="text-xs text-gray-700 leading-relaxed">
              <strong>Note:</strong> This is an AI-powered evaluation designed to recognize both traditional and unconventional excellence. 
              Scores above 90 indicate college-ready essays. Always seek additional feedback from counselors or teachers for final submissions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EssayDisplay;