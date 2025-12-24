import React, { useState } from 'react';
import Button from './ui/Button';
import Card from './ui/Card';

const CareerQuiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);

    const questions = [
        {
            id: 1,
            question: "What type of work environment do you prefer?",
            options: [
                { text: "Working with people and helping others", value: "social" },
                { text: "Working with data and solving complex problems", value: "analytical" },
                { text: "Creating and designing things", value: "creative" },
                { text: "Working outdoors or with my hands", value: "practical" }
            ]
        },
        {
            id: 2,
            question: "What subjects do you enjoy most?",
            options: [
                { text: "Math and Science", value: "stem" },
                { text: "English and Literature", value: "humanities" },
                { text: "Art and Design", value: "arts" },
                { text: "Business and Economics", value: "business" }
            ]
        },
        {
            id: 3,
            question: "How do you prefer to spend your free time?",
            options: [
                { text: "Reading and learning new things", value: "intellectual" },
                { text: "Socializing with friends and family", value: "social" },
                { text: "Building or fixing things", value: "technical" },
                { text: "Exercising and being active", value: "active" }
            ]
        },
        {
            id: 4,
            question: "What's most important to you in a career?",
            options: [
                { text: "Making a positive impact on others", value: "helping" },
                { text: "Earning a good salary", value: "financial" },
                { text: "Having creative freedom", value: "creative" },
                { text: "Job security and stability", value: "stability" }
            ]
        },
        {
            id: 5,
            question: "What type of challenges do you enjoy?",
            options: [
                { text: "Solving technical problems", value: "technical" },
                { text: "Working with people and communication", value: "interpersonal" },
                { text: "Creative problem-solving", value: "creative" },
                { text: "Physical challenges and hands-on work", value: "physical" }
            ]
        }
    ];

    const careerRecommendations = {
        social: ["Social Worker", "Teacher/Educator", "Counselor", "Human Resources Specialist", "Nurse", "Community Health Worker"],
        analytical: ["Data Analyst", "Software Engineer", "Accountant", "Financial Analyst", "Research Scientist", "Actuary"],
        creative: ["Graphic Designer", "Web Developer", "Marketing Specialist", "Content Creator", "Interior Designer", "Video Editor"],
        practical: ["Electrician", "Plumber", "Construction Manager", "HVAC Technician", "Automotive Technician", "Landscaper"],
        stem: ["Engineer", "Computer Scientist", "Biologist", "Chemist", "Physicist", "Mathematician"],
        humanities: ["Writer/Journalist", "Lawyer", "Librarian", "Historian", "Translator", "Public Relations Specialist"],
        arts: ["Artist", "Photographer", "Fashion Designer", "Musician", "Film Director", "Architect"],
        business: ["Business Manager", "Entrepreneur", "Sales Representative", "Project Manager", "Consultant", "Real Estate Agent"],
        intellectual: ["Researcher", "Professor", "Librarian", "Policy Analyst", "Think Tank Researcher", "Intelligence Analyst"],
        technical: ["IT Specialist", "Network Administrator", "Systems Analyst", "Database Administrator", "Cybersecurity Specialist", "Technical Support"],
        helping: ["Social Worker", "Nurse", "Teacher", "Counselor", "Non-profit Worker", "Healthcare Administrator"],
        financial: ["Financial Advisor", "Investment Banker", "Accountant", "Insurance Agent", "Real Estate Investor", "Business Owner"],
        stability: ["Government Employee", "Teacher", "Nurse", "Accountant", "IT Professional", "Healthcare Administrator"],
        interpersonal: ["Sales Representative", "Human Resources Manager", "Public Relations Specialist", "Event Planner", "Recruiter", "Customer Service Manager"],
        physical: ["Personal Trainer", "Physical Therapist", "Construction Worker", "Landscaper", "Athletic Trainer", "Firefighter"]
    };

    const handleAnswer = (value) => {
        setAnswers({
            ...answers,
            [currentQuestion]: value
        });
    };

    const nextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowResults(true);
        }
    };

    const getCareerResults = () => {
        const answerValues = Object.values(answers);
        const careerCounts = {};
        
        answerValues.forEach(value => {
            if (careerRecommendations[value]) {
                careerRecommendations[value].forEach(career => {
                    careerCounts[career] = (careerCounts[career] || 0) + 1;
                });
            }
        });

        return Object.entries(careerCounts)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 6)
            .map(([career]) => career);
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setAnswers({});
        setShowResults(false);
    };

    if (showResults) {
        const recommendedCareers = getCareerResults();
        
        return (
            <div className="bg-white min-h-screen">
                <section className="section bg-gradient-to-b from-[var(--color-bg-secondary)] to-white">
                    <div className="container max-w-4xl">
                        <Card variant="elevated" padding="lg">
                            <div className="text-center mb-8">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-3">
                                    Your Career Recommendations
                                </h2>
                                <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
                                    Based on your answers, here are some career paths that align with your interests and preferences:
                                </p>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                {recommendedCareers.map((career, index) => (
                                    <div key={index} className="quiz-option p-6 bg-[var(--color-bg-secondary)] rounded-lg border-l-4 border-[var(--color-primary)] hover:shadow-[var(--shadow-md)]">
                                        <div className="flex items-start gap-3">
                                            <div className="flex-shrink-0 w-8 h-8 bg-[var(--color-primary-light)] rounded-lg flex items-center justify-center">
                                                <span className="text-[var(--color-primary)] font-bold">{index + 1}</span>
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-1">{career}</h3>
                                                <p className="text-sm text-[var(--color-text-secondary)]">
                                                    This career aligns with your interests
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="p-6 bg-[var(--color-primary-light)] rounded-lg mb-6">
                                <p className="text-sm text-[var(--color-primary)] text-center">
                                    <strong>Next Steps:</strong> Research these careers, talk to professionals in these fields, and consider related majors when planning your college path.
                                </p>
                            </div>
                            
                            <div className="flex justify-center gap-4">
                                <Button variant="primary" size="lg" onClick={resetQuiz}>
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                    Take Quiz Again
                                </Button>
                            </div>
                        </Card>
                    </div>
                </section>
            </div>
        );
    }

    const currentQ = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
        <div className="bg-white min-h-screen">
            <section className="section bg-gradient-to-b from-[var(--color-bg-secondary)] to-white">
                <div className="container max-w-2xl">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-[var(--color-text-primary)] mb-3">
                            Career Discovery Quiz
                        </h1>
                        <p className="text-[var(--color-text-secondary)]">
                            Answer a few questions to discover careers that match your interests
                        </p>
                    </div>

                    <Card variant="elevated" padding="lg">
                        {/* Progress Bar */}
                        <div className="mb-8">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-[var(--color-text-primary)]">
                                    Question {currentQuestion + 1} of {questions.length}
                                </span>
                                <span className="text-sm font-medium text-[var(--color-primary)]">
                                    {Math.round(progress)}%
                                </span>
                            </div>
                            <div className="w-full bg-[var(--color-border)] rounded-full h-2">
                                <div 
                                    className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Question */}
                        <h2 className="text-2xl font-bold text-[var(--color-text-primary)] text-center mb-8">
                            {currentQ.question}
                        </h2>
                        
                        {/* Options */}
                        <div className="space-y-3 mb-8">
                            {currentQ.options.map((option, index) => (
                                <button
                                    key={index}
                                    className={`quiz-option w-full p-5 text-left rounded-lg border-2 transition-all ${
                                        answers[currentQuestion] === option.value
                                            ? 'border-[var(--color-primary)] bg-[var(--color-primary-light)] selected'
                                            : 'border-[var(--color-border)] bg-white hover:border-[var(--color-primary)]'
                                    }`}
                                    onClick={() => handleAnswer(option.value)}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                            answers[currentQuestion] === option.value
                                                ? 'border-[var(--color-primary)] bg-[var(--color-primary)]'
                                                : 'border-[var(--color-border)]'
                                        }`}>
                                            {answers[currentQuestion] === option.value && (
                                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                        </div>
                                        <span className={`font-medium ${
                                            answers[currentQuestion] === option.value
                                                ? 'text-[var(--color-primary)]'
                                                : 'text-[var(--color-text-primary)]'
                                        }`}>
                                            {option.text}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Next Button */}
                        <div className="text-center">
                            {answers[currentQuestion] ? (
                                <Button 
                                    variant="primary" 
                                    size="lg"
                                    onClick={nextQuestion}
                                >
                                    {currentQuestion === questions.length - 1 ? 'See My Results' : 'Next Question'}
                                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </Button>
                            ) : (
                                <p className="text-sm text-[var(--color-text-muted)]">
                                    Select an answer to continue
                                </p>
                            )}
                        </div>
                    </Card>
                </div>
            </section>
        </div>
    );
};

export default CareerQuiz;
