import React from 'react';
import ScholarshipList from './ScholarshipList';

function Scholarship() {
  return (
    <main className="py-12 px-6 bg-white text-gray-800">
      <section>
        <h1 className="text-5xl font-bold mb-4 text-center">Paying for College: Financial Aid Basics</h1>
        <p className="text-lg leading-relaxed text-center mb-10">
          College can be expensive, but there are many ways to make it affordable. Financial aid is money that helps you pay for college, and it can come from the government, your college, or private organizations. There are several main types of financial aid:
        </p>
        <ul className="list-disc list-inside mb-4 space-y-1 max-w-2xl mx-auto">
          <li>
            <strong>Grants:</strong> Free money for college that you don’t have to pay back. Grants are usually based on your financial need.
          </li>
          <li>
            <strong>Scholarships:</strong> Free money awarded for things like good grades, special talents, or being part of a certain group. You don’t have to pay scholarships back.
          </li>
          <li>
            <strong>Work-Study:</strong> A program that lets you work part-time (often on campus) to help pay for your education.
          </li>
          <li>
            <strong>Loans:</strong> Money you borrow for college that you must pay back with interest after you graduate or leave school.
          </li>
        </ul>
        <p className="text-lg leading-relaxed text-center mb-8">
          Most students use a mix of these options to pay for college. The next step is learning about the FAFSA, which is the main way to apply for federal and many state and college financial aid programs.
        </p>
        <h2 className="text-3xl font-bold mb-4 text-center">What is FAFSA?</h2>
        <ul className="list-disc list-inside mb-4 space-y-1 max-w-2xl mx-auto">
          <li>
            <strong>FAFSA:</strong> FAFSA stands for Free Application for Federal Student Aid. It’s a form that students in the U.S. fill out to get money to help pay for college.
          </li>
        </ul>
        </section>
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
