import React from 'react';
import { Link } from 'react-router-dom';
import Button from './ui/Button';
import Card from './ui/Card';

function About() {
  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'Personalized Roadmaps',
      description: 'Get AI-powered, customized college plans based on your unique goals, background, and circumstances.'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: 'Career Guidance',
      description: 'Take our career quiz to discover majors and paths that align with your interests and strengths.'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Scholarship Database',
      description: 'Access curated scholarships and financial aid opportunities to make college affordable.'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      title: 'Essay Feedback',
      description: 'Get instant AI-powered feedback on your college essays to improve your applications.'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Share Your Story',
      description: 'Tell us about your background, interests, and goals. We understand that every student\'s journey is unique.'
    },
    {
      number: '02',
      title: 'Get Your Roadmap',
      description: 'Receive a personalized college plan with actionable steps, timelines, and recommendations.'
    },
    {
      number: '03',
      title: 'Take Action',
      description: 'Use our tools to find scholarships, prep for tests, write essays, and track your progress.'
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="section-lg bg-gradient-to-b from-[var(--color-bg-secondary)] to-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--color-primary-light)] text-[var(--color-primary)] rounded-full text-sm font-medium">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Free • Personalized • Built for You
              </div>
              
              <h1 className="text-5xl font-bold text-[var(--color-text-primary)] leading-tight">
                Your path to college, <span className="text-[var(--color-primary)]">simplified</span>
              </h1>
              
              <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
                College Express provides personalized guidance for first-generation and underrepresented students. 
                Get your roadmap, discover scholarships, and receive expert essay feedback—all in one place.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/basicInfo">
                  <Button variant="primary" size="lg" fullWidth className="sm:w-auto">
                    Generate My Roadmap
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Button>
                </Link>
                <Link to="/scholarship">
                  <Button variant="outline" size="lg" fullWidth className="sm:w-auto">
                    Browse Scholarships
                  </Button>
                </Link>
              </div>
              
              {/* Trust indicators */}
              <div className="flex flex-wrap items-center gap-6 pt-6 text-sm text-[var(--color-text-muted)]">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[var(--color-success)]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>100% Free</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[var(--color-success)]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>First-Gen Focused</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[var(--color-success)]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>AI-Powered</span>
                </div>
              </div>
            </div>
            
            {/* Right: Visual element */}
            <div className="hidden lg:block">
              <div className="relative">
                {/* Decorative elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-2xl opacity-10 blur-3xl"></div>
                <Card variant="elevated" className="relative">
                  <div className="p-8 space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[var(--color-primary-light)] rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-[var(--color-text-primary)]">Roadmap Generated</h4>
                        <p className="text-sm text-[var(--color-text-secondary)]">Your personalized plan</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {['Academic Planning', 'Test Prep Strategy', 'Essay Timeline', 'Application Checklist'].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-[var(--color-bg-secondary)] rounded-lg">
                          <svg className="w-5 h-5 text-[var(--color-success)]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm text-[var(--color-text-primary)]">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              Comprehensive tools designed specifically for students navigating the college application process.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                variant="default" 
                hover
                className="group"
              >
                <div className="h-full flex flex-col">
                  <div className="w-12 h-12 bg-[var(--color-primary-light)] rounded-lg flex items-center justify-center text-[var(--color-primary)] mb-4 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section bg-[var(--color-bg-secondary)]">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-4">
              How it works
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              Three simple steps to start your college journey with confidence.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connector line (desktop only) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-[var(--color-border)]"></div>
                )}
                
                <div className="text-center relative z-10">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-white border-4 border-[var(--color-primary-light)] rounded-full mb-6">
                    <span className="text-3xl font-bold text-[var(--color-primary)]">{step.number}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[var(--color-text-secondary)]">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section">
        <div className="container">
          <Card variant="elevated" className="max-w-4xl mx-auto">
            <div className="text-center p-8 md:p-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--color-primary-light)] rounded-full mb-6">
                <svg className="w-8 h-8 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              
              <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-6">
                Our Mission
              </h2>
              
              <blockquote className="text-xl text-[var(--color-text-secondary)] leading-relaxed mb-6 italic">
                "Every student deserves a shot at higher education, regardless of their background or circumstances."
              </blockquote>
              
              <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-8">
                As a first-generation college student, I understand the challenges of navigating the college application 
                process alone. College Express was built to provide the guidance and support that every student deserves—
                personalized, accessible, and completely free.
              </p>
              
              <Link to="/basicInfo">
                <Button variant="primary" size="lg">
                  Start Your Journey Today
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-lg bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]">
        <div className="container text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to take the next step?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already on their path to college success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/basicInfo">
              <Button 
                variant="secondary" 
                size="lg" 
                fullWidth 
                className="sm:w-auto bg-white text-[var(--color-primary)] hover:bg-gray-50"
              >
                Get Started Now
              </Button>
            </Link>
            <Link to="/career-quiz">
              <Button 
                variant="outline" 
                size="lg" 
                fullWidth 
                className="sm:w-auto border-white text-white hover:bg-white/10"
              >
                Take Career Quiz
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
