import React, { useState } from 'react';

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
        social: [
            "Social Worker",
            "Teacher/Educator",
            "Counselor",
            "Human Resources Specialist",
            "Nurse",
            "Community Health Worker"
        ],
        analytical: [
            "Data Analyst",
            "Software Engineer",
            "Accountant",
            "Financial Analyst",
            "Research Scientist",
            "Actuary"
        ],
        creative: [
            "Graphic Designer",
            "Web Developer",
            "Marketing Specialist",
            "Content Creator",
            "Interior Designer",
            "Video Editor"
        ],
        practical: [
            "Electrician",
            "Plumber",
            "Construction Manager",
            "HVAC Technician",
            "Automotive Technician",
            "Landscaper"
        ],
        stem: [
            "Engineer",
            "Computer Scientist",
            "Biologist",
            "Chemist",
            "Physicist",
            "Mathematician"
        ],
        humanities: [
            "Writer/Journalist",
            "Lawyer",
            "Librarian",
            "Historian",
            "Translator",
            "Public Relations Specialist"
        ],
        arts: [
            "Artist",
            "Photographer",
            "Fashion Designer",
            "Musician",
            "Film Director",
            "Architect"
        ],
        business: [
            "Business Manager",
            "Entrepreneur",
            "Sales Representative",
            "Project Manager",
            "Consultant",
            "Real Estate Agent"
        ],
        intellectual: [
            "Researcher",
            "Professor",
            "Librarian",
            "Policy Analyst",
            "Think Tank Researcher",
            "Intelligence Analyst"
        ],
        technical: [
            "IT Specialist",
            "Network Administrator",
            "Systems Analyst",
            "Database Administrator",
            "Cybersecurity Specialist",
            "Technical Support"
        ],
        helping: [
            "Social Worker",
            "Nurse",
            "Teacher",
            "Counselor",
            "Non-profit Worker",
            "Healthcare Administrator"
        ],
        financial: [
            "Financial Advisor",
            "Investment Banker",
            "Accountant",
            "Insurance Agent",
            "Real Estate Investor",
            "Business Owner"
        ],
        stability: [
            "Government Employee",
            "Teacher",
            "Nurse",
            "Accountant",
            "IT Professional",
            "Healthcare Administrator"
        ],
        interpersonal: [
            "Sales Representative",
            "Human Resources Manager",
            "Public Relations Specialist",
            "Event Planner",
            "Recruiter",
            "Customer Service Manager"
        ],
        physical: [
            "Personal Trainer",
            "Physical Therapist",
            "Construction Worker",
            "Landscaper",
            "Athletic Trainer",
            "Firefighter"
        ]
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

        // Sort careers by frequency and return top 6
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
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl p-8">
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
                        Your Career Recommendations
                    </h2>
                    <p className="text-gray-600 text-center mb-8">
                        Based on your answers, here are some career paths that might be a good fit for you:
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {recommendedCareers.map((career, index) => (
                            <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-l-4 border-blue-500 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{career}</h3>
                                <p className="text-gray-600 text-sm">
                                    This career aligns with your interests and preferences!
                                </p>
                            </div>
                        ))}
                    </div>
                    
                    <div className="text-center">
                        <button 
                            onClick={resetQuiz} 
                            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                        >
                            Take Quiz Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const currentQ = questions[currentQuestion];

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
                <div className="mb-8">
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                        ></div>
                    </div>
                    <p className="text-gray-600 text-sm text-center">
                        Question {currentQuestion + 1} of {questions.length}
                    </p>
                </div>

                <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
                    {currentQ.question}
                </h2>
                
                <div className="space-y-4 mb-8">
                    {currentQ.options.map((option, index) => (
                        <button
                            key={index}
                            className={`w-full p-6 text-left rounded-xl border-2 transition-all duration-300 hover:shadow-md hover:-translate-y-1 ${
                                answers[currentQuestion] === option.value
                                    ? 'border-blue-500 bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                                    : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300'
                            }`}
                            onClick={() => handleAnswer(option.value)}
                        >
                            {option.text}
                        </button>
                    ))}
                </div>

                <div className="text-center">
                    {answers[currentQuestion] && (
                        <button 
                            onClick={nextQuestion} 
                            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                        >
                            {currentQuestion === questions.length - 1 ? 'See Results' : 'Next Question'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CareerQuiz; 