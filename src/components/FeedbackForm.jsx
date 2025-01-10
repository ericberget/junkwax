import React, { useState } from 'react';

export function FeedbackForm({ onClose }) {
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = `mailto:berget3333@gmail.com?subject=Baseball Time Machine Feedback&body=${encodeURIComponent(feedback)}`;
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-50 overflow-y-auto">
      <div className="max-w-2xl mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 
            className="text-4xl text-[#f5f2e6]"
            style={{ fontFamily: 'Douglas-Burlington-Regular' }}
          >
            Feedback
          </h2>
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-300"
          >
            Close
          </button>
        </div>

        <div className="bg-gray-800/90 rounded-lg p-6 border border-gray-700">
          <div className="mb-6 text-center">
            <div className="inline-block bg-blue-500/20 text-blue-300 px-4 py-2 rounded-lg mb-4">
              🎮 BETA VERSION
            </div>
            <p className="text-[#f5f2e6] text-lg">
              We're eager to hear your feedback and ideas for improving the game!
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-8">
              <div className="text-green-400 text-2xl mb-4" style={{ fontFamily: 'Douglas-Burlington-Regular' }}>
                Thank you for your feedback!
              </div>
              <p className="text-[#f5f2e6]">
                Your default email client should have opened with your feedback. 
                If it didn't, you can manually send your feedback to: berget3333@gmail.com
              </p>
              <button
                onClick={onClose}
                className="mt-6 bg-[#1e4fba] hover:bg-[#2460e6] text-white py-2 px-6 rounded-lg transition-all duration-300 ease-in-out"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label 
                  htmlFor="feedback" 
                  className="block text-[#f5f2e6] mb-2"
                  style={{ fontFamily: 'Douglas-Burlington-Regular' }}
                >
                  Your Feedback
                </label>
                <textarea
                  id="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full h-40 px-4 py-3 rounded-lg bg-gray-700 text-[#f5f2e6] border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
                  placeholder="Share your thoughts, suggestions, or report any issues..."
                  required
                />
              </div>
              <div className="text-right">
                <button
                  type="submit"
                  className="bg-[#1e4fba] hover:bg-[#2460e6] text-white py-2 px-6 rounded-lg transition-all duration-300 ease-in-out"
                  style={{ fontFamily: 'Douglas-Burlington-Regular' }}
                >
                  Send Feedback
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
} 