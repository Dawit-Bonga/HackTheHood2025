import Feedback from "./Feedback";

function EssayDisplay({ essay, loading }) {
  if (loading) {
    return (
      <div className="loading-container text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Analyzing Your Essay</h3>
        <p className="text-gray-600 mb-4">
          Our AI is reviewing your essay and providing detailed feedback...
        </p>
        <div className="flex justify-center items-center space-x-2 text-sm text-gray-500">
          <div className="animate-pulse">●</div>
          <div className="animate-pulse" style={{ animationDelay: '0.2s' }}>●</div>
          <div className="animate-pulse" style={{ animationDelay: '0.4s' }}>●</div>
        </div>
      </div>
    );
  }
  
  if (!essay) return null;

  return (
    <div className="roadmap-display roadmap-fadeIn">
      <h2>Your Essay Feedback:</h2>
      <pre className="roadmap-content">{essay}</pre>
    </div>
  );
}

export default EssayDisplay;