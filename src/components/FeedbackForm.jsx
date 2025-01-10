import React, { useState } from 'react';

export function FeedbackForm({ onClose }) {
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'feedback',
          message: feedback,
        }).toString(),
      });
      
      if (response.ok) {
        setSubmitted(true);
      } else {
        alert("Sorry, there was an error sending your feedback. Please try again.");
      }
    } catch (error) {
      alert("Sorry, there was an error sending your feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
              <p className="text-[#f5f2e6] mb-6">
                Your feedback has been received and will help us improve the game.
              </p>
              <button
                onClick={onClose}
                className="bg-[#1e4fba] hover:bg-[#2460e6] text-white py-2 px-6 rounded-lg transition-all duration-300 ease-in-out"
              >
                Close
              </button>
            </div>
          ) : (
            <form 
              onSubmit={handleSubmit} 
              className="space-y-4"
              data-netlify="true"
              name="feedback"
              method="POST"
            >
              <input type="hidden" name="form-name" value="feedback" />
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
                  name="message"
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
                  disabled={isSubmitting}
                  className={`bg-[#1e4fba] hover:bg-[#2460e6] text-white py-2 px-6 rounded-lg transition-all duration-300 ease-in-out ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  style={{ fontFamily: 'Douglas-Burlington-Regular' }}
                >
                  {isSubmitting ? 'Sending...' : 'Send Feedback'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
} 