import React, { useState } from 'react';

export function FeedbackForm({ onClose }) {
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create the email content
    const mailtoLink = `mailto:berget3333@gmail.com?subject=Junkwax Millionaire Feedback&body=${encodeURIComponent(feedback)}`;
    
    // Open the user's email client
    window.location.href = mailtoLink;
    
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-gray-800/90 rounded-lg p-6 border border-gray-700 animate-scaleIn relative">
        <img
          src="/baseballcards/me.jpg"
          alt="Eric Berget"
          className="absolute -top-12 -right-12 w-40 h-40 rounded-full object-cover border-4 border-[#1e4fba] shadow-2xl"
        />
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 
              className="text-3xl text-[#d4b483] mb-1"
              style={{ fontFamily: 'Douglas-Burlington-Regular' }}
            >
              Send Feedback
            </h2>
            <div className="text-[#f5f2e6]/70 text-sm">
              Game is currently in beta/experimental phase
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-xl"
          >
            ×
          </button>
        </div>

        {/* Profile Section */}
        <div className="mb-6 pb-6 border-b border-gray-700 pr-28">
          <div>
            <h3 
              className="text-xl text-[#f5f2e6] mb-2"
              style={{ fontFamily: 'Douglas-Burlington-Regular' }}
            >
              Hi! I'm Eric Berget
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              I created this game to capture the nostalgia of collecting baseball cards in the late 80s and early 90s. I'm trying to make something fun that you'll want to come back to every day. Let me know what you think! I'm open to all ideas on how to make it better - difficulty level, features, anything at all.
            </p>
          </div>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-700/30 text-[#f5f2e6] border border-gray-600/50 focus:border-[#d4b483] focus:outline-none min-h-[150px]"
                placeholder="Share your thoughts, suggestions, or report any issues..."
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#1e4fba] hover:bg-[#2460e6] text-white py-3 rounded-lg text-xl transition-all duration-300 ease-in-out disabled:opacity-50"
              style={{ fontFamily: 'Douglas-Burlington-Regular' }}
            >
              {isSubmitting ? 'Sending...' : 'Send Feedback'}
            </button>
          </form>
        ) : (
          <div className="text-center py-8">
            <div 
              className="text-2xl text-green-400 mb-4"
              style={{ fontFamily: 'Douglas-Burlington-Regular' }}
            >
              Thank You!
            </div>
            <p className="text-[#f5f2e6] mb-6">
              Your feedback has been sent. I appreciate your input!
            </p>
            <button
              onClick={onClose}
              className="bg-[#1e4fba] hover:bg-[#2460e6] text-white px-6 py-2 rounded-lg transition-all duration-300 ease-in-out"
              style={{ fontFamily: 'Douglas-Burlington-Regular' }}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 