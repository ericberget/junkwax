import React from 'react';
import { FaBaseballBall, FaQuestionCircle } from 'react-icons/fa';

export function GameModeSelect({ onSelectMode }) {
  return (
    <div 
      className="min-h-screen w-full" 
      style={{ 
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.8) 100%), url('/bg.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#1a1a1a'
      }}
    >
      <div className="max-w-6xl w-full mx-auto p-4">
        <div className="text-center mb-16 pt-8">
          <img  
            src="/LOGO.png"
            className="w-full max-w-[650px] mx-auto"
            alt="The Daily Baseball Photo Trivia Game" 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Triple Play Mode Card */}
          <div 
            onClick={() => onSelectMode('classic')}
            className="bg-gray-800/90 p-8 rounded-lg border border-gray-700 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:bg-gray-800/95 hover:shadow-lg hover:shadow-[#60a5fa]/10 hover:border-[#60a5fa]"
          >
            <div className="flex items-center gap-4 mb-4">
              <FaBaseballBall className="text-4xl text-[#60a5fa]" />
              <h2 
                className="text-3xl text-[#60a5fa]"
                style={{ fontFamily: 'Douglas-Burlington-Regular' }}
              >
                Triple Play Mode
              </h2>
            </div>
            <p className="text-gray-300 mb-6">
              Test your baseball history knowledge with three daily images. Get points for perfect guesses and close calls!
            </p>
            {/* Three rectangles in a row */}
            <div className="flex gap-2">
              <div className="w-12 h-10 bg-gray-900/80 rounded-lg"></div>
              <div className="w-12 h-10 bg-gray-900/80 rounded-lg"></div>
              <div className="w-12 h-10 bg-gray-900/80 rounded-lg"></div>
            </div>
          </div>

          {/* Pic and Quiz Mode Card */}
          <div 
            onClick={() => onSelectMode('trivia')}
            className="bg-gray-800/90 p-8 rounded-lg border border-gray-700 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:bg-gray-800/95 hover:shadow-lg hover:shadow-[#d4b483]/10 hover:border-[#d4b483]"
          >
            <div className="flex items-center gap-4 mb-4">
              <FaQuestionCircle className="text-4xl text-[#d4b483]" />
              <h2 
                className="text-3xl text-[#d4b483]"
                style={{ fontFamily: 'Douglas-Burlington-Regular' }}
              >
                Daily Mode
              </h2>
            </div>
            <p className="text-gray-300 mb-6">
              One image plus trivia questions for bonus points
            </p>
            {/* One rectangle and multiple choice indicators */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-10 bg-gray-900/80 rounded-lg"></div>
              <div className="space-y-1.5">
                <div className="w-8 h-2 bg-gray-900/80 rounded-full"></div>
                <div className="w-8 h-2 bg-gray-900/80 rounded-full"></div>
                <div className="w-8 h-2 bg-gray-900/80 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Centered refresh text and feedback button */}
        <div className="text-center mt-8 space-y-4">
          <div className="text-sm text-gray-400">
            New content refreshes daily
          </div>
          <button
            onClick={() => onSelectMode('feedback')}
            className="text-gray-400 hover:text-gray-300 text-sm bg-gray-800/50 hover:bg-gray-800/70 px-4 py-2 rounded-lg transition-all duration-200"
          >
            Share Feedback (Beta)
          </button>
        </div>
      </div>

      {/* Reset Button in bottom corner */}
      <div className="fixed bottom-2 right-2">
        <button
          onClick={() => onSelectMode('reset')}
          className="bg-gray-600/30 hover:bg-gray-600/50 text-white/50 hover:text-white/80 px-3 py-1 rounded text-xs transition-all duration-200"
        >
          Reset for Testing
        </button>
      </div>
    </div>
  );
} 