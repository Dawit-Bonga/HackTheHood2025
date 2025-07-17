import Feedback from "./Feedback";

function EssayDisplay({ essay, loading }) {
  if (loading) return <p className="loading-text">⏳ Analyzing your essay... This could take a minute or two</p>;
  if (!essay) return null;

  return (
    <div className="roadmap-display roadmap-fadeIn">
      <h2>Your Essay Feedback:</h2>
      <pre className="roadmap-content">{essay}</pre>
    </div>
  );
}

export default EssayDisplay;