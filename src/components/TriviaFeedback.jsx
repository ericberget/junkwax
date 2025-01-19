import React, { useState } from 'react';
import { TriviaQuestion } from './TriviaQuestion';

export function TriviaFeedback({ 
  result, 
  yearDifference, 
  points, 
  image, 
  funFact,
  trivia = [],
  onComplete,
  currentYear,
  isGameOver
}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [triviaPoints, setTriviaPoints] = useState(0);
  const [showingQuestions, setShowingQuestions] = useState(trivia && trivia.length > 0);
  
  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setTriviaPoints(prev => prev + 100);
    }
    
    if (currentQuestionIndex < trivia.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowingQuestions(false);
    }
  };

  const yearDigits = currentYear.toString().padStart(4, '0').split('');

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
      <div className="max-w-4xl w-full mx-auto p-4 max-h-screen overflow-y-auto">
        <div className="bg-gray-800/90 rounded-lg p-6 px-8 border border-gray-700">
          <div className="space-y-6">
            {/* Header with Result, Year, and Points */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-8 animate-fadeIn">
              {/* Left side - Result */}
              <div className="text-center md:text-left pt-6">
                <h2 
                  className="text-4xl md:text-5xl mb-2" 
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
                  <p className="text-[#f5f2e6] text-xl md:text-2xl">
                    {yearDifference === 0 
                      ? "Perfect guess!" 
                      : `${yearDifference} ${yearDifference === 1 ? 'year' : 'years'} off`}
                  </p>
                )}
              </div>

              {/* Middle - Year */}
              <div className="flex justify-center items-center">
                <div className="flex flex-col items-center">
                  <div 
                    className="text-[#f5f2e6] mb-2 text-sm md:text-base"
                    style={{ fontFamily: 'Douglas-Burlington-Regular' }}
                  >
                    CORRECT YEAR
                  </div>
                  <div className="flex gap-1">
                    {yearDigits.map((digit, index) => (
                      <div 
                        key={index}
                        className="w-12 h-16 bg-[#1e4fba] rounded-lg flex items-center justify-center text-2xl text-[#f5f2e6]"
                        style={{ fontFamily: 'Douglas-Burlington-Regular' }}
                      >
                        {digit}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right side - Points */}
              <div className="text-center md:text-right">
                <div className="flex flex-col md:block">
                  {points > 0 && (
                    <div>
                      <div 
                        className="text-5xl md:text-6xl text-green-400"
                        style={{ fontFamily: 'Douglas-Burlington-Regular' }}
                      >
                        +{points}
                      </div>
                      <div className="text-green-300 text-lg md:text-xl mb-4 md:mb-0">
                        points
                      </div>
                    </div>
                  )}
                </div>
              </div>
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

            {/* Trivia Section */}
            {showingQuestions && trivia && trivia.length > 0 && (
              <div className="bg-gray-900/50 p-6 rounded-lg animate-fadeIn">
                <div className="flex justify-between items-start mb-6">
                  <div className="inline-block bg-[#1e4fba] px-6 py-2 rounded-lg text-center text-[#f5f2e6] text-xl md:text-2xl"
                    style={{ 
                      fontFamily: 'Douglas-Burlington-Regular',
                      letterSpacing: '3px'
                    }}
                  >
                    TRIVIA ROUND
                  </div>
                  <div className="text-green-400" style={{ fontFamily: 'Douglas-Burlington-Regular' }}>
                    <span className="text-4xl">+{triviaPoints}</span>
                    <span className="text-2xl"> POINTS</span>
                  </div>
                </div>

                <TriviaQuestion
                  {...trivia[currentQuestionIndex]}
                  onAnswer={handleAnswer}
                  questionNumber={currentQuestionIndex + 1}
                />
              </div>
            )}
            
            {(!showingQuestions || !trivia || trivia.length === 0) && (
              <div className="animate-fadeIn">
                {/* Fun Fact */}
                <div className="text-gray-300 text-left max-w-3xl mx-auto px-1">
                  {funFact?.text?.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">{paragraph}</p>
                  ))}
                  {(funFact?.source || funFact?.sourcelink) && (
                    <div className="border-t border-gray-700 pt-3 mt-4">
                      {funFact?.source && (
                        <div className="text-gray-400 text-sm mb-1 hover:text-gray-300 transition-colors duration-200">
                          Source: {funFact.source}
                        </div>
                      )}
                      {funFact?.sourcelink && (
                        <div className="text-gray-400 text-sm hover:text-gray-300 transition-colors duration-200">
                          {funFact.sourcelink}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Next Button */}
                <div className="text-center mt-8 mb-8 sm:mb-16">
                  <button
                    onClick={() => onComplete(triviaPoints)}
                    className="bg-[#1e4fba] hover:bg-[#2460e6] text-white py-3 px-10 rounded-lg text-2xl transition-all duration-300 ease-in-out shadow-md hover:shadow-lg active:bg-[#1a3f8c]"
                    style={{ fontFamily: 'Douglas-Burlington-Regular' }}
                  >
                    {isGameOver ? "View Results" : "Next"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 