import Feedback from "./Feedback";

function RoadmapDisplay({ roadmap, loading }) {
  if (loading) {
    return (
      <div className="loading-container text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Generating Your Personalized Roadmap</h3>
        <p className="text-gray-600 mb-4">
          This may take a few minutes. Please don't close this page.
        </p>
        <div className="flex justify-center items-center space-x-2 text-sm text-gray-500">
          <div className="animate-pulse">●</div>
          <div className="animate-pulse" style={{ animationDelay: '0.2s' }}>●</div>
          <div className="animate-pulse" style={{ animationDelay: '0.4s' }}>●</div>
        </div>
      </div>
    );
  }
  
  if (!roadmap) return null;

  return (
    <div className="roadmap-display roadmap-fadeIn">
      <h2>Your Custom Roadmap:</h2>
      <pre className="roadmap-content">{roadmap}</pre>
      <Feedback/>
    </div>
  );
}

export default RoadmapDisplay