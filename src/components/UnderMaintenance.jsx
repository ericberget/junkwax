import React from 'react';

export function UnderMaintenance() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Logo */}
        <img 
          src="/LOGO.png" 
          alt="Baseball Time Machine Logo" 
          className="w-64 mx-auto mb-8"
        />
        
        {/* Main Heading */}
        <h1 
          className="text-4xl md:text-5xl text-[#f5f2e6] mb-4"
          style={{ fontFamily: 'Douglas-Burlington-Regular' }}
        >
          Under Maintenance
        </h1>
        
        {/* Message */}
        <div className="space-y-4 text-[#f5f2e6]/80">
          <p className="text-xl">
            We're currently updating Baseball Time Machine to bring you an even better experience.
          </p>
          <p>
            Please check back in a few minutes. We'll be back soon with today's baseball moment!
          </p>
        </div>

        {/* Baseball Animation */}
        <div className="mt-12">
          <svg 
            className="w-16 h-16 mx-auto animate-spin"
            style={{ animationDuration: '3s' }}
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <circle 
              cx="12" 
              cy="12" 
              r="10" 
              className="text-[#1e4fba]"
            />
            <path 
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10" 
              className="text-[#f5f2e6]"
            />
          </svg>
        </div>
      </div>
    </div>
  );
} 