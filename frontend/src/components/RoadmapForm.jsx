import React, { useState } from 'react';

function RoadmapForm({ setRoadmap, setLoading }) {
  const [gpa, setGpa] = useState('');
  const [grade, setGrade] = useState('');
  const [interests, setInterests] = useState('');
  const [activities, setActivities] = useState('');
  const [demographic, setDemographic] = useState('');
  const [testing, setTesting] = useState('');
  const [collegeGoals, setCollegeGoals] = useState(''); 
  const [classes, setClasses] = useState('');
  const [error, setError] = useState('');
  const [retryCount, setRetryCount] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gpa, grade, interests, activities, demographic, testing, collegeGoals, classes })
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.roadmap) {
        throw new Error('No roadmap data received from server');
      }
      
      setRoadmap(data.roadmap);
      setRetryCount(0); // Reset retry count on success
    } catch (err) {
      console.error('Roadmap generation error:', err);
      
      let errorMessage = 'Failed to generate roadmap. ';
      
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        errorMessage += 'Unable to connect to the server. Please check your internet connection.';
      } else if (err.message.includes('Server error: 500')) {
        errorMessage += 'Server is temporarily unavailable. Please try again later.';
      } else if (err.message.includes('Server error: 400')) {
        errorMessage += 'Invalid input data. Please check your form entries.';
      } else if (err.message.includes('Server error: 429')) {
        errorMessage += 'Too many requests. Please wait a moment before trying again.';
      } else {
        errorMessage += err.message || 'An unexpected error occurred.';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    setError('');
    handleSubmit(new Event('submit'));
  };

  return (
    <div>
      {error && (
        <div className="error-container mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3 flex-1">
              <h3 className="text-sm font-medium text-red-800">Error generating roadmap</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
              <div className="mt-4 flex space-x-3">
                <button
                  type="button"
                  onClick={handleRetry}
                  disabled={retryCount >= 3}
                  className="bg-red-100 text-red-800 px-3 py-2 rounded-md text-sm font-medium hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {retryCount >= 3 ? 'Max retries reached' : `Retry (${retryCount}/3)`}
                </button>
                <button
                  type="button"
                  onClick={() => setError('')}
                  className="bg-gray-100 text-gray-800 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <form className="roadmap-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label" htmlFor='grade'>Grade Level:</label>
        <select
          className="form-select"
          id='grade'
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          required
        >
          <option value="">--Select a Grade--</option>
          <option value="9">9th</option>
          <option value="10">10th</option>
          <option value="11">11th</option>
          <option value="12">12th</option>
          <option value="Community college">Community College</option>
          <option value="other">Out of school, looking to get back in</option>
        </select>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="gpa">GPA:</label>
        <input
          className="form-input"
          type="number"
          id="gpa"
          value={gpa}
          onChange={(e) => setGpa(e.target.value)}
          step="0.01"
          min="0"
          max="4"
          placeholder="e.g., 3.5"
          required
        />
      </div>

        <div className="form-group">
        <label className="form-label" htmlFor="classes">Course Rigor:</label>
        <textarea
          className="form-textarea"
          id="classes"
          value={classes}
          onChange={(e) => setClasses(e.target.value)}
          placeholder="e.g. I have taken 7/11 AP classes, We have no AP or Honors Classes.Also feel free to drop your upcoming schedule"
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="interests">Interests / Goals:</label>
        <textarea
          className="form-textarea"
          id="interests"
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
          placeholder="e.g., computer science, medicine, social justice"
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="activities">Activities/Extracurriculars:</label>
        <textarea
          className="form-textarea"
          id="activities"
          value={activities}
          onChange={(e) => setActivities(e.target.value)}
          placeholder="e.g., debate, HackClub, Research, please try to be specific"
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="demographic">Demographic Information:</label>
        <textarea
          className="form-textarea"
          id="demographic"
          value={demographic}
          onChange={(e) => setDemographic(e.target.value)}
          placeholder="e.g., first-generation college student, low-income, rural area, underrepresented minority"
        />
      </div>

        <div className="form-group">
        <label className="form-label" htmlFor="testing">Sat/Testing:</label>
        <textarea
          className="form-textarea"
          id="testing"
          value={testing}
          onChange={(e) => setTesting(e.target.value)}
          placeholder="e.g., 1330 SAT, haven't taken the SAT yet, plan on taking it soon aiming for...
Please specify the score so if your score is SAT say {score} SAT, etc."
        />
      </div>

        <div className="form-group">
        <label className="form-label" htmlFor="collegeGoals">College Goals:</label>
        <textarea
          className="form-textarea"
          id="collegeGoals"
          value={collegeGoals}
          onChange={(e) => setCollegeGoals(e.target.value)}
          placeholder="e.g., Ivy League, state schools, specific universities, community college transfer, gap year plans"
        />
      </div>

      <button className="form-button" type="submit">Generate Roadmap</button>
      </form>
    </div>
  );
}

export default RoadmapForm;