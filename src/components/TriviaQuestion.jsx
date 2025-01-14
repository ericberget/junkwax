import React, { useState } from 'react';

export function TriviaQuestion({ question, options, correctAnswer, onAnswer, questionNumber }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  const handleAnswer = (answer) => {
    if (hasAnswered) return;
    
    setSelectedAnswer(answer);
    setHasAnswered(true);
  };

  const handleNext = () => {
    onAnswer(selectedAnswer === correctAnswer);
    // Reset state for next question
    setSelectedAnswer(null);
    setHasAnswered(false);
  };

  const getButtonClass = (option) => {
    if (!hasAnswered) {
      return 'bg-gray-800 hover:bg-gray-700';
    }
    if (option === correctAnswer) {
      return 'bg-green-600';
    }
    if (option === selectedAnswer) {
      return 'bg-red-600';
    }
    return 'bg-gray-800 opacity-50';
  };

  const pointsMessage = selectedAnswer === correctAnswer ? (
    <div style={{ 
      color: '#ffffff', 
      fontFamily: 'Douglas-Burlington-Regular', 
      fontSize: '24px',
      fontWeight: 'bold',
      marginTop: '10px',
      textAlign: 'center'
    }}>
      Correct! +100 points
    </div>
  ) : (
    <div style={{ color: '#f44336', marginTop: '10px' }}>
      Incorrect. The correct answer was {correctAnswer}
    </div>
  );

  return (
    <div className="space-y-6">
      <h3 
        className="text-2xl text-[#f5f2e6] mb-6"
        style={{ fontFamily: 'Douglas-Burlington-Regular' }}
      >
        {question}
      </h3>

      <div className="grid grid-cols-1 gap-4">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            disabled={hasAnswered}
            className={`
              ${getButtonClass(option)}
              p-4 rounded-lg text-left text-[#f5f2e6] transition-all duration-300
              ${hasAnswered ? '' : 'hover:transform hover:scale-[1.02]'}
            `}
          >
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full border-2 border-[#f5f2e6]/30 flex items-center justify-center text-sm">
                {String.fromCharCode(65 + index)}
              </div>
              <span className="text-lg">{option}</span>
            </div>
          </button>
        ))}
      </div>

      {hasAnswered && (
        <div className="space-y-4">
          <div className={`p-4 rounded-lg ${selectedAnswer === correctAnswer ? 'bg-green-600/20' : 'bg-red-600/20'}`}>
            {pointsMessage}
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleNext}
              className="bg-[#1e4fba] hover:bg-[#2460e6] text-white py-2 px-6 rounded-lg text-lg transition-all duration-300 ease-in-out shadow-md hover:shadow-lg active:bg-[#1a3f8c]"
              style={{ fontFamily: 'Douglas-Burlington-Regular' }}
            >
              {questionNumber === 2 ? 'Continue' : 'Next Question'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 