import Feedback from "./Feedback";
import Card from "./ui/Card";

function RoadmapDisplay({ roadmap, loading }) {
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
              Our AI is analyzing your information and creating a customized plan. This may take a moment.
            </p>
            <div className="flex justify-center items-center space-x-2 text-[var(--color-primary)]">
              <div className="w-2 h-2 rounded-full bg-current animate-pulse"></div>
              <div className="w-2 h-2 rounded-full bg-current animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 rounded-full bg-current animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </Card>
      </div>
    );
  }
  
  if (!roadmap) return null;

  return (
    <div className="max-w-3xl mx-auto animate-[slideUp_0.5s_ease-out]">
      <Card variant="elevated" padding="lg">
        <div className="mb-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-[var(--color-primary-light)] rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
              Your Personalized Roadmap
            </h2>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Follow these steps to reach your college goals
            </p>
          </div>
        </div>
        
        <div className="roadmap-display">
          <pre className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg p-6 overflow-x-auto text-sm leading-relaxed text-[var(--color-text-primary)] whitespace-pre-wrap max-h-[600px] overflow-y-auto">
            {roadmap}
          </pre>
        </div>
        
        <div className="mt-6 p-4 bg-[var(--color-primary-light)] rounded-lg">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div className="text-sm text-[var(--color-primary)]">
              <strong className="font-semibold">Pro Tip:</strong> Save this roadmap and check back regularly to track your progress. 
              Feel free to update your information anytime to get a refreshed plan.
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <Feedback />
        </div>
      </Card>
    </div>
  );
}

export default RoadmapDisplay;
