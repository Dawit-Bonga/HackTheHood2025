import React from 'react';

function Scholarship() {
  return (
    <main className="main-content">
      <section className="scholarship-section">
        <h1>🚧 THIS PAGE IS NOT DONE SO IGNORE IT BUT IT WILL BE COMING</h1>
        <div className="scholarship-container">
          <h2>Scholarship Opportunities</h2>
          <p>
            Find scholarships and financial aid opportunities specifically designed 
            for first-generation college students and underrepresented communities.
          </p>
          
          <div className="scholarship-categories">
            <div className="category">
              <h3>First-Generation Student Scholarships</h3>
              <p>Scholarships specifically for students who are the first in their family to attend college.</p>
            </div>
            
            <div className="category">
              <h3>Need-Based Financial Aid</h3>
              <p>Financial assistance based on demonstrated financial need and family income.</p>
            </div>
            
            <div className="category">
              <h3>Merit-Based Scholarships</h3>
              <p>Awards based on academic achievement, leadership, and extracurricular involvement.</p>
            </div>
            
            <div className="category">
              <h3>Community-Specific Awards</h3>
              <p>Scholarships for students from specific communities, backgrounds, or geographic areas.</p>
            </div>
          </div>
          
          <div className="scholarship-tips">
            <h3>Scholarship Application Tips</h3>
            <ul>
              <li>Start your search early - many deadlines are months before college starts</li>
              <li>Apply to multiple scholarships to increase your chances</li>
              <li>Tailor each application to the specific scholarship requirements</li>
              <li>Get letters of recommendation well in advance</li>
              <li>Keep track of deadlines and requirements in a spreadsheet</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Scholarship;