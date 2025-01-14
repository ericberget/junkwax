import React from 'react';

export function GameModeSelect({ onSelectMode }) {
  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
      <div className="max-w-6xl w-full mx-auto p-4">
        {/* Logo */}
        <div className="text-center mb-12">
          <img  
            src="/LOGO.png"
            className="w-full max-w-[650px] mx-auto"
            alt="Baseball Time Machine" 
          />
        </div>

        {/* Mode Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Classic Mode */}
          <button 
            onClick={() => onSelectMode('classic')}
            className="bg-gray-800/90 rounded-lg p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300 text-left group"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-500/20 p-2 rounded-lg">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="text-blue-400"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                    <circle cx="9" cy="9" r="2"/>
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
                  </svg>
                </div>
                <h3 
                  className="text-2xl text-[#f5f2e6] group-hover:text-blue-400 transition-colors duration-300"
                  style={{ fontFamily: 'Douglas-Burlington-Regular' }}
                >
                  Classic Mode
                </h3>
              </div>
              
              <p className="text-gray-400 text-lg">
                The original daily challenge. Guess the year of three historic baseball photos.
              </p>

              {/* Visual Preview */}
              <div className="flex justify-center gap-2 mt-4">
                <div className="w-20 h-16 bg-gray-700/50 rounded"></div>
                <div className="w-20 h-16 bg-gray-700/50 rounded"></div>
                <div className="w-20 h-16 bg-gray-700/50 rounded"></div>
              </div>

              <div className="text-sm text-gray-500 mt-4">
                Three chances to make history
              </div>
            </div>
          </button>

          {/* Trivia Mode */}
          <button 
            onClick={() => onSelectMode('trivia')}
            className="bg-gray-800/90 rounded-lg p-6 border border-gray-700 hover:border-green-500 transition-all duration-300 text-left group"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-green-500/20 p-2 rounded-lg">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="text-green-400"
                  >
                    <path d="M9.31 9.31 5 21l7-4"/>
                    <path d="m14 10 3-3 3 3-3 3-3-3"/>
                    <path d="M9.31 9.31 5 21l7-4"/>
                    <path d="m14 10 3-3 3 3-3 3-3-3"/>
                  </svg>
                </div>
                <h3 
                  className="text-2xl text-[#f5f2e6] group-hover:text-green-400 transition-colors duration-300"
                  style={{ fontFamily: 'Douglas-Burlington-Regular' }}
                >
                  Trivia Mode
                </h3>
              </div>
              
              <p className="text-gray-400 text-lg">
                Test your baseball knowledge. Guess the year and answer trivia questions for bonus points.
              </p>

              {/* Visual Preview */}
              <div className="flex justify-center gap-4 mt-4">
                <div className="w-32 h-24 bg-gray-700/50 rounded"></div>
                <div className="space-y-2">
                  <div className="w-24 h-4 bg-gray-700/50 rounded"></div>
                  <div className="w-24 h-4 bg-gray-700/50 rounded"></div>
                </div>
              </div>

              <div className="text-sm text-gray-500 mt-4">
                One photo + trivia questions
              </div>
            </div>
          </button>
        </div>

        {/* Daily Challenge Note */}
        <div className="text-center mt-8 text-gray-500">
          Both modes refresh daily with new content
        </div>
      </div>
    </div>
  );
} 