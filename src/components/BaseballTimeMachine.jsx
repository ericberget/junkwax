import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "./ui/card";
import { Trophy, Medal, Star, Timer as TimerIcon, Award, Check, X } from 'lucide-react';
import { Timer } from './Timer';
import { Books } from './Books';
import { HowToPlay } from './HowToPlay';
import { FeedbackOverlay } from './FeedbackOverlay';
import { ImageZoom } from './ImageZoom';
import { FeedbackForm } from './FeedbackForm';
import { TriviaFeedback } from './TriviaFeedback';

// Sound effects
const SOUND_EFFECTS = {
  hit: new Audio('/sounds/hit.mp3'),
  homeRun: new Audio('/sounds/homerun.mp3'),
  out: new Audio('/sounds/out.mp3'),
  sliderTick: new Audio('/sounds/tick.mp3')
};

// Baseball moments data
const BASEBALL_MOMENTS = [
  {
    id: 1,
    year: 1935,
    image: '/bismarck.jpg',
    hint: "Satchel Barnstorms in Bismarck North Dakota",
    description: "Satchel Barnstorms in Bismarck North Dakota",
    funFact: "This team photograph from 1935 offers a fascinating glimpse into an important moment in baseball history...",
    copyright: "Negro Leagues Baseball Museum",
    source: "Negro Leagues Baseball Museum",
    sourceLink: "https://www.nlbm.com/"
  },
  // ... rest of the moments data ...
];

// Helper functions
function xorshift(seed) {
  let state = seed;
  state ^= state << 13;
  state ^= state >> 17;
  state ^= state << 5;
  return state;
}

function getDailyMoment(index = 0) {
  const today = new Date();
  let seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  
  // Use xorshift to generate a pseudo-random sequence
  for (let i = 0; i <= index; i++) {
    seed = xorshift(seed);
  }
  
  // Use the seed to select a moment
  const positiveNumber = Math.abs(seed);
  return BASEBALL_MOMENTS[positiveNumber % BASEBALL_MOMENTS.length];
}

