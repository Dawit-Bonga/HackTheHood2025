import React, { useState } from 'react';
import RoadmapForm from './RoadmapForm';
import RoadmapDisplay from './Display';

function Home() {
  const [roadmap, setRoadmap] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <main className="main-content">
      <section className="hero-section">
        <div className="hero-container">
          {/* <h1>Generate Your College Roadmap</h1>
          <p>Get personalized guidance for your college journey</p> */}
        </div>
      </section>
      
      <section className="form-section">
        <RoadmapForm setRoadmap={setRoadmap} setLoading={setLoading} />
      </section>
      
      <section className="display-section">
        <RoadmapDisplay roadmap={roadmap} loading={loading} />
      </section>
    </main>
  );
}



export default Home;