import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "./components/ui/card";
import { Trophy, Medal, Star, Timer as TimerIcon, Award, Check, X } from 'lucide-react';
import { Timer } from './components/Timer';
import { Books } from './components/Books';
import { HowToPlay } from './components/HowToPlay';


const BASEBALL_MOMENTS = [
  {
    id: 1,
    year: 1935,
    image: '/bismarck.jpg',
    hint: "Satchel Barnstorms in Bismarck North Dakota",
    description: "Satchel Barnstorms in Bismarck North Dakota",
    funFact: "This team photograph from 1935 offers a fascinating glimpse into an important moment in baseball history. According to author Tom Dunkel, it's the only known picture of the Bismarck team taken just before they left for the National Tournament. The lineup features an integrated group of players, with both Black and white athletes on the squad. This was highly unusual for the time, as the sport remained largely segregated. In the image, we can see player-manager Neil Churchill kneeling in the front row, while star pitcher Satchel Paige stands alongside his teammates. Notably, white outfielder Moose Johnson has his hand resting on Paiges shoulder, a gesture that symbolizes the camaraderie and acceptance within the team. Today, baseball historians view the 1935 Bismarck squad as a pivotal step toward the integration of the major leagues. While Jackie Robinson would not break the color barrier until 1947, this team foreshadowed the sport's more inclusive future. Their photograph serves as a tangible reminder of the progress that was slowly taking shape, even amidst the widespread segregation of the era."
  },
  {
    id: 2,
    year: 1991,
    image: '/1991.jpg',
    hint: "World Series Collision",
    description: "World Series Collision",
    funFact: "This image shows a dramatic moment between Lonnie Smith (runner) and Brian Harper (catcher) during the 1991 World Series between the Atlanta Braves and the Minnesota Twins. The 1991 World Series, often dubbed the Greatest World Series Ever Played, featured a record four games decided by a single run, with three of them going into extra innings. The Minnesota Twins won Game 7 in a nail-biting 1-0 victory, clinching the championship in one of the most intense pitching duels in MLB history! The play in the image exemplifies the grit and intensity that defined this iconic series."
  },
  {
    id: 3,
    year: 1988,
    image: '/1988.jpg',
    hint: "Gibby for the walkoff",
    description: "Kirk Gibson hits a world series walkoff",
    funFact: "Kirk Gibson hits a world series walkoff etc etc, need a fact here about knees"
  },
  {
    id: 4,
    year: 1987,
    image: '/1987.jpg',
    hint: "The Wizard shows his magic",
    description: "Ozzie Smith's acrobatic defense",
    funFact: "Known as 'The Wizard of Oz', Ozzie Smith revolutionized the shortstop position with his acrobatic defensive plays and signature backflips. He won an incredible 13 consecutive Gold Glove awards from 1980-1992. When he retired, he held major league records for assists (8,375) and double plays (1,590) by a shortstop, as well as the National League record for games played at shortstop (2,511). His defensive wizardry was so spectacular that he became the first player elected to the Hall of Fame primarily for his defensive skills, proving that a player didn't need to be a power hitter to be one of baseball's greatest stars."
  },
  {
    id: 5,
    year: 1961,
    image: '/1961.jpg',
    hint: "The Reluctant Record Breaker",
    description: "Roger Maris in the dugout",
    funFact: "Roger Maris, born in Hibbing, Minnesota and raised in North Dakota, became known as baseball's 'reluctant superstar.' Despite breaking Babe Ruth's single-season home run record in 1961 with 61 homers, Maris never seemed comfortable with fame. The pressure of chasing Ruth's record was so intense that his hair began falling out during the season. Commissioner Ford Frick's decision to put an asterisk next to his record (because Maris hit his in a 162-game season versus Ruth's 154) added to the controversy. The asterisk, which technically never existed in the record books but lived on in baseball lore, wasn't formally removed until 1991 - six years after Maris's death."
  },
  {
    id: 6,
    year: 1913,
    image: '/1913Thorpe.jpg',
    hint: "History's Greatest All-Around Athlete",
    description: "Jim Thorpe with the New York Giants",
    funFact: "Jim Thorpe might be the most talented athlete in American history. A member of the Sac and Fox Nation, he won Olympic gold medals in both the pentathlon and decathlon in 1912, played six seasons of Major League Baseball, was an inaugural member of the Pro Football Hall of Fame, and even played professional basketball. After winning his Olympic medals, King Gustav V of Sweden told him, 'Sir, you are the greatest athlete in the world,' to which Thorpe simply replied, 'Thanks, King.' Tragically, his Olympic medals were stripped away when it was discovered he had played semi-pro baseball (though they were posthumously restored in 1982). Despite this setback, he went on to play MLB baseball from 1913 to 1919, including time with the New York Giants, Cincinnati Reds, and Boston Braves."
  },
  {
    id: 7,
    year: 1982,
    image: '/1982.jpg',
    hint: "Gary Carter and a young Tim Raines among other Expos stars",
    description: "Montreal Expos stars",
    funFact: "Just look at those jerseys though."
  },
  {
    id: 8,
    year: 1984,
    image: '/1984AS.jpg',
    hint: "Midsummer Classic in America's Finest City",
    description: "1984 All-Star Game at Jack Murphy Stadium",
    funFact: "The 1984 All-Star Game in San Diego marked the first time the Midsummer Classic was held in 'America's Finest City.' The game showcased those memorable brown and yellow Padres uniforms, which perfectly captured baseball's colorful 1980s style. The National League's 21-game unbeaten streak in All-Star competition (19 wins, 1 tie) finally came to an end that night, as the American League won 3-1. The game featured 16 future Hall of Famers, including Cal Ripken Jr., Reggie Jackson, and Dave Winfield. Coincidentally, 1984 would turn out to be a magical year for the host Padres, as they went on to win their first National League pennant that season."
  },
  {
    id: 9,
    year: 1901,
    image: '/1901Tug.jpg',
    hint: "Pennant Winning Season for Tug",
    description: "Tug McGraw in the dugout",
    funFact: "Hall of Fame skipper John McGraw is pictured here in front of the dugout during the New York Giants National League Pennant winning 1912 season.",
    source: "https://en.m.wikipedia.org/wiki/File:1912_John_McGraw_by_Conlon.jpeg"
  }

];

