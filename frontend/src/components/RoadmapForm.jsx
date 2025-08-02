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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch(`${import.meta.env.VITE_BACKEND}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gpa, grade, interests, activities, demographic, testing, collegeGoals, classes })
    });
    const data = await res.json();
    setRoadmap(data.roadmap);
    setLoading(false);
  };

  return (
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
  );
}

export default RoadmapForm;