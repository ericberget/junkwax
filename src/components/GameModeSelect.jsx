import React from 'react';
import { FaBaseballBall, FaQuestionCircle } from 'react-icons/fa';

export function GameModeSelect({ onSelectMode }) {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
    >
      <div className="max-w-4xl w-full mx-auto p-4">
        <div className="text-center mb-16">
          <img  
            src="/LOGO.png"
            className="w-full max-w-[650px] mx-auto"
            alt="Baseball Time Machine" 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Baseball Time Machine Mode */}
          <button 
            onClick={() => onSelectMode('timemachine')}
            className="bg-gray-800/90 p-8 rounded-lg border border-gray-700 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:bg-gray-800/95 hover:shadow-lg hover:shadow-[#60a5fa]/10 hover:border-[#60a5fa] text-left w-full"
          >
            <div className="flex items-center gap-4 mb-4">
              <FaBaseballBall className="text-4xl text-[#60a5fa]" />
              <h2 
                className="text-3xl text-[#60a5fa]"
                style={{ fontFamily: 'Douglas-Burlington-Regular' }}
              >
                Time Machine
              </h2>
            </div>
            <p className="text-gray-300">
              Test your baseball history knowledge with daily images. Get points for perfect guesses and close calls!
            </p>
          </button>

          {/* Junkwax Mode */}
          <button 
            onClick={() => onSelectMode('junkwax')}
            className="bg-gray-800/90 p-8 rounded-lg border border-gray-700 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:bg-gray-800/95 hover:shadow-lg hover:shadow-[#d4b483]/10 hover:border-[#d4b483] text-left w-full"
          >
            <div className="flex items-center gap-4 mb-4">
              <FaQuestionCircle className="text-4xl text-[#d4b483]" />
              <h2 
                className="text-3xl text-[#d4b483]"
                style={{ fontFamily: 'Douglas-Burlington-Regular' }}
              >
                Junkwax Millionaire
              </h2>
            </div>
            <p className="text-gray-300">
              Test your knowledge of baseball cards from the Junk Wax Era to win virtual millions!
            </p>
          </button>
        </div>
      </div>
    </div>
  );
} 