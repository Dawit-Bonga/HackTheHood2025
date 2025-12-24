import React from 'react';
import ScholarshipList from './ScholarshipList';
import Card from './ui/Card';

function Scholarship() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="section-lg bg-gradient-to-b from-[var(--color-bg-secondary)] to-white">
        <div className="container">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--color-primary-light)] rounded-full mb-6">
              <svg className="w-8 h-8 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-4">
              Paying for College
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
              College can be expensive, but there are many ways to make it affordable. 
              Discover financial aid options and scholarship opportunities designed for you.
            </p>
          </div>
        </div>
      </section>

      {/* Financial Aid Basics */}
      <section className="section">
        <div className="container max-w-5xl">
          <Card variant="elevated" padding="lg" className="mb-12">
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-6">
              Types of Financial Aid
            </h2>
            <p className="text-[var(--color-text-secondary)] mb-6 leading-relaxed">
              Financial aid is money that helps you pay for college. It can come from the government, 
              your college, or private organizations. There are several main types:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--color-text-primary)] mb-2">Grants</h3>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    Free money for college that you don't have to pay back. Usually based on financial need.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-[var(--color-primary-light)] rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--color-text-primary)] mb-2">Scholarships</h3>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    Free money awarded for grades, talents, or being part of a certain group. No repayment needed.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--color-text-primary)] mb-2">Work-Study</h3>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    A program that lets you work part-time (often on campus) to help pay for your education.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--color-text-primary)] mb-2">Loans</h3>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    Money you borrow for college that you must pay back with interest after graduation.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-[var(--color-primary-light)] rounded-lg">
              <p className="text-sm text-[var(--color-primary)]">
                <strong>Pro Tip:</strong> Most students use a mix of these options to pay for college. 
                Start by exploring grants and scholarships first, as they don't need to be repaid!
              </p>
            </div>
          </Card>

          {/* FAFSA Section */}
          <Card variant="elevated" padding="lg" className="mb-12">
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-16 h-16 bg-[var(--color-primary-light)] rounded-xl flex items-center justify-center">
                <svg className="w-8 h-8 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-3">
                  What is FAFSA?
                </h2>
                <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">
                  <strong className="text-[var(--color-text-primary)]">FAFSA</strong> stands for 
                  Free Application for Federal Student Aid. It's a form that students in the U.S. fill out 
                  to get money to help pay for college. Completing the FAFSA is the first step to accessing 
                  federal grants, work-study, and loans, as well as many state and college-specific aid programs.
                </p>
                <a 
                  href="https://studentaid.gov/h/apply-for-aid/fafsa" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-medium transition-colors"
                >
                  Learn more about FAFSA
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </Card>

          {/* Scholarship Categories */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] text-center mb-8">
              Scholarship Categories
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card variant="default" hover className="scholarship-card">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[var(--color-primary-light)] rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
                      First-Generation Student Scholarships
                    </h3>
                    <p className="text-[var(--color-text-secondary)]">
                      Scholarships specifically for students who are the first in their family to attend college.
                    </p>
                  </div>
                </div>
              </Card>

              <Card variant="default" hover className="scholarship-card">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
                      Need-Based Financial Aid
                    </h3>
                    <p className="text-[var(--color-text-secondary)]">
                      Financial assistance based on demonstrated financial need and family income.
                    </p>
                  </div>
                </div>
              </Card>

              <Card variant="default" hover className="scholarship-card">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
                      Merit-Based Scholarships
                    </h3>
                    <p className="text-[var(--color-text-secondary)]">
                      Awards based on academic achievement, leadership, and extracurricular involvement.
                    </p>
                  </div>
                </div>
              </Card>

              <Card variant="default" hover className="scholarship-card">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
                      Community-Specific Awards
                    </h3>
                    <p className="text-[var(--color-text-secondary)]">
                      Scholarships for students from specific communities, backgrounds, or geographic areas.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Application Tips */}
          <Card variant="elevated" padding="lg" className="bg-gradient-to-br from-[var(--color-primary-light)] to-white">
            <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">
              Scholarship Application Tips
            </h3>
            <div className="space-y-3">
              {[
                "Start your search early — many deadlines are months before college starts",
                "Apply to multiple scholarships to increase your chances",
                "Tailor each application to the specific scholarship requirements",
                "Get letters of recommendation well in advance",
                "Keep track of deadlines and requirements in a spreadsheet",
                "Proofread your essays multiple times before submitting"
              ].map((tip, index) => (
                <div key={index} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[var(--color-success)] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[var(--color-text-primary)]">{tip}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Scholarship List */}
      <section className="section bg-[var(--color-bg-secondary)]">
        <div className="container">
          <ScholarshipList />
        </div>
      </section>
    </div>
  );
}

export default Scholarship;
