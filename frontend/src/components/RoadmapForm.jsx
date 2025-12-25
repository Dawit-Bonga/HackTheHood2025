import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Button from './ui/Button';
import Card from './ui/Card';
import { Input, Textarea, Select } from './ui/Input';

function RoadmapForm({ setRoadmap, setLoading }) {
  const [gpa, setGpa] = useState('');
  const [grade, setGrade] = useState('');
  const [interests, setInterests] = useState('');
  const [activities, setActivities] = useState('');
  const [demographic, setDemographic] = useState('');
  const [testing, setTesting] = useState('');
  const [location, setLocation] = useState('');
  const [collegeGoals, setCollegeGoals] = useState(''); 
  const [classes, setClasses] = useState('');
  const [error, setError] = useState('');
  const [retryCount, setRetryCount] = useState(0);
  const { getToken } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const token = await getToken();
      const response = await fetch(`${import.meta.env.VITE_BACKEND}/generate`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ gpa, grade, interests, activities, demographic, testing, collegeGoals, classes, location })
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.roadmap) {
        throw new Error('No roadmap data received from server');
      }
      
      setRoadmap(data.roadmap);
      setRetryCount(0);
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
    <div className="max-w-3xl mx-auto">
      {error && (
        <Card variant="default" padding="default" className="mb-6 bg-red-50 border-red-200">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-red-800 mb-1">Error generating roadmap</h4>
              <p className="text-sm text-red-700 mb-3">{error}</p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRetry}
                  disabled={retryCount >= 3}
                  className="border-red-300 text-red-700 hover:bg-red-100"
                >
                  {retryCount >= 3 ? 'Max retries reached' : `Retry (${retryCount}/3)`}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setError('')}
                  className="text-red-700 hover:bg-red-100"
                >
                  Dismiss
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}
      
      <Card variant="elevated" padding="lg">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">
            Generate Your College Roadmap
          </h2>
          <p className="text-[var(--color-text-secondary)]">
            Share your information to receive a personalized college preparation plan
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Select
            label="Grade Level"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            required
            helperText="Your current academic year"
          >
            <option value="">Select your grade</option>
            <option value="9">9th Grade</option>
            <option value="10">10th Grade</option>
            <option value="11">11th Grade</option>
            <option value="12">12th Grade</option>
            <option value="Community college">Community College</option>
            <option value="other">Out of school, looking to get back in</option>
          </Select>

          <Input
            label="GPA"
            type="number"
            value={gpa}
            onChange={(e) => setGpa(e.target.value)}
            step="0.01"
            min="0"
            max="4"
            placeholder="e.g., 3.5"
            helperText="Your current grade point average (0.0-4.0 scale)"
            required
          />

          <Textarea
            label="Course Rigor"
            value={classes}
            onChange={(e) => setClasses(e.target.value)}
            placeholder="e.g., I have taken 7/11 AP classes, We have no AP or Honors Classes. Also feel free to drop your upcoming schedule"
            helperText="Describe the difficulty of your classes and any advanced courses"
            rows={3}
            required
          />

          <Textarea
            label="Interests & Goals"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            placeholder="e.g., computer science, medicine, social justice"
            helperText="What are you passionate about? What do you want to study?"
            rows={3}
            required
          />

          <Textarea
            label="Activities & Extracurriculars"
            value={activities}
            onChange={(e) => setActivities(e.target.value)}
            placeholder="e.g., debate, HackClub, Research - please try to be specific"
            helperText="List your clubs, sports, volunteer work, jobs, etc."
            rows={3}
            required
          />

          <Textarea
            label="Demographic Information"
            value={demographic}
            onChange={(e) => setDemographic(e.target.value)}
            placeholder="e.g., first-generation college student, low-income, rural area, underrepresented minority"
            helperText="Optional: Help us tailor advice to your unique circumstances"
            rows={2}
          />

          <Textarea
            label="SAT/Testing"
            value={testing}
            onChange={(e) => setTesting(e.target.value)}
            placeholder="e.g., 1330 SAT, haven't taken the SAT yet, plan on taking it soon aiming for..."
            helperText="Current scores or testing plans (SAT, ACT, AP exams, etc.)"
            rows={2}
          />

          <Textarea
            label="College Goals"
            value={collegeGoals}
            onChange={(e) => setCollegeGoals(e.target.value)}
            placeholder="e.g., Ivy League, state schools, specific universities, community college transfer, gap year plans"
            helperText="What type of colleges are you interested in?"
            rows={3}
          />

        <Textarea
          label="Location Preferences"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="e.g., want to stay close to home in California, open to East Coast, prefer urban areas, must be near family"
          helperText="Geographic preferences or constraints for college location"
          rows={2}
        />

          <div className="pt-4">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
            >
              Generate My Roadmap
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default RoadmapForm;
