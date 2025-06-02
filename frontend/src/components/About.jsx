import React from 'react';
import Feedback from './Feedback';

function About() {
  return (
    <main className="bg-white min-h-screen">
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Why College Roadmap Generator?</h2>
          <p className="text-lg text-gray-700 text-center mb-12 max-w-3xl mx-auto">
            Navigating college can be overwhelming, especially for first-generation students. 
            Having experienced this challenge firsthand as a first-gen student myself, I created 
            the College Roadmap Generator to provide the personalized guidance I wish I'd had—helping 
            you succeed throughout your academic journey.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Personalized Planning</h3>
              <p className="text-gray-600">Get customized roadmaps based on your goals, interests, and circumstances.</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">First-Gen Focused</h3>
              <p className="text-gray-600">Specifically designed to address the unique challenges faced by first-generation college students.</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Comprehensive Support</h3>
              <p className="text-gray-600">From academic planning to scholarship opportunities, we've got you covered.</p>
            </div>
          </div>
          
          <div className="bg-blue-50 p-8 rounded-lg mb-12">
            <h3 className="text-2xl font-semibold mb-4 text-center">Mission</h3>
            <p className="text-gray-700 text-center max-w-3xl mx-auto">
              I believe every student deserves access to the tools and guidance needed for college success.
              This platform breaks down barriers for first-gen students, ensuring everyone has 
              the opportunity to pursue higher education with confidence.
            </p>
          </div>
{/* 
          <div className="text-center">
            <img 
              src="IMG_4558.jpg" 
              alt="About us" 
              className="mx-auto rounded-lg shadow-md max-w-sm"
            />
          </div> */}
        </div>
      </section>
    
    </main>
  );
}

export default About;