import React, { useState } from 'react';
import EssayDisplay from './EssayDisplay';
import { useAuth } from '../context/AuthContext';
import Button from './ui/Button';
import Card from './ui/Card';
// import { Textarea, Select } from './ui/Input';
import { Textarea, Select, Input } from './ui/Input';

function EssayForm({ setEssayFeedback, setLoading }) {
    const [prompt, setPrompt] = useState('');
    const [program, setProgram] = useState('');
    const [grade, setGrade] = useState('');
    const [essay, setEssay] = useState('');
    const [error, setError] = useState('');
    const [wordLimit, setWordLimit] = useState('')
    const [retryCount, setRetryCount] = useState(0);
    const { getToken } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            const token = await getToken();
            const response = await fetch(`${import.meta.env.VITE_BACKEND}/essay`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ prompt, 
                    grade, 
                    program, 
                    essay,
                    word_limit: wordLimit ? parseInt(wordLimit) : null })
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            
            if (!data.feedback) {
                throw new Error('No feedback data received from server');
            }
            
            setEssayFeedback(data.feedback);
            setRetryCount(0);
        } catch (err) {
            console.error('Essay feedback error:', err);
            
            let errorMessage = 'Failed to get essay feedback. ';
            
            if (err.name === 'TypeError' && err.message.includes('fetch')) {
                errorMessage += 'Unable to connect to the server. Please check your internet connection.';
            } else if (err.message.includes('Server error: 500')) {
                errorMessage += 'Server is temporarily unavailable. Please try again later.';
            } else if (err.message.includes('Server error: 400')) {
                errorMessage += 'Invalid essay data. Please check your essay content.';
            } else if (err.message.includes('Server error: 429')) {
                errorMessage += 'Too many requests. Please wait a moment before trying again.';
            } else {
                errorMessage += err.message || 'An unexpected error occurred.';
            }
            
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleRetry = () => {
        setRetryCount(prev => prev + 1);
        setError('');
        handleSubmit(new Event('submit'));
    };

    return (
        <div className="max-w-3xl mx-auto">
            {error && (
                <Card variant="default" padding="default" className="mb-6 bg-red-50 border-red-200">
                    <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <div className="flex-1">
                            <h4 className="text-sm font-semibold text-red-800 mb-1">Error getting essay feedback</h4>
                            <p className="text-sm text-red-700 mb-3">{error}</p>
                            <div className="flex gap-3">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleRetry}
                                    disabled={retryCount >= 3}
                                    className="border-red-300 text-red-700 hover:bg-red-100"
                                >
                                    {retryCount >= 3 ? 'Max retries reached' : `Retry (${retryCount}/3)`}
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setError('')}
                                    className="text-red-700 hover:bg-red-100"
                                >
                                    Dismiss
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>
            )}
            
            <Card variant="elevated" padding="lg">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">
                        Essay Feedback & Grading
                    </h2>
                    <p className="text-[var(--color-text-secondary)]">
                        Get AI-powered feedback on your college essays to improve clarity, impact, and effectiveness
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Select
                        label="Grade Level"
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        required
                    >
                        <option value="">Select your grade</option>
                        <option value="9">9th Grade</option>
                        <option value="10">10th Grade</option>
                        <option value="11">11th Grade</option>
                        <option value="12">12th Grade</option>
                    </Select>

                    <Textarea
                        label="Essay Prompt"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="e.g., Describe a challenge you've overcome (500 words max)"
                        helperText="Include the prompt and word limit if applicable"
                        rows={3}
                        required
                    />

                    <Input
                        label="Word Limit (Optional)"
                        type="number"
                        placeholder="e.g. 650"
                        value={wordLimit}
                        onChange={(e) => setWordLimit(e.target.value)}
                    />

                    <Textarea
                        label="Program / School"
                        value={program}
                        onChange={(e) => setProgram(e.target.value)}
                        placeholder="e.g., University of California - Computer Science Program"
                        helperText="Which program or school is this essay for?"
                        rows={2}
                        required
                    />

                    <Textarea
                        label="Your Essay"
                        value={essay}
                        onChange={(e) => setEssay(e.target.value)}
                        placeholder="Paste your essay here for detailed feedback..."
                        rows={12}
                        helperText="Our AI will analyze your essay for clarity, structure, grammar, and impact"
                        required
                    />

                    <div className="pt-4">
                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            fullWidth
                        >
                            Get Detailed Feedback
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                            </svg>
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}

function EssayPage() {
    const [essayFeedback, setEssayFeedback] = useState('');
    const [loading, setLoading] = useState(false);

    return (
        <div className="bg-white min-h-screen">
            <section className="section bg-gradient-to-b from-[var(--color-bg-secondary)] to-white">
                <div className="container">
                    <div className="text-center mb-12 max-w-3xl mx-auto">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--color-primary-light)] rounded-full mb-6">
                            <svg className="w-8 h-8 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-4">
                            Essay Grader
                        </h1>
                        <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
                            Get instant, AI-powered feedback on your college essays. 
                            Improve your writing and stand out in your applications.
                        </p>
                    </div>
                    
                    <EssayForm setEssayFeedback={setEssayFeedback} setLoading={setLoading} />
                </div>
            </section>
            
            {(loading || essayFeedback) && (
                <section className="section">
                    <div className="container">
                        <EssayDisplay essay={essayFeedback} loading={loading} />
                    </div>
                </section>
            )}
        </div>
    );
}

export default EssayPage;
