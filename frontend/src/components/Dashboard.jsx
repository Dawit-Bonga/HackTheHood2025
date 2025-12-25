import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import Card from './ui/Card';
import Button from './ui/Button';
import ConfirmModal from './ui/ConfirmModal';

function Dashboard() {
  const { user, getToken } = useAuth();
  const [roadmaps, setRoadmaps] = useState([]);
  const [essays, setEssays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, type: null, id: null, title: '' });
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUserData = async () => {
    try {
      const token = await getToken();  // Use getToken() instead of user.getSession()
      const backendUrl = import.meta.env.VITE_BACKEND;

      // Fetch roadmaps
      const roadmapsRes = await fetch(`${backendUrl}/roadmaps`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const roadmapsData = await roadmapsRes.json();
      setRoadmaps(roadmapsData.roadmaps || []);

      // Fetch essays
      const essaysRes = await fetch(`${backendUrl}/essays`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const essaysData = await essaysRes.json();
      setEssays(essaysData.essays || []);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setLoading(false);
    }
  };

  const handleDeleteClick = (type, id, title) => {
    setDeleteModal({ 
      isOpen: true, 
      type, 
      id, 
      title 
    });
  };

  const handleDeleteConfirm = async () => {
    setDeleting(true);
    try {
      const token = await getToken();
      const backendUrl = import.meta.env.VITE_BACKEND;
      const endpoint = deleteModal.type === 'roadmap' ? 'roadmaps' : 'essays';
      
      const response = await fetch(`${backendUrl}/${endpoint}/${deleteModal.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!response.ok) {
        throw new Error('Failed to delete');
      }

      // Update local state
      if (deleteModal.type === 'roadmap') {
        setRoadmaps(roadmaps.filter(r => r.id !== deleteModal.id));
      } else {
        setEssays(essays.filter(e => e.id !== deleteModal.id));
      }

      setDeleteModal({ isOpen: false, type: null, id: null, title: '' });
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete. Please try again.');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="bg-white min-h-screen">
      <section className="section bg-gradient-to-b from-[var(--color-bg-secondary)] to-white">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-[var(--color-text-primary)] mb-2">
              Welcome back, {user?.email?.split('@')[0]}!
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)]">
              Here's your college planning dashboard
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card>
              <div className="text-center">
                <div className="text-3xl font-bold text-[var(--color-primary)]">
                  {roadmaps.length}
                </div>
                <div className="text-sm text-[var(--color-text-secondary)] mt-1">
                  Roadmaps Generated
                </div>
              </div>
            </Card>
            <Card>
              <div className="text-center">
                <div className="text-3xl font-bold text-[var(--color-primary)]">
                  {essays.length}
                </div>
                <div className="text-sm text-[var(--color-text-secondary)] mt-1">
                  Essays Reviewed
                </div>
              </div>
            </Card>
            <Card>
              <div className="text-center">
                <div className="text-3xl font-bold text-[var(--color-primary)]">
                  {roadmaps.length + essays.length}
                </div>
                <div className="text-sm text-[var(--color-text-secondary)] mt-1">
                  Total Items
                </div>
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Link to="/Roadmap">
              <Card hover className="h-full">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[var(--color-primary-light)] rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--color-text-primary)]">
                      Create New Roadmap
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      Generate a personalized college plan
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
            <Link to="/essay">
              <Card hover className="h-full">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[var(--color-primary-light)] rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--color-text-primary)]">
                      Get Essay Feedback
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      Review your college essays
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          </div>

          {/* Recent Roadmaps */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">
              Your Roadmaps
            </h2>
            {roadmaps.length === 0 ? (
              <Card>
                <p className="text-center text-[var(--color-text-secondary)] py-8">
                  No roadmaps yet. Create your first one!
                </p>
              </Card>
            ) : (
              <div className="space-y-4">
                {roadmaps.slice(0, 3).map((roadmap, idx) => (
                  <Card key={idx} hover>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-[var(--color-text-primary)]">
                          Roadmap {idx + 1}
                        </h3>
                        <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                          Created {new Date(roadmap.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate(`/roadmap/${roadmap.id}`)}
                        >
                          View
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteClick('roadmap', roadmap.id, `Roadmap ${idx + 1}`)}
                          className="text-red-600 hover:bg-red-50 border-red-200"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Recent Essays */}
          <div>
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">
              Your Essays
            </h2>
            {essays.length === 0 ? (
              <Card>
                <p className="text-center text-[var(--color-text-secondary)] py-8">
                  No essays reviewed yet. Get started!
                </p>
              </Card>
            ) : (
              <div className="space-y-4">
                {essays.slice(0, 3).map((essay, idx) => (
                  <Card key={idx} hover>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-[var(--color-text-primary)]">
                          {essay.prompt?.substring(0, 60)}...
                        </h3>
                        <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                          Created {new Date(essay.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate(`/essay/${essay.id}`)}
                        >
                          View
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteClick('essay', essay.id, `Essay #${idx + 1}`)}
                          className="text-red-600 hover:bg-red-50 border-red-200"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, type: null, id: null, title: '' })}
        onConfirm={handleDeleteConfirm}
        title={`Delete ${deleteModal.title}?`}
        message="This action cannot be undone. The item will be permanently deleted from your account."
        confirmText="Delete"
        loading={deleting}
      />
    </div>
  );
}

export default Dashboard;