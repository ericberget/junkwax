import React, { useState } from 'react';
import { Card, CardContent } from "./components/ui/card";
import { Trophy, Medal, Star, Timer, Award } from 'lucide-react';


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
    hint: "Gary Carter and a young Time Raines among other Expos stars",
    description: "Montreal Expos stars",
    funFact: "Just look at those jerseys though."
  },
  {
    id: 8,
    year: 1984,
    image: '/allstar-1984.jpg',
    hint: "Midsummer Classic in America's Finest City",
    description: "1984 All-Star Game at Jack Murphy Stadium",
    funFact: "The 1984 All-Star Game in San Diego marked the first time the Midsummer Classic was held in 'America's Finest City.' The game showcased those memorable brown and yellow Padres uniforms, which perfectly captured baseball's colorful 1980s style. The National League's 21-game unbeaten streak in All-Star competition (19 wins, 1 tie) finally came to an end that night, as the American League won 3-1. The game featured 16 future Hall of Famers, including Cal Ripken Jr., Reggie Jackson, and Dave Winfield. Coincidentally, 1984 would turn out to be a magical year for the host Padres, as they went on to win their first National League pennant that season."
  }

];

const ACHIEVEMENTS = {
  FIRST_HIT: { id: 'FIRST_HIT', name: 'Rookie of the Year', description: 'Get your first perfect guess', icon: Star },
  STREAK_3: { id: 'STREAK_3', name: 'Triple Play', description: '3 perfect guesses in a row', icon: Trophy },
  SPEED_DEMON: { id: 'SPEED_DEMON', name: 'Speed Demon', description: 'Perfect guess under 10 seconds', icon: Timer },
  POWER_HITTER: { id: 'POWER_HITTER', name: 'Power Hitter', description: 'Score over 1000 points', icon: Award },
  NO_STRIKES: { id: 'NO_STRIKES', name: 'Perfect Game', description: 'Complete a round with no outs', icon: Medal }
};

function YearDigit({ digit }) {
  return (
    <div 
      className="w-16 h-20 bg-white border-2 border-gray-300 rounded flex items-center justify-center text-4xl font-mono font-bold text-blue-900 shadow-lg mx-1"
      style={{ fontFamily: "'American Typewriter', 'Courier New', monospace" }}
    >
      {digit}
    </div>
  );
}

