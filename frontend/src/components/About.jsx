import React from 'react';

function About() {
  return (
    <main className="main-content">
      <section className="about-section">
        <div className="about-container">
          <h2>Why College Roadmap Generator?</h2>
          <p>
            Navigating college can be overwhelming, especially for first-generation students. 
            Our College Roadmap Generator provides personalized guidance to help you succeed 
            throughout your academic journey.
          </p>
          
          <div className="features">
            <div className="feature">
              <h3>Personalized Planning</h3>
              <p>Get customized roadmaps based on your goals, interests, and circumstances.</p>
            </div>
            
            <div className="feature">
              <h3>First-Gen Focused</h3>
              <p>Specifically designed to address the unique challenges faced by first-generation college students.</p>
            </div>
            
            <div className="feature">
              <h3>Comprehensive Support</h3>
              <p>From academic planning to scholarship opportunities, we've got you covered.</p>
            </div>
          </div>
          
          <div className="mission">
            <h3>Our Mission</h3>
            <p>
              We believe every student deserves access to the tools and guidance necessary 
              for college success. Our platform democratizes educational planning and 
              empowers students to make informed decisions about their academic future.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;