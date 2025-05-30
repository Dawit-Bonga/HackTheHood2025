function RoadmapDisplay({ roadmap, loading }) {
  if (loading) return <p className="loading-text">⏳ Generating your personalized roadmap... This could take a while so give it up to a couple minutes</p>;
  if (!roadmap) return null;

  return (
    <div className="roadmap-display roadmap-fadeIn">
      <h2>Your Custom Roadmap:</h2>
      <pre className="roadmap-content">{roadmap}</pre>
    </div>
  );
}

export default RoadmapDisplay