function GameOver({ score, achievements, onRestart, currentMoment }) {
  return (
    <div className="text-center p-8 max-w-2xl mx-auto">
      <h2 className="text-5xl font-bold text-white mb-4" style={{ fontFamily: "'American Typewriter', serif" }}>
        Game Over!
      </h2>
      <div className="text-3xl text-green-400 mb-8 font-bold">Final Score: {score}</div>
      
      {achievements.length > 0 && (
        <div className="mb-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center">
              <h3 className="text-2xl text-yellow-400 font-bold bg-gray-900 px-4 mb-6">
                Boom! Achievements Unlocked!
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
            {achievements.map(achievementId => {
              const achievement = ACHIEVEMENTS[achievementId];
              const AchievementIcon = achievement.icon;
              return (
                <div 
                  key={achievementId} 
                  className="bg-gray-800 p-4 rounded-lg flex items-center transform transition-all duration-300 hover:scale-105 hover:bg-gray-750 border border-gray-700 shadow-lg"
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

      <div className="mb-8 bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
          <div className="relative flex justify-center">
            <h3 className="text-2xl text-blue-400 font-bold bg-gray-800 px-4 mb-6">
              Baseball History Corner
            </h3>
          </div>
        </div>
        
        <div className="bg-gray-900 rounded-lg overflow-hidden mb-4">
               <img
                    src={currentMoment.image}
                    alt={currentMoment.description}
                    className="w-full border border-gray-300"
                />
        </div>
        
        <div className="text-gray-300 text-left">
          <span className="text-blue-400 font-bold">Fun Fact: </span>
          {currentMoment.funFact}
        </div>
      </div>

      <button
        onClick={onRestart}
        className="bg-blue-600 hover:bg-blue-500 text-white py-4 px-12 rounded-lg text-2xl font-bold transition-all duration-300 ease-in-out shadow-md hover:shadow-lg active:bg-blue-700"
        style={{ fontFamily: "'American Typewriter', serif" }}
      >
        Play Again
      </button>
    </div>
  );
}

export default function BaseballTimeMachine() {
  const [gameState, setGameState] = useState('playing');
  const [year, setYear] = useState(1950);
  const [outs, setOuts] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [currentMoment, setCurrentMoment] = useState(BASEBALL_MOMENTS[0]);
  const [achievements, setAchievements] = useState([]);
  const [perfectStreak, setPerfectStreak] = useState(0);
  const [guessStartTime, setGuessStartTime] = useState(null);

  function handleYearChange(e) {
    const newYear = Math.max(1850, Math.min(2025, parseInt(e.target.value)));
    setYear(newYear);
    if (!guessStartTime) {
      setGuessStartTime(Date.now());
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


  function handleGuess() {
    const targetYear = currentMoment.year;
    const difference = Math.abs(targetYear - year);
    const timeTaken = guessStartTime ? (Date.now() - guessStartTime) / 1000 : null;
    
    // Perfect guess
    if (difference === 0) {
      setScore(score + 300);
      setFeedback('Perfect! Home Run! +300 points');
      const nextIndex = (BASEBALL_MOMENTS.findIndex(m => m.id === currentMoment.id) + 1) % BASEBALL_MOMENTS.length;
      setCurrentMoment(BASEBALL_MOMENTS[nextIndex]);
      checkAchievements(true, timeTaken);
      return;
    }

    // Close guess
    if (difference <= 5) {
      const points = 100 - (difference * 15);
      setScore(score + points);
      setFeedback(`Close! +${points} points`);
      checkAchievements(false);
    } else {
      // Complete miss
      const newOuts = outs + 1;
      setOuts(newOuts);
      setFeedback('Out! Try a different era');
      checkAchievements(false);
      
      // Check for game over
      if (newOuts >= 3) {
        setGameState('over');
      }
    }
    
    setGuessStartTime(null);
  }

  function handleRestart() {
    setYear(1950);
    setOuts(0);
    setScore(0);
    setFeedback('');
    setCurrentMoment(BASEBALL_MOMENTS[0]);
    setPerfectStreak(0);
    setAchievements([]);
    setGameState('playing');
  }

if (gameState === 'over') {
    return (
      <div className="min-h-screen w-full bg-gray-900">
        <GameOver 
          score={score}
          achievements={achievements}
          onRestart={handleRestart}
          currentMoment={currentMoment}
        />
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
      <div className="text-center">
        <img  src="/gameLogo.png"
              className="max-w-[600px] mx-auto"
              alt="The Daily Baseball Photo Trivia Game" />
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
                {/* Paper texture frame background 
                <div className="absolute inset-0" style={{ 
                  backgroundImage: 'url("/paper-texture.png")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transform: 'scale(1.11)',
                  zIndex: 1
                }} />*/}
                
                {/* Photo with cream border */}
                <div 
                  className="relative bg-[#f5f2e6] p-4"
                  style={{
                    zIndex: 2,
                    boxShadow: '10px 6px 12px rgba(0, 0, 0, 0.9)',
                    maxWidth: '99%',
                    margin: '1rem'
                  }}
                >
                  <img
                    src={currentMoment.image}
                    alt={currentMoment.description}
                    className="w-full border border-gray-300"
                />
                </div>
              </div>
            </div>
            
            
            {feedback && (
              <div className="text-center mb-2 text-xl font-bold" style={{ 
                fontFamily: "'American Typewriter', serif",
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
                className="w-full mb-8 bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-lg text-xl font-bold transition-all duration-300 ease-in-out shadow-md hover:shadow-lg active:bg-blue-700"
                style={{fontFamily: "'American Typewriter', serif" }}
              >
                TAKE A SWING
              </button>
            </div>

            
            <div className="flex justify-between items-center mt-8 bg-gray-700 rounded-lg p-4 text-white">
              <div>
                <span className="text-gray-300">Outs</span>
                <div className="text-3xl font-bold">{outs}</div>
              </div>
              
              <div className="flex gap-2">
                {BASEBALL_MOMENTS.map((moment, index) => (
                  <div 
                    key={moment.id}
                    className={`w-3 h-3 rounded-full ${
                      currentMoment.id === moment.id 
                        ? 'bg-blue-500' 
                        : 'bg-gray-600'
                    }`}
                  />
                ))}
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
    </div>
  );
}