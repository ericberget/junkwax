import React, { useState } from 'react';

export function TriviaQuestion({ question, options, correctAnswer, onAnswer, questionNumber }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  const handleAnswer = (answer) => {
    if (hasAnswered) return;
    
    setSelectedAnswer(answer);
    setHasAnswered(true);
    
    if (answer === correctAnswer) {
      const correctSound = new Audio('/sounds/correctding.wav');
      correctSound.volume = 0.2;
      correctSound.play();
    } else {
      const wrongSound = new Audio('/sounds/wrong.wav');
      wrongSound.volume = 0.2;
      wrongSound.play();
    }
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
      fontSize: '34px',
      fontWeight: 'bold',
      margin: '10px',
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
    <div className="space-y-4">
      <div style={{ fontSize: '30px', fontFamily: 'Douglas-Burlington-Regular' }} className="text-[#f5f2e6] text-xl md:text-2xl mb-6">
        {question}
      </div>
      
      <div className="space-y-2">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            className="w-full text-left p-4 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 transition-colors duration-200"
          >
            <span className="inline-block w-8 opacity-50">
              {String.fromCharCode(65 + index)}
            </span>
            {option}
          </button>
        ))}
      </div>

      {hasAnswered && (
        <div className="space-y-4">
          <div className={`p-4 rounded-lg ${selectedAnswer === correctAnswer ? 'bg-green-600/30' : 'bg-red-600/20'}`}>
            {pointsMessage}
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleNext}
              className="bg-[#1e4fba] hover:bg-[#2460e6] text-white py-2 px-6 rounded-lg text-lg transition-all duration-300 ease-in-out shadow-md hover:shadow-lg active:bg-[#1a3f8c]"
              style={{ fontSize: '24px', fontFamily: 'Douglas-Burlington-Regular' }}
            >
              {questionNumber === 2 ? 'Continue' : 'Next Question'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 