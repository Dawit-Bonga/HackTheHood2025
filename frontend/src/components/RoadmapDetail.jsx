import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import RoadmapDisplay from './Display';
import Button from './ui/Button';
import Card from './ui/Card';

function RoadmapDetail() {
  const { id } = useParams();
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRoadmap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchRoadmap = async () => {
    try {
      const token = await getToken();
      const backendUrl = import.meta.env.VITE_BACKEND;
      
      const response = await fetch(`${backendUrl}/roadmaps`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch roadmaps');
      }
      
      const data = await response.json();
      const foundRoadmap = data.roadmaps?.find(r => r.id === id);
      
      if (foundRoadmap) {
        // Parse the roadmap_content string
        const parsedContent = typeof foundRoadmap.roadmap_content === 'string' 
          ? JSON.parse(foundRoadmap.roadmap_content)
          : foundRoadmap.roadmap_content;
        setRoadmap(parsedContent);
      } else {
        setError('Roadmap not found');
      }
      setLoading(false);
    } catch (err) {
      console.error('Error fetching roadmap:', err);
      setError('Failed to load roadmap');
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="bg-white min-h-screen">
        <section className="section">
          <div className="container max-w-3xl">
            <Card variant="elevated" padding="lg">
              <div className="text-center py-8">
                <svg className="w-16 h-16 mx-auto text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">
                  {error}
                </h2>
                <p className="text-[var(--color-text-secondary)] mb-6">
                  This roadmap might have been deleted or doesn't exist.
                </p>
                <Button variant="primary" onClick={() => navigate('/dashboard')}>
                  ← Back to Dashboard
                </Button>
              </div>
            </Card>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <section className="section">
        <div className="container">
          <div className="mb-6">
            <Button variant="outline" onClick={() => navigate('/dashboard')}>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Dashboard
            </Button>
          </div>
          <RoadmapDisplay roadmap={roadmap} loading={loading} />
        </div>
      </section>
    </div>
  );
}

export default RoadmapDetail;

