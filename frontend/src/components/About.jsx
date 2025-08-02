import React from 'react';
import Feedback from './Feedback';
import Basics from './Basicinfo';
import { Link } from 'react-router-dom';


function About() {
  return (
    <main className="bg-white min-h-screen">
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">College Express </h2>
          <p className="text-lg text-gray-700 text-center mb-12 max-w-3xl mx-auto">
            Navigating college can be overwhelming, especially for first-generation students. 
            Having experienced this challenge firsthand as a first-gen student. College Express is meant to help students from all walks of life 
            succeed whether they are in high school, in high school, community college, or just in pursuit of a degree
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Link to="/roadmap" className=" text-black text-center p-6 bg-gray-50 rounded-lg transition-transform hover:scale-105">
              <h3 className="text-xl font-semibold mb-3">Personalized Planning</h3>
              <p className="text-gray-600">Get customized roadmaps based on your goals, interests, and circumstances.</p>
            </Link>
            
            <Link to="/basicInfo" className="text-black text-center p-6 bg-gray-50 rounded-lg transition-transform hover:scale-105">
              <h3 className="text-xl font-semibold mb-3">First-Gen Focused</h3>
              <p className="text-gray-600">Specifically designed to address the unique challenges faced by first-generation college students.</p>
            </Link>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg transition-transform hover:scale-105">
              <h3 className="text-xl font-semibold mb-3">Comprehensive Support</h3>
              <p className="text-gray-600">From academic planning to scholarship opportunities, we've got you covered.</p>
            </div>

            <div className="md:col-span-3 flex justify-center">
              <Link to="/scholarship" className="text-black text-center p-6 bg-gray-50 rounded-lg transition-transform hover:scale-105">
                <h3 className="text-xl font-semibold mb-3">Scholarship Support</h3>
                <p className="text-gray-600">Access to a scholarship database that will help you pay for school.</p>
              </Link>
            </div>
          </div>

          {/* <a href="/scholarship"  */}

          
          <div className="flex justify-center">
          <div className="bg-blue-50 p-8 rounded-lg mb-12 ">
            <h3 className="text-2xl font-semibold mb-4 text-center">Mission</h3>
            <p className="text-gray-700 text-center max-w-3xl mx-auto">
              We believe every student should have a shot at college and we are working towards that reality.
            </p>
          </div>
          </div>

    <div className="flex flex-col items-center my-8">
        <img 
           src="IMG_8123.jpg" 
          alt="About us" 
         className="rounded-xl shadow-lg max-w-xs border border-gray-200 mb-4 transition-transform hover:scale-105"
         />
        <p className="text-gray-700 text-lg font-medium">The handsome men behind the app</p>
    </div>

        </div>

      </section>


    
    </main>

  );


}






export default About;