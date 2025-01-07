import React from 'react';

function YearDigit({ digit }) {
  return (
    <div 
      className="w-12 h-16 bg-white border-2 border-gray-300 rounded flex items-center justify-center text-4xl font-mono text-blue-900 shadow-lg mx-1"
      style={{ fontFamily: 'Douglas-Burlington-Regular' }}
    >
      {digit}
    </div>
  );
}

export function FeedbackOverlay({ 
  result, 
  yearDifference, 
  points, 
  image, 
  funFact,
  onNext,
  isGameOver,
  isFoulBall,
  strikes,
  currentYear
}) {
  if (isFoulBall) {
    return (
      <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
        <div className="max-w-2xl w-full mx-auto p-4">
          <div className="bg-gray-800/90 rounded-lg p-6 py-12 border border-gray-700">
            <div className="space-y-6 text-center">
              <h2 
                className="text-4xl mb-4" 
                style={{ 
                  fontFamily: 'Douglas-Burlington-Regular',
                  color: '#fbbf24'
                }}
              >
                FOUL BALL!
              </h2>
              
              <div 
                className="text-[#f5f2e6] text-2xl mb-2"
                style={{ fontFamily: 'Douglas-Burlington-Regular' }}
              >
                Strike {strikes}
              </div>

              <div className="text-[#f5f2e6] text-xl">
                {yearDifference <= 5 
                  ? "You're within 5 years!" 
                  : "You're within 10 years!"}
              </div>

              <button
                onClick={onNext}
                className="bg-[#1e4fba] hover:bg-[#2460e6] text-white py-3 px-10 rounded-lg text-2xl transition-all duration-300 ease-in-out shadow-md hover:shadow-lg active:bg-[#1a3f8c] mt-4"
                style={{ fontFamily: 'Douglas-Burlington-Regular' }}
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const yearDigits = currentYear.toString().padStart(4, '0').split('');

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
      <div className="max-w-4xl w-full mx-auto p-4">
        <div className="bg-gray-800/90 rounded-lg p-6 px-8 border border-gray-700">
          <div className="space-y-6">
            {/* Header with Result, Year, and Points */}
            <div className="grid grid-cols-3 items-start mb-8">
              {/* Left side - Result */}
              <div>
                <h2 
                  className="text-5xl mb-2" 
                  style={{ 
                    fontFamily: 'Douglas-Burlington-Regular',
                    color: result.includes('HOME RUN') ? '#4ade80' : 
                           result.includes('TRIPLE') ? '#fbbf24' : 
                           result.includes('DOUBLE') ? '#60a5fa' : 
                           result.includes('SINGLE') ? '#a78bfa' : 
                           '#ef4444'
                  }}
                >
                  {result}
                </h2>
                {yearDifference !== null && (
                  <p className="text-[#f5f2e6] text-2xl">
                    {yearDifference === 0 
                      ? "Perfect guess!" 
                      : `${yearDifference} ${yearDifference === 1 ? 'year' : 'years'} off`}
                  </p>
                )}
              </div>

              {/* Middle - Year */}
              <div className="flex justify-center items-center">
                <div className="flex">
                  {yearDigits.map((digit, index) => (
                    <YearDigit key={index} digit={digit} />
                  ))}
                </div>
              </div>

              {/* Right side - Points */}
              {points > 0 && (
                <div className="text-right">
                  <div 
                    className="text-6xl text-green-400"
                    style={{ fontFamily: 'Douglas-Burlington-Regular' }}
                  >
                    +{points}
                  </div>
                  <div className="text-green-300 text-xl">
                    points
                  </div>
                </div>
              )}
            </div>

            {/* Image */}
            <div className="relative bg-[#f5f2e6] p-4">
              <img
                src={image}
                alt="Baseball moment"
                className="w-full h-[400px] object-cover"
                style={{
                  maxWidth: '100%'
                }}
              />
            </div>

            {/* Fun Fact */}
            <div className="text-gray-300 text-left max-w-3xl mx-auto px-1"
                 style={{
                   lineHeight: '1.7',
                   fontSize: '1.05rem'
                 }}>
              {funFact}
            </div>

            {/* Next Button */}
            <div className="text-center mt-8">
              <button
                onClick={onNext}
                className="bg-[#1e4fba] hover:bg-[#2460e6] text-white py-4 px-12 rounded-lg text-2xl transition-all duration-300 ease-in-out shadow-md hover:shadow-lg active:bg-[#1a3f8c]"
                style={{ fontFamily: 'Douglas-Burlington-Regular' }}
              >
                {isGameOver ? 'View Final Results' : 'Next Image'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 