const ACHIEVEMENTS = {
  FIRST_HIT: { id: 'FIRST_HIT', name: 'Rookie of the Year', description: 'Get your first perfect guess', icon: Star },
  STREAK_3: { id: 'STREAK_3', name: 'Triple Play', description: '3 perfect guesses in a row', icon: Trophy },
  SPEED_DEMON: { id: 'SPEED_DEMON', name: 'Speed Demon', description: 'Perfect guess under 10 seconds', icon: TimerIcon },
  POWER_HITTER: { id: 'POWER_HITTER', name: 'Power Hitter', description: 'Score over 1000 points', icon: Award },
  NO_STRIKES: { id: 'NO_STRIKES', name: 'Perfect Game', description: 'Complete a round with no outs', icon: Medal }
};

const SOUND_EFFECTS = {
  homeRun: new Audio('/sounds/homerun.mp3'),
  hit: new Audio('/sounds/hit.mp3'),
  out: new Audio('/sounds/out.wav'),
  achievement: new Audio('/sounds/achievement.wav')
};

function getDailyMoment(index = 0) {
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
  const startIndex = dayOfYear % (BASEBALL_MOMENTS.length - 2);
  return BASEBALL_MOMENTS[(startIndex + index) % BASEBALL_MOMENTS.length];
}

