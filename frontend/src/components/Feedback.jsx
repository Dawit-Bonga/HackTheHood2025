import React, { useState } from 'react';

function Feedback() {
  const [feedback, setFeedback] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND}/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ feedback }),
      });

      const result = await response.json();
      
      if (response.ok && result.success) {
        setSubmitted(true);
        setFeedback('');
        setTimeout(() => {
          setSubmitted(false);
          setIsOpen(false);
        }, 2000);
      } else {
        console.error('Error:', result.error);
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10">
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
      >
        Interested in giving feedback? {isOpen ? '▲' : '▼'}
      </button>
      
      {/* Animated Feedback Form */}
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <form onSubmit={handleSubmit} className="mt-3 p-4 bg-gray-300 rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold text-black mb-3">We value your feedback!</h2>
          <textarea
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Please help by providing feedback on what you'd like to see and what I can improve"
            rows="3"
            required
          />
          <button
            type="submit"
            disabled={isSubmitting || !feedback.trim()}
            className="mt-3 w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : submitted ? 'Thank you!' : 'Submit Feedback'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Feedback;