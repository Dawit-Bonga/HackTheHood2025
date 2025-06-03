import React from 'react';
import ScholarshipList from './ScholarshipList';

function Scholarship() {
  return (
    <main className="py-12 px-6 bg-white text-gray-800">
      <section className="max-w-5xl mx-auto">
        {/* <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-yellow-600">🚧 THIS PAGE IS UNDER CONSTRUCTION</h1>
          <p className="text-gray-600 mt-2">But it will be coming soon!</p>
        </div> */}

        <h2 className="text-3xl font-bold mb-4 text-center">Scholarship Opportunities</h2>
        <p className="text-lg leading-relaxed text-center mb-10">
          Find scholarships and financial aid opportunities specifically designed 
          for first-generation college students and underrepresented communities.
        </p>

        <div className="grid gap-8 md:grid-cols-2 mb-12">
          <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">First-Generation Student Scholarships</h3>
            <p>Scholarships specifically for students who are the first in their family to attend college.</p>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">Need-Based Financial Aid</h3>
            <p>Financial assistance based on demonstrated financial need and family income.</p>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">Merit-Based Scholarships</h3>
            <p>Awards based on academic achievement, leadership, and extracurricular involvement.</p>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">Community-Specific Awards</h3>
            <p>Scholarships for students from specific communities, backgrounds, or geographic areas.</p>
          </div>
        </div>

        <div className="bg-blue-50 p-8 rounded-xl shadow">
          <h3 className="text-2xl font-bold mb-4">Scholarship Application Tips</h3>
          <ul className="list-disc list-inside text-gray-800 space-y-2">
            <li>Start your search early — many deadlines are months before college starts</li>
            <li>Apply to multiple scholarships to increase your chances</li>
            <li>Tailor each application to the specific scholarship requirements</li>
            <li>Get letters of recommendation well in advance</li>
            <li>Keep track of deadlines and requirements in a spreadsheet</li>
          </ul>
        </div>
      </section>

      <ScholarshipList />

    </main>
  );
}

export default Scholarship;
