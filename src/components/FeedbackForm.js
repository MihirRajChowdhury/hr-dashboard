'use client';
import { useState } from 'react';

export default function FeedbackForm() {
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (feedback.trim() === '') {
      setError('Feedback cannot be empty');
      return;
    }

    // Simulate submission
    console.log('Feedback submitted:', feedback);
    setSubmitted(true);
    setFeedback('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      {submitted && (
        <div className="text-green-600 font-medium">
          ✅ Thank you for your feedback!
        </div>
      )}

      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Your Feedback
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows={4}
          className="mt-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
          placeholder="Tell us what you think..."
        />
      </label>

      {error && <div className="text-red-500 text-sm">{error}</div>}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Submit Feedback
      </button>
    </form>
  );
}
