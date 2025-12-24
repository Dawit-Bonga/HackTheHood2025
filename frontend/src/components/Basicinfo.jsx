import React from "react";
import { Link } from 'react-router-dom';
import Card from './ui/Card';
import Button from './ui/Button';

function Basics() {
  const sections = [
    {
      title: "Types of Colleges",
      items: [
        { label: "Community Colleges", desc: "2-year institutions offering associate degrees and certificates. Many students transfer to 4-year colleges after." },
        { label: "Liberal Arts Colleges", desc: "4-year schools focused on broad undergraduate education in arts, sciences, and humanities." },
        { label: "Universities", desc: "Larger institutions offering undergraduate and graduate degrees (bachelor's, master's, PhD)." },
        { label: "Technical & Vocational Schools", desc: "Focused on specific trades or careers (e.g., nursing, automotive, culinary)." },
        { label: "Public vs. Private", desc: "Public colleges are funded by the state and usually cost less for in-state students. Private colleges are funded by tuition, donations, and endowments." }
      ]
    },
    {
      title: "Degrees You Can Earn",
      items: [
        { label: "Associate Degree", desc: "Usually 2 years (community college)." },
        { label: "Bachelor's Degree", desc: "Usually 4 years (college or university)." },
        { label: "Master's/Graduate Degrees", desc: "Advanced study after a bachelor's (1-3+ years)." },
        { label: "Certificates", desc: "Shorter programs focused on specific skills or careers." }
      ]
    }
  ];

return (
    <div className="bg-white min-h-screen">
      <section className="section bg-gradient-to-b from-[var(--color-bg-secondary)] to-white">
        <div className="container max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--color-primary-light)] rounded-full mb-6">
              <svg className="w-8 h-8 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-[var(--color-text-primary)] mb-4">
              What is College?
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed">
              <strong>College</strong> is an educational institution that offers advanced learning after high school. 
              In the United States, "college" and "university" are often used interchangeably. 
              Many people go to college to grow in their careers and pursue their passions.
            </p>
          </div>

          {/* Main Content Cards */}
          <div className="space-y-8">
            {sections.map((section, idx) => (
              <Card key={idx} variant="elevated" padding="lg">
                <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">
                  {section.title}
                </h2>
                <div className="space-y-4">
                  {section.items.map((item, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[var(--color-primary)] mt-2"></div>
                      <div>
                        <strong className="text-[var(--color-text-primary)]">{item.label}:</strong>
                        <span className="text-[var(--color-text-secondary)] ml-2">{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}

            <Card variant="elevated" padding="lg">
              <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">
                Why Go to College?
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Gain specialized knowledge and skills for your career",
                  "Increase your earning potential and job opportunities",
                  "Meet new people, build networks, and grow personally",
                  "Explore interests and discover new passions"
                ].map((reason, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-[var(--color-bg-secondary)] rounded-lg">
                    <svg className="w-5 h-5 text-[var(--color-success)] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-[var(--color-text-primary)]">{reason}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card variant="elevated" padding="lg">
              <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">
                How Does College Work?
              </h2>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[var(--color-primary)] mt-2"></div>
                  <div>
                    <strong className="text-[var(--color-text-primary)]">Application:</strong>
                    <span className="text-[var(--color-text-secondary)] ml-2">
                      You apply to colleges, often during your senior year of high school. Applications may require essays, transcripts, test scores, and recommendations.
                    </span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[var(--color-primary)] mt-2"></div>
                  <div>
                    <strong className="text-[var(--color-text-primary)]">Majors & Minors:</strong>
                    <span className="text-[var(--color-text-secondary)] ml-2">
                      A <em>major</em> is your main area of study. A <em>minor</em> is a secondary focus.
                    </span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[var(--color-primary)] mt-2"></div>
                  <div>
                    <strong className="text-[var(--color-text-primary)]">Classes:</strong>
                    <span className="text-[var(--color-text-secondary)] ml-2">
                      You take required courses for your major and electives in other subjects.
                    </span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[var(--color-primary)] mt-2"></div>
                  <div>
                    <strong className="text-[var(--color-text-primary)]">Credits:</strong>
                    <span className="text-[var(--color-text-secondary)] ml-2">
                      Each class is worth a certain number of credits. You need a set number to graduate.
                    </span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[var(--color-primary)] mt-2"></div>
                  <div>
                    <strong className="text-[var(--color-text-primary)]">Campus Life:</strong>
                    <span className="text-[var(--color-text-secondary)] ml-2">
                      Includes clubs, sports, events, and living in dorms or off-campus housing.
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            <Card variant="elevated" padding="lg">
              <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">
                Paying for College
              </h2>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[var(--color-primary)] mt-2"></div>
                  <div>
                    <strong className="text-[var(--color-text-primary)]">Tuition & Fees:</strong>
                    <span className="text-[var(--color-text-secondary)] ml-2">
                      The cost of classes and enrollment.
                    </span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[var(--color-primary)] mt-2"></div>
                  <div>
                    <strong className="text-[var(--color-text-primary)]">Financial Aid:</strong>
                    <span className="text-[var(--color-text-secondary)] ml-2">
                      Includes grants, scholarships, work-study, and loans.{' '}
                      <Link to="/scholarship" className="text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-medium underline">
                        See our Scholarship page for more info!
                      </Link>
                    </span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[var(--color-primary)] mt-2"></div>
                  <div>
                    <strong className="text-[var(--color-text-primary)]">Living Expenses:</strong>
                    <span className="text-[var(--color-text-secondary)] ml-2">
                      Housing, food, books, transportation, and personal costs.
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            <Card variant="elevated" padding="lg">
              <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">
                Key Terms to Know
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { term: "FAFSA", def: "Free Application for Federal Student Aid (used to apply for financial aid)." },
                  { term: "GPA", def: "Grade Point Average, a measure of your academic performance." },
                  { term: "Transcript", def: "Official record of your classes and grades." },
                  { term: "Advisor", def: "A staff member who helps you choose classes and stay on track to graduate." },
                  { term: "Prerequisite", def: "A class you must take before another class." }
                ].map((item, i) => (
                  <div key={i} className="p-4 bg-[var(--color-bg-secondary)] rounded-lg">
                    <strong className="text-[var(--color-primary)]">{item.term}:</strong>
                    <p className="text-sm text-[var(--color-text-secondary)] mt-1">{item.def}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card variant="elevated" padding="lg" className="bg-gradient-to-br from-[var(--color-primary-light)] to-white">
              <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">
                Is College Right for You?
              </h2>
              <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
                College is a big step and a major investment in your future. It's not the only path, 
                but it opens many doors. Explore your options, ask questions, and find what fits your 
                goals and interests!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/career-quiz" className="flex-1">
                  <Button variant="primary" size="lg" fullWidth>
                    Take Career Quiz
                  </Button>
                </Link>
                <Link to="/roadmap" className="flex-1">
                  <Button variant="outline" size="lg" fullWidth>
                    Get Your Roadmap
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
);
}

export default Basics;