function getTodayKey() {
  const date = new Date();
  return `baseball-${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

function loadDailyState() {
  const savedState = localStorage.getItem(getTodayKey());
  if (savedState) {
    return JSON.parse(savedState);
  }
  return null;
}

function saveDailyState(state) {
  localStorage.setItem(getTodayKey(), JSON.stringify(state));
}


function YearDigit({ digit }) {
  return (
    <div 
      className="w-16 h-20 bg-white border-2 border-gray-300 rounded flex items-center justify-center text-5xl font-mono text-blue-900 shadow-lg mx-1"
      style={{ fontFamily: 'Douglas-Burlington-Regular' }}
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

function GameOver({ score, achievements, onRestart, currentMoment, onShowCollection, onShowBooks, collectedMoments }) {
  const allMoments = getAllDailyMoments();
  const [selectedMoment, setSelectedMoment] = useState(currentMoment);
  
  return (
    <div className="text-center p-8 max-w-4xl mx-auto min-h-screen">
      <div className="text-center mb-8">
        <img  
          src="/gameLogo.png"
          className="max-w-[600px] mx-auto"
          alt="The Daily Baseball Photo Trivia Game" 
        />
      </div>

      <div>
        <h2 className="text-6xl text-white mb-4" 
            style={{ fontFamily: 'Douglas-Burlington-Regular' }}>
          Game Over!
        </h2>
        <div className="text-3xl text-green-400 mb-8 font-bold">
          Final Score: {score}
        </div>
      </div>
      
      {achievements.length > 0 && (
        <div className="mb-8">
          <h3 className="text-2xl text-yellow-400 mb-6 text-center"
              style={{ fontFamily: 'Douglas-Burlington-Regular' }}>
            Boom! Achievements Unlocked!
          </h3>

          <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
            {achievements.map((achievementId, index) => {
              const achievement = ACHIEVEMENTS[achievementId];
              const AchievementIcon = achievement.icon;
              return (
                <div 
                  key={achievementId} 
                  className="bg-gray-800/90 p-4 rounded-lg flex items-center transform hover:scale-105 border border-gray-700 shadow-lg"
                >
                  <div className="bg-blue-900 p-3 rounded-full mr-4">
                    <AchievementIcon className="text-yellow-400 w-8 h-8" />
                  </div>
                  <div className="text-left flex-1">
                    <div className="text-xl font-bold text-white mb-1">{achievement.name}</div>
                    <div className="text-gray-400">{achievement.description}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="mb-8" style={{ 
        backgroundImage: 'url("/textureNavy.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '0.5rem',
        padding: '2rem',
        border: '1px solid rgb(55, 65, 81)'
      }}>
        <h3 className="text-2xl text-[#f5f2e6] mb-8 text-center">
          Today's Photos
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
          {allMoments.map((moment, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center cursor-pointer transform transition-transform hover:scale-105"
              onClick={() => setSelectedMoment(moment)}
            >
              <div 
                className={`relative bg-[#f5f2e6] p-2 ${selectedMoment.id === moment.id ? 'ring-2 ring-blue-500' : ''}`}
                style={{
                  boxShadow: '5px 3px 6px rgba(0, 0, 0, 0.9)',
                }}
              >
                <div className="absolute -top-2 -left-2 z-10">
                  {collectedMoments.includes(moment.id) ? (
                    <div className="bg-green-500 rounded-full p-1">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  ) : (
                    <div className="bg-red-500 rounded-full p-1">
                      <X className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
                <img
                  src={moment.image}
                  alt={moment.description}
                  className="w-full h-auto object-contain"
                />
              </div>
              <div 
                className="mt-2 text-xl text-white"
                style={{ fontFamily: 'Douglas-Burlington-Regular' }}
              >
                {moment.year}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8" style={{ 
        backgroundImage: 'url("/textureNavy.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '0.5rem',
        border: '1px solid rgb(55, 65, 81)'
      }}>
        <div className="relative"
             style={{
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center'
             }}>
          <div className="relative bg-[#f5f2e6] p-4"
               style={{
                 zIndex: 2,
                 boxShadow: '10px 6px 12px rgba(0, 0, 0, 0.9)',
                 maxWidth: '99%',
                 margin: '1rem'
               }}>
            <img
              src={selectedMoment.image}
              alt={selectedMoment.description}
              className="w-full h-auto object-contain max-h-[600px]"
              style={{
                objectFit: 'contain',
                width: '100%',
                height: 'auto'
              }}
            />
          </div>
        </div>
        
        <div className="text-gray-300 text-left max-w-3xl mx-auto"
             style={{
               lineHeight: '1.7',
               fontSize: '1.05rem'
             }}>
          {selectedMoment.funFact}
          {selectedMoment.source && (
            <div className="mt-4 text-sm text-gray-400">
              <a 
                href={selectedMoment.source} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-400 underline"
              >
                Source
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="flex justify-center gap-4">
          <button
            onClick={onRestart}
            className="bg-[#3B5998] hover:bg-[#4B69A8] text-white py-4 px-12 rounded-lg text-3xl transition-all duration-300 ease-in-out shadow-md hover:shadow-lg active:bg-[#2B4988]"
            style={{ fontFamily: 'Douglas-Burlington-Regular' }}
          >
            Play Again
          </button>

          <button
            onClick={onShowCollection}
            className="bg-[#3B5998] hover:bg-[#4B69A8] text-white py-4 px-12 rounded-lg text-3xl transition-all duration-300 ease-in-out shadow-md hover:shadow-lg active:bg-[#2B4988]"
            style={{ fontFamily: 'Douglas-Burlington-Regular' }}
          >
            View Collection
          </button>
        </div>
        
        <button
          onClick={onShowBooks}
          className="text-[#f5f2e6] hover:text-white text-xl transition-all duration-300 ease-in-out underline"
          style={{ fontFamily: 'Douglas-Burlington-Regular' }}
        >
          Recommended Baseball Books
        </button>
      </div>
    </div>
  );
}

function Collection({ onClose, collectedMoments }) {
  return (
    <div className="fixed inset-0 bg-black/90 z-50 overflow-y-auto">
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex justify-between items-center mb-8">
          <h2 
            className="text-4xl text-white"
            style={{ fontFamily: 'Douglas-Burlington-Regular' }}
          >
            My Collection
          </h2>
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-300"
          >
            Close
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BASEBALL_MOMENTS.map(moment => {
            const isCollected = collectedMoments.includes(moment.id);
            return (
              <div 
                key={moment.id}
                className={`bg-gray-800 rounded-lg overflow-hidden ${!isCollected && 'opacity-50'}`}
              >
                <div className="relative bg-[#f5f2e6] p-4">
                  <img
                    src={moment.image}
                    alt={moment.description}
                    className={`w-full h-auto object-contain ${!isCollected && 'blur-sm'}`}
                  />
                  {!isCollected && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl text-white bg-black/50 px-4 py-2 rounded">
                        Not Yet Discovered
                      </span>
                    </div>
                  )}
                </div>
                {isCollected && (
                  <div className="p-4">
                    <div className="text-white mb-2" style={{ fontFamily: 'Douglas-Burlington-Regular' }}>
                      {moment.year}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {moment.description}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function BaseballTimeMachine() {
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

  useEffect(() => {
    if (isTimerActive && time === 0) {
      handleTimeout();
    }
  }, [time, isTimerActive]);

  function handleTimeout() {
    setOuts(prev => prev + 1);
    setFeedback("Time's up! Strike!");
    SOUND_EFFECTS.out.play();
    setIsTimerActive(false);
    
    if (outs + 1 >= 3) {
      setGameState('over');
    }
  }

  saveDailyState({
    gameState,
    year,
    outs,
    strikes,
    score,
    achievements,
    perfectStreak,
    sequenceIndex
  });

  function handleYearChange(e) {
    const newYear = Math.max(1850, Math.min(2025, parseInt(e.target.value)));
    setYear(newYear);
    if (!guessStartTime) {
      setGuessStartTime(Date.now());
      setIsTimerActive(true);
    }
  }

  function checkAchievements(correct, timeTaken) {
    const newAchievements = [...achievements];
    
    if (correct) {
      if (!achievements.includes('FIRST_HIT')) {
        newAchievements.push('FIRST_HIT');
      }
      
      const newStreak = perfectStreak + 1;
      setPerfectStreak(newStreak);
      
      if (newStreak >= 3 && !achievements.includes('STREAK_3')) {
        newAchievements.push('STREAK_3');
      }
      
      if (timeTaken < 10 && !achievements.includes('SPEED_DEMON')) {
        newAchievements.push('SPEED_DEMON');
      }
      
      if (score >= 1000 && !achievements.includes('POWER_HITTER')) {
        newAchievements.push('POWER_HITTER');
      }
      
      if (outs === 0 && !achievements.includes('NO_STRIKES')) {
        newAchievements.push('NO_STRIKES');
      }
    } else {
      setPerfectStreak(0);
    }
    
    if (newAchievements.length !== achievements.length) {
      setAchievements(newAchievements);
    }
  }

  function playSound(soundName) {
    if (!isMuted && SOUND_EFFECTS[soundName]) {
      console.log(`Attempting to play sound: ${soundName}`);
      SOUND_EFFECTS[soundName].play()
        .then(() => {
          console.log(`Successfully played ${soundName}`);
        })
        .catch(err => {
          console.error(`Failed to play ${soundName}:`, err);
        });
    }
  }

  function handleGuess() {
    const targetYear = currentMoment.year;
    const difference = Math.abs(targetYear - year);
    let timeTaken = null;
  
    if (!guessStartTime) {
      setGuessStartTime(Date.now());
    } else {
      timeTaken = (Date.now() - guessStartTime) / 1000;
    }
  
    // Way off guess (15+ years) = immediate out
    if (difference >= 15) {
      playSound('out');
      const newOuts = outs + 1;
      setOuts(newOuts);
      
      const popUpMessages = [
        "Pop up to the pitcher! That's an out - you were way off.",
        "Easy pop fly to the mound! Out - not even close.",
        "Weak pop up! That's an out - try a different era."
      ];
      const randomMessage = popUpMessages[Math.floor(Math.random() * popUpMessages.length)];
      setFeedback(randomMessage);

      // Move to next image or game over
      if (newOuts >= 3) {
        setGameState('over');
      } else {
        // Advance to next image
        const nextIndex = sequenceIndex + 1;
        if (nextIndex < 3) {
          setImageOpacity(0);
          setTimeout(() => {
            setSequenceIndex(nextIndex);
            setCurrentMoment(getDailyMoment(nextIndex));
            setYear(1950);
            setTime(30);
            setIsTimerActive(false);
            setGuessStartTime(null);
            setStrikes(0);
            
            setTimeout(() => {
              setImageOpacity(1);
            }, 100);
          }, 1000);
        } else {
          setGameState('over');
        }
      }
      return;
    }
  
    const timeBonus = timeTaken < 10 ? 100 : 0;
  
    if (difference === 0) {
      playSound('homeRun');
      const points = 400 + timeBonus;
      setScore((prevScore) => prevScore + points);
      setFeedback(`HOME RUN! +${points} points ${timeBonus > 0 ? `(includes ${timeBonus} speed bonus!)` : ''}`);
      checkAchievements(true, timeTaken);
      
      const nextIndex = sequenceIndex + 1;
      if (nextIndex < 3) {
        setImageOpacity(0);
        
        setTimeout(() => {
          setSequenceIndex(nextIndex);
          setCurrentMoment(getDailyMoment(nextIndex));
          setYear(1950);
          setTime(30);
          setIsTimerActive(false);
          setGuessStartTime(null);
          
          setTimeout(() => {
            setImageOpacity(1);
          }, 100);
        }, 1000);
      } else {
        setGameState('over');
      }
      if (!collectedMoments.includes(currentMoment.id)) {
        setCollectedMoments(prev => [...prev, currentMoment.id]);
      }
      return;
    }
  
    const newStrikes = strikes + 1;
    setStrikes(newStrikes);
    
    if (newStrikes >= 3) {
      const newOuts = outs + 1;
      setOuts(newOuts);
      setStrikes(0);
      
      if (newOuts >= 3) {
        setGameState('over');
      }
    }

    if (difference <= 5) {
      playSound('hit');
      let basePoints;
      let feedbackMessage;
      
      // First strike
      if (newStrikes === 1) {
        feedbackMessage = "Foul Ball! (Strike One) - You're in the right era!";
      }
      // Second strike
      else if (newStrikes === 2) {
        if (difference < previousDifference) {
          feedbackMessage = "Foul Ball! (Strike Two) - Getting warmer!";
        } else {
          feedbackMessage = "Foul Ball! (Strike Two) - Stay focused!";
        }
      }
      // Third strike - but close enough to get points
      else if (newStrikes === 3) {
        if (difference <= 5) {  // They made contact on their last strike
          if (difference <= 1) {
            basePoints = 300;
            feedbackMessage = `Contact on Strike Three! TRIPLE! +${basePoints} points`;
          } else if (difference <= 3) {
            basePoints = 200;
            feedbackMessage = `Contact on Strike Three! DOUBLE! +${basePoints} points`;
          } else {
            basePoints = 100;
            feedbackMessage = `Contact on Strike Three! SINGLE! +${basePoints} points`;
          }
          
          // Add points
          const points = basePoints + timeBonus;
          setScore((prevScore) => prevScore + points);
          setFeedback(feedbackMessage);
          
          // Advance to next image
          const nextIndex = sequenceIndex + 1;
          if (nextIndex < 3) {
            setImageOpacity(0);
            
            setTimeout(() => {
              setSequenceIndex(nextIndex);
              setCurrentMoment(getDailyMoment(nextIndex));
              setYear(1950);
              setTime(30);
              setIsTimerActive(false);
              setGuessStartTime(null);
              setStrikes(0);  // Reset strikes for next image
              
              setTimeout(() => {
                setImageOpacity(1);
              }, 100);
            }, 1000);
          } else {
            setGameState('over');
          }
        } else {
          // Strike out - not close enough on third strike
          setFeedback("Strike Three! You're out!");
          const newOuts = outs + 1;
          setOuts(newOuts);
          if (newOuts >= 3) {
            setGameState('over');
          }
        }
      }
      
      setFeedback(feedbackMessage);
      
      if (basePoints) {
        const points = basePoints + timeBonus;
        setScore((prevScore) => prevScore + points);
      }
    } else if (difference <= 10) {
      // Regular strikes for medium-distance guesses
      playSound('out');
      if (newStrikes === 1) {
        setFeedback("Strike One! - Try a different decade");
      } else if (newStrikes === 2) {
        setFeedback("Strike Two! - One more chance!");
      } else {
        setFeedback("Strike Three! You're out!");
      }
    } else {
      // Way off guesses
      playSound('out');
      const popUpMessages = [
        `Pop up to the pitcher! (Strike ${newStrikes}) That guess was way off.`,
        `Easy pop fly to the mound! (Strike ${newStrikes}) Not even close.`,
        `Weak pop up! (Strike ${newStrikes}) Try a different era.`
      ];
      const randomMessage = popUpMessages[Math.floor(Math.random() * popUpMessages.length)];
      setFeedback(randomMessage);
    }
    
    checkAchievements(false, timeTaken);
    setGuessStartTime(null);

    setIsTimerActive(false);

    setPreviousDifference(difference);
  }

  function handleRestart() {
    setYear(1950);
    setOuts(0);
    setStrikes(0);
    setScore(0);
    setFeedback('');
    setPerfectStreak(0);
    setAchievements([]);
    setGameState('playing');
    setTime(30);
    setIsTimerActive(false);
    setGuessStartTime(null);
    setSequenceIndex(0);
    setCurrentMoment(getDailyMoment(0));
  }

  useEffect(() => {
    localStorage.setItem('baseball-muted', JSON.stringify(isMuted));
  }, [isMuted]);

  useEffect(() => {
    // Preload sounds
    Object.values(SOUND_EFFECTS).forEach(sound => {
      sound.load();
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('baseball-collection', JSON.stringify(collectedMoments));
  }, [collectedMoments]);

  if (gameState === 'over') {
    return (
      <div 
        className="min-h-screen w-full" 
        style={{ 
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.95) 70%), url('/bg.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
          backgroundColor: 'black'
        }}>
        <GameOver 
          score={score}
          achievements={achievements}
          onRestart={handleRestart}
          currentMoment={currentMoment}
          onShowCollection={() => setShowCollection(true)}
          onShowBooks={() => setShowBooks(true)}
          collectedMoments={collectedMoments}
        />
        {showCollection && (
          <Collection 
            onClose={() => setShowCollection(false)} 
            collectedMoments={collectedMoments}
          />
        )}
        {showBooks && (
          <Books 
            onClose={() => setShowBooks(false)}
          />
        )}
      </div>
    );
  }

  const yearDigits = year.toString().padStart(4, '0').split('');

  return (
    <div 
      className="min-h-screen w-full" 
      style={{ 
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.95) 70%), url('/bg.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'black'
      }}>

      <div className="max-w-4xl mx-auto p-4">
        <div className="text-center relative">
          <img 
            src="/gameLogo.png"
            className="max-w-[600px] mx-auto"
            alt="The Daily Baseball Photo Trivia Game" 
          />
        </div>
        
        <Card className="bg-transparent border-none">
          <CardContent className="p-6">
            {/* Photo container */}
            <div className="relative mx-2 my-2">
              <div 
                className="relative"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <div 
                  className="relative bg-[#f5f2e6] p-4"
                  style={{
                    zIndex: 2,
                    boxShadow: '10px 6px 12px rgba(0, 0, 0, 0.9)',
                    maxWidth: '99%',
                    margin: '1rem'
                  }}
                >
                  <div
                    className="transition-opacity duration-1000 ease-in-out"
                    style={{ opacity: imageOpacity }}
                  >
                    <img
                      src={currentMoment.image}
                      alt={currentMoment.description}
                      className="w-full h-auto object-contain max-h-[600px]"
                      style={{
                        objectFit: 'contain',
                        width: '100%',
                        height: 'auto'
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 right-0 transform translate-y-full pt-2">
                <button
                  onClick={() => setShowHowToPlay(true)}
                  className="text-[#f5f2e6] hover:text-[#f5f2e6] text-sm transition-colors duration-200 opacity-30 hover:opacity-100"
                  style={{ fontFamily: 'Douglas-Burlington-Regular' }}
                >
                  HOW TO PLAY
                </button>
              </div>
            </div>
            
            
            {feedback && (
              <div className="text-center mb-2 text-2xl" style={{ 
                fontFamily: 'Douglas-Burlington-Regular',
                color: feedback.includes('Perfect') ? '#4ade80' : feedback.includes('Close') ? '#fbbf24' : '#ef4444'
              }}>
                {feedback}
              </div>
            )}


            <div className="space-y-6">
              <div className="flex justify-center mb-6">
                {yearDigits.map((digit, index) => (
                  <YearDigit key={index} digit={digit} />
                ))}
              </div>
              
              <div className="space-y-2">
                <input
                  type="range"
                  min="1850"
                  max="2025"
                  value={year}
                  onChange={handleYearChange}
                  className="w-full h-3 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-400">
                  <span>1850</span>
                  <span>2025</span>
                </div>
              </div>
              
              <button
                onClick={handleGuess}
                className="w-full mb-8 bg-[#3B5998] hover:bg-[#4B69A8] text-white py-4 rounded-lg text-2xl transition-all duration-300 ease-in-out shadow-md hover:shadow-lg active:bg-[#2B4988]"
                style={{ fontFamily: 'Douglas-Burlington-Regular' }}
              >
                TAKE A SWING
              </button>
            </div>

            
            <div className="flex justify-between items-center mt-8 bg-gray-700 rounded-lg p-4 text-white">
              <div>
                <span className="text-gray-300">Outs</span>
                <div className="text-3xl font-bold">{outs}</div>
                <div className="text-sm text-gray-300">Strikes: {strikes}</div>
              </div>
              
              <div className="flex-1 mx-8 text-center">
                {feedback && (
                  <div className="text-xl" style={{ 
                    fontFamily: 'Douglas-Burlington-Regular',
                    color: feedback.includes('HOME RUN') ? '#4ade80' : 
                           feedback.includes('TRIPLE') ? '#fbbf24' : 
                           feedback.includes('DOUBLE') ? '#60a5fa' : 
                           feedback.includes('SINGLE') ? '#a78bfa' : 
                           '#ef4444'
                  }}>
                    {feedback}
                  </div>
                )}
              </div>

              <div>
                <span className="text-gray-300">Score</span>
                <div className="text-3xl font-bold text-green-400">+{score}</div>
              </div>
            </div>
            


          </CardContent>
        </Card>
        
        <div className="text-center text-gray-400 mt-4">
          Hint: {currentMoment.hint}
        </div>
      </div>
      {showCollection && (
        <Collection 
          onClose={() => setShowCollection(false)} 
          collectedMoments={collectedMoments}
        />
      )}
      {showHowToPlay && (
        <HowToPlay onClose={() => setShowHowToPlay(false)} />
      )}
    </div>
  );
}