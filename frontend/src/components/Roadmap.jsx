import React, { useState } from 'react';
import RoadmapForm from './RoadmapForm';
import RoadmapDisplay from './Display';

function RoadmapPage() {
  const [roadmap, setRoadmap] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <main className="main-content">
      <RoadmapForm setRoadmap={setRoadmap} setLoading={setLoading} />
      <RoadmapDisplay roadmap={roadmap} loading={loading} />
    </main>
  );
}

export default RoadmapPage;
