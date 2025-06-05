import React, { useState } from 'react';
import EssayDisplay from './EssayDisplay';

function EssayForm({ setEssayFeedback, setLoading }) {
    const [prompt, setPrompt] = useState('')
    const [program, setProgram] = useState('')
    const [grade, setGrade] = useState('')
    const [essay, setEssay] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const res = await fetch(`${import.meta.env.VITE_BACKEND}/essay`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt, grade, program, essay })
        });
        const data = await res.json();
        setEssayFeedback(data.feedback);
        setLoading(false);
    };

    return (
        <form className="roadmap-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="form-label" htmlFor='grade'>Grade Level:</label>
                <select
                    className="form-select"
                    id='grade'
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    required
                >
                    <option value="">--Select a Grade--</option>
                    <option value="9">9th</option>
                    <option value="10">10th</option>
                    <option value="11">11th</option>
                    <option value="12">12th</option>
                </select>
            </div>

            {/* <div className="form-group">
                <label className="form-label" htmlFor="gpa">GPA:</label>
                <input
                    className="form-input"
                    type="text"
                    id="gpa"
                    value={gpa}
                    onChange={(e) => setGpa(e.target.value)}
                    step="0.01"
                    min="0"
                    max="4"
                    placeholder="e.g., 3.5"
                    required
                />
            </div> */}

            <div className="form-group">
                <label className="form-label" htmlFor="prompt">Enter your prompt:</label>
                <textarea
                    className="form-textarea"
                    id="prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Please enter the prompt and put the word limit"
                    required
                />
            </div>

            <div className="form-group">
                <label className="form-label" htmlFor="program">Program/School:</label>
                <textarea
                    className="form-textarea"
                    id="program"
                    value={program}
                    onChange={(e) => setProgram(e.target.value)}
                    placeholder="Please put the program or school that you are applying to."
                    required
                />
            </div>

            <div className="form-group">
                <label className="form-label" htmlFor="essay">Essay:</label>
                <textarea
                    className="form-textarea w-full h-64 p-3 border rounded-md"
                    id="essay"
                    value={essay}
                    onChange={(e) => setEssay(e.target.value)}
                    placeholder="Paste your essay here for feedback"
                />
            </div>

            <button className="w-full bg-purple-500 text-white py-3 rounded-xl hover:bg-sky-600 transition font-semibold tracking-wide text-lg" type="submit">Get Essay Feedback</button>
        </form>
    );
}

function EssayPage() {
    const [essayFeedback, setEssayFeedback] = useState('');
    const [loading, setLoading] = useState(false);

    return (
        <main className="main-content">
            <EssayForm setEssayFeedback={setEssayFeedback} setLoading={setLoading} />
            <EssayDisplay essay={essayFeedback} loading={loading} />
        </main>
    );
}

export default EssayPage;