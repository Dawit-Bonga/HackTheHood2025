import React, { useState } from 'react';
import RoadmapForm from './RoadmapForm';
import RoadmapDisplay from './Display';

function RoadmapPage() {
  const [roadmap, setRoadmap] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <div className="bg-white min-h-screen">
      <section className="section bg-gradient-to-b from-[var(--color-bg-secondary)] to-white">
        <div className="container">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-4">
              Your College Roadmap
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
              Get a personalized, step-by-step plan tailored to your academic goals, 
              interests, and circumstances.
            </p>
          </div>
          
          <RoadmapForm setRoadmap={setRoadmap} setLoading={setLoading} />
        </div>
      </section>
      
      {(loading || roadmap) && (
        <section className="section">
          <div className="container">
            <RoadmapDisplay roadmap={roadmap} loading={loading} />
          </div>
        </section>
      )}
    </div>
  );
}

export default RoadmapPage;
