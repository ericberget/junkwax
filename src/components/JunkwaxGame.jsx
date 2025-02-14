import React, { useState, useEffect } from 'react';
import { CARD_COMPANIES, getRandomPuzzle } from './JunkwaxPuzzles';

function CareerStatsModal({ onClose, currentPuzzle, score }) {
  const [careerStats, setCareerStats] = useState({
    totalPoints: 0,
    gamesPlayed: 0,
    collection: []
  });

  useEffect(() => {
    // Load career stats from localStorage
    const savedStats = localStorage.getItem('junkwax-career-stats');
    if (savedStats) {
      const stats = JSON.parse(savedStats);
      setCareerStats(stats);
    }
  }, []);

  useEffect(() => {
    // Update career stats when game ends
    const savedStats = localStorage.getItem('junkwax-career-stats');
    const stats = savedStats ? JSON.parse(savedStats) : {
      totalPoints: 0,
      gamesPlayed: 0,
      collection: []
    };

    // Update stats
    const newStats = {
      totalPoints: stats.totalPoints + score,
      gamesPlayed: stats.gamesPlayed + 1,
      collection: [...stats.collection]
    };

    // Add current puzzle to collection if not already present
    if (score === 300 && !stats.collection.some(card => card.id === currentPuzzle.id)) {
      newStats.collection.push(currentPuzzle);
    }

    // Save updated stats
    localStorage.setItem('junkwax-career-stats', JSON.stringify(newStats));
    setCareerStats(newStats);
  }, [score, currentPuzzle]);

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center overflow-y-auto animate-fadeIn">
      <div className="max-w-6xl w-full mx-auto p-4">
        <div className="bg-gray-800/90 rounded-lg p-8 border border-gray-700 animate-scaleIn">
          <div className="flex justify-between items-center mb-8">
            <h2 
              className="text-4xl text-[#f5f2e6] animate-slideUp-1"
              style={{ fontFamily: 'Douglas-Burlington-Regular' }}
            >
              Career Stats
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-2xl"
            >
              ×
            </button>
          </div>

          {/* Stats Overview */}
          <div className="text-center mb-12">
            <h3 
              className="text-2xl text-[#f5f2e6] mb-4 animate-slideUp-2"
              style={{ fontFamily: 'Douglas-Burlington-Regular' }}
            >
              Total Career Points
            </h3>
            <div 
              className="text-8xl text-green-400 mb-8 animate-popIn"
              style={{ fontFamily: 'Douglas-Burlington-Regular' }}
            >
              {careerStats.totalPoints}
            </div>
            <div className="grid grid-cols-2 gap-8 max-w-md mx-auto animate-slideUp-3">
              <div>
                <div className="text-4xl text-[#f5f2e6]">{careerStats.gamesPlayed}</div>
                <div className="text-gray-400">Games Played</div>
              </div>
              <div>
                <div className="text-4xl text-[#f5f2e6]">{careerStats.collection.length}</div>
                <div className="text-gray-400">Cards Collected</div>
              </div>
            </div>
          </div>

          {/* Card Case */}
          <div className="animate-slideUp-4">
            <h3 
              className="text-2xl text-[#f5f2e6] mb-6"
              style={{ fontFamily: 'Douglas-Burlington-Regular' }}
            >
              Card Case ({careerStats.collection.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {careerStats.collection.map((card, index) => (
                <div 
                  key={card.id}
                  className="bg-gray-900/50 rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <img
                    src={card.fullImage}
                    alt={card.player}
                    className="w-full h-auto"
                  />
                  <div className="p-4">
                    <div className="text-[#f5f2e6] text-lg">{card.year}</div>
                    <div className="text-gray-400">{card.player}</div>
                  </div>
                </div>
              ))}
            </div>
            {careerStats.collection.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                Get a perfect score to add cards to your collection!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function JunkwaxGame() {
  const [currentPuzzle, setCurrentPuzzle] = useState(getRandomPuzzle());
  const [hasGuessed, setHasGuessed] = useState(false);
  const [playerGuess, setPlayerGuess] = useState('');
  const [yearGuess, setYearGuess] = useState(1990);
  const [companyGuess, setCompanyGuess] = useState('');
  const [score, setScore] = useState(0);
  const [showZoom, setShowZoom] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showCareerStats, setShowCareerStats] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    let points = 0;
    
    if (playerGuess.toLowerCase() === currentPuzzle.player.toLowerCase()) points += 100;
    if (yearGuess === currentPuzzle.year) points += 100;
    if (companyGuess === currentPuzzle.company) points += 100;
    
    setScore(points);
    setHasGuessed(true);
  };

  const handleNext = () => {
    setGameOver(true);
  };

  const handlePlayAgain = () => {
    window.location.reload();
  };

  const handleShare = () => {
    const shareText = `🎴 Junkwax Millionaire\n\n${score} points\n\nPlay now at baseballtimemachine.com`;
    
    navigator.clipboard.writeText(shareText)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy:', err);
      });
  };

  if (gameOver) {
    return (
      <div 
        className="min-h-screen w-full animate-fadeIn" 
        style={{ 
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.8) 100%), url('/bg.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#1a1a1a'
        }}
      >
        <div className="max-w-4xl mx-auto p-4">
          <div className="text-center mb-16 pt-8 animate-slideDown">
            <img  
              src="/LOGO.png"
              className="w-full max-w-[650px] mx-auto"
              alt="Baseball Time Machine" 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-lg">
              <h2 
                className="text-4xl text-[#f5f2e6] mb-6 text-center animate-slideUp-1"
                style={{ fontFamily: 'Douglas-Burlington-Regular' }}
              >
                GAME OVER!
              </h2>
              <div 
                className="text-8xl text-green-400 mb-2 text-center animate-popIn"
                style={{ fontFamily: 'Douglas-Burlington-Regular' }}
              >
                {score}
              </div>
              <div 
                className="text-2xl text-green-300 mb-8 text-center animate-slideUp-2"
                style={{ fontFamily: 'Douglas-Burlington-Regular' }}
              >
                POINTS
              </div>
              <div 
                className="text-xl text-[#f5f2e6] mb-8 text-center animate-slideUp-3"
                style={{ fontFamily: 'Douglas-Burlington-Regular' }}
              >
                Thanks for playing Junkwax Millionaire!
              </div>
              <div className="flex flex-col gap-4 animate-slideUp-4">
                <button
                  onClick={() => setShowCareerStats(true)}
                  className="w-full bg-[#f5f2e6] hover:bg-[#e5e2d6] text-[#1e4fba] py-4 rounded-lg text-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                  style={{ fontFamily: 'Douglas-Burlington-Regular' }}
                >
                  MY CAREER STATS
                </button>
                <button
                  onClick={handlePlayAgain}
                  className="w-full bg-[#1e4fba] hover:bg-[#2460e6] text-white py-4 rounded-lg text-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                  style={{ fontFamily: 'Douglas-Burlington-Regular' }}
                >
                  PLAY AGAIN
                </button>
                <button
                  onClick={handleShare}
                  className="w-full bg-[#1e4fba] hover:bg-[#2460e6] text-white py-4 rounded-lg text-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                  style={{ fontFamily: 'Douglas-Burlington-Regular' }}
                >
                  {copied ? 'COPIED!' : 'SHARE RESULTS'}
                </button>
              </div>
            </div>

            <div className="p-6 rounded-lg animate-slideInRight">
              <h2 
                className="text-2xl text-[#f5f2e6] mb-4"
                style={{ fontFamily: 'Douglas-Burlington-Regular' }}
              >
                TODAY'S CARD
              </h2>
              <div className="relative">
                <img
                  src={currentPuzzle.fullImage}
                  alt="Baseball Card"
                  className="w-full h-auto rounded-lg shadow-lg"
                  style={{ maxWidth: '100%', margin: '0 auto' }}
                />
              </div>
            </div>
          </div>
        </div>

        {showCareerStats && (
          <CareerStatsModal
            onClose={() => setShowCareerStats(false)}
            currentPuzzle={currentPuzzle}
            score={score}
          />
        )}
      </div>
    );
  }

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
      <div className="max-w-6xl mx-auto p-4">
        <div className="text-center mb-12">
          <h1 
            className="text-6xl text-[#d4b483] mb-4"
            style={{ fontFamily: 'Douglas-Burlington-Regular' }}
          >
            JUNKWAX MILLIONAIRE
          </h1>
        </div>

        <div className="rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left side - Image */}
            <div className="relative flex items-center justify-center">
              <div className="w-full max-w-[500px] relative">
                <img
                  src={hasGuessed ? currentPuzzle.fullImage : currentPuzzle.zoomImage}
                  alt="Baseball Card Detail"
                  className={`w-full h-auto rounded-lg ${hasGuessed ? 'animate-revealCard' : ''}`}
                />
                {!hasGuessed && (
                  <button
                    onClick={() => setShowZoom(true)}
                    className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors duration-200"
                    title="Zoom Image"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="white" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <circle cx="11" cy="11" r="8"/>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                      <line x1="11" y1="8" x2="11" y2="14"/>
                      <line x1="8" y1="11" x2="14" y2="11"/>
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Right side - Form/Results */}
            <div>
              {!hasGuessed ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Player Name Input */}
                  <div>
                    <label className="block text-[#f5f2e6] mb-2">Who is this player?</label>
                    <input
                      type="text"
                      value={playerGuess}
                      onChange={(e) => setPlayerGuess(e.target.value)}
                      className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-[#d4b483] focus:outline-none"
                      placeholder="Enter player name..."
                    />
                  </div>

                  {/* Year Slider */}
                  <div>
                    <label className="block text-[#f5f2e6] mb-2">Year: {yearGuess}</label>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="1980"
                        max="2000"
                        value={yearGuess}
                        onChange={(e) => setYearGuess(Number(e.target.value))}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#d4b483]"
                      />
                      <div className="flex justify-between text-gray-400 text-sm">
                        <span>1980</span>
                        <span>2000</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Company Select */}
                  <div>
                    <label className="block text-[#f5f2e6] mb-2">Card Company</label>
                    <select
                      value={companyGuess}
                      onChange={(e) => setCompanyGuess(e.target.value)}
                      className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-[#d4b483] focus:outline-none"
                    >
                      <option value="">Select company...</option>
                      {CARD_COMPANIES.map(company => (
                        <option key={company} value={company}>{company}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#d4b483] hover:bg-[#c4a473] text-gray-900 py-3 rounded-lg text-xl transition-all duration-300 ease-in-out"
                    style={{ fontFamily: 'Douglas-Burlington-Regular' }}
                  >
                    Final Answer
                  </button>
                </form>
              ) : (
                <div className="space-y-6 animate-fadeIn">
                  <div className="text-center">
                    <div className="text-6xl text-green-400 mb-6 animate-popIn" style={{ fontFamily: 'Douglas-Burlington-Regular' }}>
                      {score} points
                    </div>
                  </div>

                  <div className="space-y-4 text-lg">
                    <p className="text-[#f5f2e6] flex items-center justify-between animate-slideUp-1">
                      <span className="flex items-baseline gap-3">
                        <span className="text-gray-400 text-base">Player:</span>
                        <span className="text-2xl" style={{ fontFamily: 'Douglas-Burlington-Regular' }}>{playerGuess}</span>
                      </span>
                      <span className="text-2xl animate-checkmarkPop">{playerGuess.toLowerCase() === currentPuzzle.player.toLowerCase() ? '✅' : '❌'}</span>
                    </p>
                    <p className="text-[#f5f2e6] flex items-center justify-between animate-slideUp-2">
                      <span className="flex items-baseline gap-3">
                        <span className="text-gray-400 text-base">Year:</span>
                        <span className="text-2xl" style={{ fontFamily: 'Douglas-Burlington-Regular' }}>{yearGuess}</span>
                      </span>
                      <span className="text-2xl animate-checkmarkPop">{yearGuess === currentPuzzle.year ? '✅' : '❌'}</span>
                    </p>
                    <p className="text-[#f5f2e6] flex items-center justify-between animate-slideUp-3">
                      <span className="flex items-baseline gap-3">
                        <span className="text-gray-400 text-base">Company:</span>
                        <span className="text-2xl" style={{ fontFamily: 'Douglas-Burlington-Regular' }}>{companyGuess}</span>
                      </span>
                      <span className="text-2xl animate-checkmarkPop">{companyGuess === currentPuzzle.company ? '✅' : '❌'}</span>
                    </p>
                  </div>

                  <div className="bg-gray-900/50 p-4 rounded-lg mt-6 animate-slideUp-4">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {currentPuzzle.description}
                    </p>
                  </div>

                  <div className="flex gap-4 animate-slideUp-4">
                    <button
                      onClick={handlePlayAgain}
                      className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg text-xl transition-all duration-300 ease-in-out hover:scale-105"
                      style={{ fontFamily: 'Douglas-Burlington-Regular' }}
                    >
                      Play Again
                    </button>
                    <button
                      onClick={handleNext}
                      className="flex-1 bg-[#1e4fba] hover:bg-[#2460e6] text-white py-3 rounded-lg text-xl transition-all duration-300 ease-in-out hover:scale-105"
                      style={{ fontFamily: 'Douglas-Burlington-Regular' }}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Zoom Modal */}
      {!hasGuessed && showZoom && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setShowZoom(false)}
        >
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setShowZoom(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 text-xl"
            >
              Close
            </button>
            <img
              src={currentPuzzle.zoomImage}
              alt="Baseball Card Detail"
              className="w-full h-auto"
              style={{ maxHeight: '80vh', objectFit: 'contain' }}
            />
          </div>
        </div>
      )}
    </div>
  );
} 