function getTodayKey() {
  const today = new Date();
  return `baseball-${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
}

function loadDailyState() {
  const saved = localStorage.getItem(getTodayKey());
  return saved ? JSON.parse(saved) : null;
}

function saveDailyState(state) {
  localStorage.setItem(getTodayKey(), JSON.stringify(state));
}

function YearDigit({ digit, index, onIncrement }) {
  return (
    <div 
      className="w-10 h-14 bg-white border-2 border-gray-300 rounded flex items-center justify-center text-3xl font-mono text-blue-900 shadow-lg mx-1 cursor-pointer hover:bg-gray-100"
      onClick={() => onIncrement(index)}
    >
      {digit}
    </div>
  );
}

function getAllDailyMoments() {
  return [
    getDailyMoment(0),
    getDailyMoment(1),
    getDailyMoment(2)
  ];
}

function GameOver({ 
  score, 
  achievements, 
  onRestart, 
  currentMoment, 
  onShowCollection, 
  onShowBooks, 
  collectedMoments, 
  setAchievements,
  gameMode
}) {
  const [showShare, setShowShare] = useState(false);
  const [copied, setCopied] = useState(false);
  
  function handleShare() {
    const todaysMoments = getAllDailyMoments();
    const collectedCount = todaysMoments.filter(moment => 
      collectedMoments.includes(moment.id)
    ).length;
    
    const totalMoments = gameMode === 'classic' ? 3 : 1;
    const perfectGame = collectedCount === totalMoments;
    
    let shareText = `⚾️ Baseball Time Machine\n\n`;
    shareText += `${score} points\n`;
    shareText += `${collectedCount}/${totalMoments} perfect guesses\n\n`;
    
    if (perfectGame) {
      shareText += '🏆 PERFECT GAME!\n';
    }
    
    if (achievements.length > 0) {
      shareText += '\nAchievements:\n';
      achievements.forEach(achievement => {
        shareText += `${achievement} ⭐️\n`;
      });
    }
    
    shareText += '\nPlay now at baseballtimemachine.com';
    
    navigator.clipboard.writeText(shareText)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy:', err);
      });
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Left side - Stats */}
      <div className="p-6 rounded-lg">
        <h2 className="text-3xl text-[#f5f2e6] mb-4 text-center">Game Over!</h2>
        <div className="text-7xl text-green-400 mb-4 text-center">{score} points</div>
        
        {/* Achievements */}
        {achievements.length > 0 && (
          <div className="mb-6">
            <h3 className="text-[#f5f2e6] text-xl mb-3">Achievements</h3>
            <div className="flex flex-wrap gap-2">
              {achievements.map((achievement, index) => (
                <div 
                  key={index}
                  className="bg-[#1e4fba] text-white px-3 py-1 rounded-full text-sm flex items-center gap-2"
                >
                  <Star className="w-4 h-4" />
                  {achievement}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={onShowCollection}
            className="w-full bg-[#f5f2e6] hover:bg-[#e5e2d6] text-[#1e4fba] py-3 rounded-lg text-xl transition-all duration-300"
            style={{ fontFamily: 'Douglas-Burlington-Regular' }}
          >
            My Collection
          </button>
          <button
            onClick={handleShare}
            className="w-full bg-[#1e4fba] hover:bg-[#2460e6] text-white py-3 rounded-lg text-xl transition-all duration-300"
            style={{ fontFamily: 'Douglas-Burlington-Regular' }}
          >
            {copied ? 'Copied!' : 'Share Results'}
          </button>
          <button
            onClick={onShowBooks}
            className="w-full bg-[#1e4fba] hover:bg-[#2460e6] text-white py-3 rounded-lg text-xl transition-all duration-300"
            style={{ fontFamily: 'Douglas-Burlington-Regular' }}
          >
            Baseball Library
          </button>
        </div>
      </div>

      {/* Right side - Final Image */}
      <div className="p-6 rounded-lg">
        <h2 className="text-2xl text-[#f5f2e6] mb-4">Today's Moment</h2>
        <div className="relative">
          <img
            src={currentMoment.image}
            alt="Baseball moment"
            className="w-full h-auto rounded-lg"
            style={{ maxWidth: '500px', margin: '0 auto' }}
          />
        </div>
      </div>
    </div>
  );
}

function Collection({ onClose, collectedMoments, gameMode }) {
  const [selectedMoment, setSelectedMoment] = useState(null);
  const moments = BASEBALL_MOMENTS.filter(moment => collectedMoments.includes(moment.id));
  
  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
      <div className="max-w-4xl w-full mx-auto p-4 max-h-screen overflow-y-auto">
        <div className="bg-gray-800/90 rounded-lg p-6 border border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h2 
              className="text-3xl text-[#f5f2e6]"
              style={{ fontFamily: 'Douglas-Burlington-Regular' }}
            >
              My Collection
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              Close
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {moments.map(moment => (
              <div 
                key={moment.id}
                className="bg-gray-900/50 rounded-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105"
                onClick={() => setSelectedMoment(moment)}
              >
                <img
                  src={moment.image}
                  alt={moment.description}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="text-[#f5f2e6] text-lg mb-1">{moment.year}</div>
                  <div className="text-gray-400 text-sm">{moment.description}</div>
                </div>
              </div>
            ))}
          </div>

          {moments.length === 0 && (
            <div className="text-center py-12">
              <div className="text-[#f5f2e6] text-xl mb-2">No moments collected yet!</div>
              <div className="text-gray-400">
                Make perfect guesses to add moments to your collection.
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedMoment && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedMoment(null)}
        >
          <div className="max-w-4xl w-full">
            <button
              onClick={() => setSelectedMoment(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300"
            >
              Close
            </button>
            <img
              src={selectedMoment.image}
              alt={selectedMoment.description}
              className="w-full h-auto max-h-[80vh] object-contain"
            />
            <div className="mt-4 text-[#f5f2e6]">
              <div className="text-2xl mb-2">{selectedMoment.year}</div>
              <div className="text-lg mb-4">{selectedMoment.description}</div>
              <div className="text-gray-400">{selectedMoment.funFact}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Main game component
export default function BaseballTimeMachine() {
  const [gameMode, setGameMode] = useState(() => {
    // Check if there's a saved game mode in localStorage
    const savedMode = localStorage.getItem('baseball-game-mode');
    // Default to 'trivia' if no saved mode
    return savedMode || 'trivia';
  });
  
  const [gameState, setGameState] = useState(() => {
    const saved = loadDailyState();
    return saved ? saved.gameState : 'playing';
  });
  const [year, setYear] = useState(() => {
    const saved = loadDailyState();
    return saved ? saved.year : 1950;
  });
  const [outs, setOuts] = useState(() => {
    const saved = loadDailyState();
    return saved ? saved.outs : 0;
  });
  const [score, setScore] = useState(() => {
    const saved = loadDailyState();
    return saved ? saved.score : 0;
  });
  const [feedback, setFeedback] = useState('');
  const [sequenceIndex, setSequenceIndex] = useState(() => {
    const saved = loadDailyState();
    return saved ? saved.sequenceIndex : 0;
  });
  const [currentMoment, setCurrentMoment] = useState(() => getDailyMoment(sequenceIndex));
  const [achievements, setAchievements] = useState(() => {
    const saved = loadDailyState();
    return saved ? saved.achievements : [];
  });
  const [perfectStreak, setPerfectStreak] = useState(() => {
    const saved = loadDailyState();
    return saved ? saved.perfectStreak : 0;
  });
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [guessStartTime, setGuessStartTime] = useState(null);
  const [time, setTime] = useState(30);
  const [isMuted, setIsMuted] = useState(() => {
    const saved = localStorage.getItem('baseball-muted');
    return saved ? JSON.parse(saved) : false;
  });
  const [isImageTransitioning, setIsImageTransitioning] = useState(false);
  const [imageOpacity, setImageOpacity] = useState(1);
  const [collectedMoments, setCollectedMoments] = useState(() => {
    const saved = localStorage.getItem('baseball-collection');
    return saved ? JSON.parse(saved) : [];
  });
  const [showCollection, setShowCollection] = useState(false);
  const [strikes, setStrikes] = useState(() => {
    const saved = loadDailyState();
    return saved?.strikes || 0;
  });
  const [previousDifference, setPreviousDifference] = useState(null);
  const [showBooks, setShowBooks] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackData, setFeedbackData] = useState(null);
  const [showZoom, setShowZoom] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [triviaPoints, setTriviaPoints] = useState(0);

  // Game logic functions
  function handleTimeout() {
    // ... existing code ...
  }

  function handleYearChange(e) {
    // ... existing code ...
  }

  function checkAchievements(isExactMatch, timeTaken) {
    // ... existing code ...
  }

  function playSound(soundName) {
    // ... existing code ...
  }

  function handleGuess() {
    // ... existing code ...
  }

  function handleFeedbackNext(additionalPoints = 0) {
    // ... existing code ...
  }

  function updateCareerStats() {
    // ... existing code ...
  }

  function handleRestart() {
    // ... existing code ...
  }

  function handleStagingReset() {
    // ... existing code ...
  }

  function handlePreviewTomorrow() {
    // ... existing code ...
  }

  // UI rendering
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
      <div className="max-w-4xl mx-auto p-4">
        <div className="text-center mb-16">
          <img  
            src="/LOGO.png"
            className="w-full max-w-[650px] mx-auto"
            alt="Baseball Time Machine" 
          />
        </div>

        {gameState === 'over' ? (
          <GameOver 
            score={score}
            achievements={achievements}
            onRestart={handleRestart}
            currentMoment={currentMoment}
            onShowCollection={() => setShowCollection(true)}
            onShowBooks={() => setShowBooks(true)}
            collectedMoments={collectedMoments}
            setAchievements={setAchievements}
            gameMode={gameMode}
          />
        ) : (
          <div className="space-y-8">
            {/* Game UI */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left side - Image */}
              <div className="relative">
                <div 
                  className="relative transition-opacity duration-300"
                  style={{ opacity: imageOpacity }}
                >
                  <img
                    src={currentMoment.image}
                    alt="Baseball moment"
                    className="w-full h-auto rounded-lg shadow-lg"
                    style={{ maxHeight: '400px', objectFit: 'cover' }}
                  />
                  <button
                    onClick={() => setShowZoom(true)}
                    className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors duration-200"
                    title="Zoom Image"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="24" 
                      height="24" 
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
                </div>
              </div>

              {/* Right side - Controls */}
              <div className="space-y-6">
                {/* Score and Timer */}
                <div className="flex justify-between items-center">
                  <div className="text-[#f5f2e6] text-xl">
                    Score: <span className="text-green-400">{score}</span>
                  </div>
                  <Timer 
                    time={time} 
                    setTime={setTime} 
                    isActive={isTimerActive}
                  />
                </div>

                {/* Year Slider */}
                <div>
                  <label className="block text-[#f5f2e6] mb-2">Year: {year}</label>
                  <input
                    type="range"
                    min="1850"
                    max="2025"
                    value={year}
                    onChange={handleYearChange}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#d4b483]"
                  />
                  <div className="flex justify-between text-gray-400 text-sm">
                    <span>1850</span>
                    <span>2025</span>
                  </div>
                </div>

                {/* Guess Button */}
                <button
                  onClick={handleGuess}
                  className="w-full bg-[#1e4fba] hover:bg-[#2460e6] text-white py-3 rounded-lg text-xl transition-all duration-300 ease-in-out"
                  style={{ fontFamily: 'Douglas-Burlington-Regular' }}
                >
                  Make Your Guess
                </button>

                {/* Game Info */}
                <div className="flex justify-between items-center text-[#f5f2e6]">
                  <div>
                    Outs: {outs}
                  </div>
                  <div>
                    Strikes: {strikes}
                  </div>
                </div>
              </div>
            </div>

            {/* Feedback and Help */}
            <div className="flex justify-between items-center">
              <button
                onClick={() => setShowHowToPlay(true)}
                className="text-[#f5f2e6] hover:text-white"
              >
                How to Play
              </button>
              <button
                onClick={() => setShowCollection(true)}
                className="text-[#f5f2e6] hover:text-white"
              >
                My Collection
              </button>
            </div>
          </div>
        )}

        {/* Modals */}
        {showZoom && (
          <ImageZoom
            image={currentMoment.image}
            description="Baseball moment"
            onClose={() => setShowZoom(false)}
          />
        )}

        {showFeedback && (
          <TriviaFeedback
            {...feedbackData}
            onComplete={handleFeedbackNext}
          />
        )}

        {showCollection && (
          <Collection
            onClose={() => setShowCollection(false)}
            collectedMoments={collectedMoments}
            gameMode={gameMode}
          />
        )}

        {showHowToPlay && (
          <HowToPlay
            onClose={() => setShowHowToPlay(false)}
          />
        )}

        {showBooks && (
          <Books
            onClose={() => setShowBooks(false)}
          />
        )}

        {showFeedbackForm && (
          <FeedbackForm
            onClose={() => setShowFeedbackForm(false)}
          />
        )}
      </div>
    </div>
  );
} 