import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "./components/ui/card";
import { Trophy, Medal, Star, Timer as TimerIcon, Award, Check, X } from 'lucide-react';
import { Timer } from './components/Timer';
import { Books } from './components/Books';
import { HowToPlay } from './components/HowToPlay';
import { FeedbackOverlay } from './components/FeedbackOverlay';
import { ImageZoom } from './components/ImageZoom';


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
    year: 1951,
    image: '/1951mantle.jpg',
    hint: "The Commerce Comet's Rookie Card",
    description: "Mickey Mantle's rookie season with the Yankees",
    funFact: "This image captures Mickey Mantle during his rookie season with the New York Yankees in 1951. The 19-year-old from Commerce, Oklahoma was initially assigned uniform #6, following in the footsteps of Babe Ruth (#3), Lou Gehrig (#4), and Joe DiMaggio (#5). However, after struggling and being briefly sent down to the minors, he returned wearing his iconic #7. Despite the early setback, Mantle would go on to become one of baseball's greatest switch-hitters, winning three AL MVP awards and helping the Yankees capture seven World Series titles during his 18-year career."
  },
  {
    id: 3,
    year: 1913,
    image: '/1913evers.jpg',
    hint: "Baseball's Brainy Ballplayer",
    description: "Johnny Evers of the Ch`icago Cubs",
    funFact: "Johnny Evers, immortalized in baseball lore as the pivot man in the famous 'Tinker to Evers to Chance' double play combination, was known as one of the game's most intelligent and intense players. This 1913 photograph was taken during his final season with the Chicago Cubs, where he had been a key part of their dynasty that won four National League pennants and two World Series (1907, 1908). Standing just 5'9\" and weighing 125 pounds, Evers earned the nickname 'The Human Crab' for his unique, sideways defensive style at second base. He was elected to the Baseball Hall of Fame in 1946."
  },
  {
    id: 4,
    year: 1991,
    image: '/1991.jpg',
    hint: "World Series Collision",
    description: "World Series Collision",
    funFact: "This image shows a dramatic moment between Lonnie Smith (runner) and Brian Harper (catcher) during the 1991 World Series between the Atlanta Braves and the Minnesota Twins. The 1991 World Series, often dubbed the Greatest World Series Ever Played, featured a record four games decided by a single run, with three of them going into extra innings. The Minnesota Twins won Game 7 in a nail-biting 1-0 victory, clinching the championship in one of the most intense pitching duels in MLB history! The play in the image exemplifies the grit and intensity that defined this iconic series."
  },
  {
    id: 5,
    year: 1988,
    image: '/1988.jpg',
    hint: "Gibby for the walkoff",
    description: "Kirk Gibson hits a world series walkoff",
    funFact: "Kirk Gibson hits a world series walkoff etc etc, need a fact here about knees"
  },
  {
    id: 6,
    year: 1987,
    image: '/1987.jpg',
    hint: "The Wizard shows his magic",
    description: "Ozzie Smith's acrobatic defense",
    funFact: "Known as 'The Wizard of Oz', Ozzie Smith revolutionized the shortstop position with his acrobatic defensive plays and signature backflips. He won an incredible 13 consecutive Gold Glove awards from 1980-1992. When he retired, he held major league records for assists (8,375) and double plays (1,590) by a shortstop, as well as the National League record for games played at shortstop (2,511). His defensive wizardry was so spectacular that he became the first player elected to the Hall of Fame primarily for his defensive skills, proving that a player didn't need to be a power hitter to be one of baseball's greatest stars."
  },
  {
    id: 7,
    year: 1961,
    image: '/1961.jpg',
    hint: "The Reluctant Record Breaker",
    description: "Roger Maris in the dugout",
    funFact: "Roger Maris, born in Hibbing, Minnesota and raised in North Dakota, became known as baseball's 'reluctant superstar.' Despite breaking Babe Ruth's single-season home run record in 1961 with 61 homers, Maris never seemed comfortable with fame. The pressure of chasing Ruth's record was so intense that his hair began falling out during the season. Commissioner Ford Frick's decision to put an asterisk next to his record (because Maris hit his in a 162-game season versus Ruth's 154) added to the controversy. The asterisk, which technically never existed in the record books but lived on in baseball lore, wasn't formally removed until 1991 - six years after Maris's death."
  },
  {
    id: 8,
    year: 1913,
    image: '/1913Thorpe.jpg',
    hint: "History's Greatest All-Around Athlete",
    description: "Jim Thorpe with the New York Giants",
    funFact: "Jim Thorpe might be the most talented athlete in American history. A member of the Sac and Fox Nation, he won Olympic gold medals in both the pentathlon and decathlon in 1912, played six seasons of Major League Baseball, was an inaugural member of the Pro Football Hall of Fame, and even played professional basketball. After winning his Olympic medals, King Gustav V of Sweden told him, 'Sir, you are the greatest athlete in the world,' to which Thorpe simply replied, 'Thanks, King.' Tragically, his Olympic medals were stripped away when it was discovered he had played semi-pro baseball (though they were posthumously restored in 1982). Despite this setback, he went on to play MLB baseball from 1913 to 1919, including time with the New York Giants, Cincinnati Reds, and Boston Braves."
  },
  {
    id: 9,
    year: 1982,
    image: '/1982.jpg',
    hint: "Gary Carter and a young Tim Raines among other Expos stars",
    description: "Montreal Expos stars",
    funFact: "This 1982 photo captures a golden era of Montreal Expos baseball, featuring future Hall of Famers Gary Carter and Tim Raines. The Expos' distinctive powder blue uniforms and tricolor caps became iconic symbols of baseball in Montreal. The team was loaded with talent, including Andre Dawson, who would win the NL Rookie of the Year in 1977, and Tim Raines, who led the National League in stolen bases from 1981-1984. Despite never winning a World Series, the Expos of this era were among the most exciting teams in baseball, regularly drawing over 2 million fans to Olympic Stadium.",
    source: "https://en.wikipedia.org/wiki/Montreal_Expos"
  },
  {
    id: 10,
    year: 1911,
    image: '/1911_Honus_Wagner.jpg',
    hint: "Honus Wagner",
    description: "Honus Wagner",
    funFact: "Known as 'The Flying Dutchman,' Honus Wagner was arguably baseball's greatest shortstop. In this 1911 photo, Wagner was already a baseball legend, having led the National League in batting average eight times. Despite standing only 5'11\" and having notably bowed legs, Wagner was an exceptional athlete who stole 723 bases and collected 3,420 hits during his 21-year career. Today, he's perhaps best known for the T206 Wagner baseball card, which has become the most valuable sports card in the world, with one example selling for $7.25 million in 2022. Wagner had the card pulled from production because he didn't want to promote tobacco to children, making it extremely rare.",
    source: "https://en.wikipedia.org/wiki/Honus_Wagner"
  },
  {
    id: 11,
    year: 1895,
    image: '/1895Michigan.jpg',
    hint: "Michigan",
    description: "Michigan",
    funFact: "Back row: Edward Weeks, Edmund Shields, Herbert Gallup, Frank Sexton, William Holmes. Middle row: William McKenzie, Charles Watkins, Ralph Russell, Guy Alonzo Miller, Edwin Deans. Front row: John Condon, William Waterman, John Bloomingston."
  },
  {
    id: 12,
    year: 1984,
    image: '/1984AS.jpg',
    hint: "Midsummer Classic in America's Finest City",
    description: "1984 All-Star Game at Jack Murphy Stadium",
    funFact: "The 1984 All-Star Game in San Diego marked the first time the Midsummer Classic was held in 'America's Finest City.' The game showcased those memorable brown and yellow Padres uniforms, which perfectly captured baseball's colorful 1980s style. The National League's 21-game unbeaten streak in All-Star competition (19 wins, 1 tie) finally came to an end that night, as the American League won 3-1. The game featured 16 future Hall of Famers, including Cal Ripken Jr., Reggie Jackson, and Dave Winfield. Coincidentally, 1984 would turn out to be a magical year for the host Padres, as they went on to win their first National League pennant that season."
  },
  {
    id: 13,
    year: 1981,
    image: '/boggs.jpg',
    hint: "longest game in history",
    description: "1984 All-Star Game at Jack Murphy Stadium",
    funFact: "Boggs vs Ripken in the longerst game ever played. Boggs and Ripken were top prospects for the Red Sox and Orioles, respectively. The Pawtucket Red Sox hosted the Rochester Red Wings on a cold and windy spring Saturday, April 18. After 32 innings, with the game tied at 2, the decision was made to finish the game at a later date. It was 4:09 AM. According to reports, 19 fans remained in the stands; each one was granted lifetime passes to games at McCoy Stadium in Pawtucket. The Red Sox won the game 3-2 in 33 innings when the game resumed on June 23. https://www.afootinthebox.com/peter/the-ripken-and-boggs-33-inning-8-hour-minor-league-game"
  },
  {
    id: 14,
    year: 1901,
    image: '/1901Tug.jpg',
    hint: "Pennant Winning Season for Tug",
    description: "Tug McGraw in the dugout",
    funFact: "Hall of Fame skipper John McGraw is pictured here in front of the dugout during the New York Giants National League Pennant winning 1912 season.",
    source: "https://en.m.wikipedia.org/wiki/File:1912_John_McGraw_by_Conlon.jpeg"
  },
  {
    id: 15,
    year: 1984,
    image: '/kirby.jpg',
    hint: "The Future Hall of Famer's Rookie Season",
    description: "Kirby Puckett's rookie season with the Minnesota Twins",
    funFact: "Kirby Puckett's path to the majors was anything but typical. He was discovered by Twins scout Jim Rantz while playing in a semi-pro tournament in Illinois. After being drafted, Puckett rocketed through the minor leagues, making his MLB debut on May 8, 1984. In his very first game, he went 4-for-5 with a stolen base, becoming the 9th player in MLB history to collect four hits in their debut. Despite his relatively late start in baseball and standing just 5'8\", Puckett would go on to become one of baseball's most beloved figures, leading the Twins to two World Series championships and earning a place in Cooperstown.",
    source: "https://en.wikipedia.org/wiki/Kirby_Puckett"
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

// Set volume for all sound effects to 20%
Object.values(SOUND_EFFECTS).forEach(sound => {
  sound.volume = 0.2;
});

function getDailyMoment(index = 0) {
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
  const startIndex = dayOfYear % (BASEBALL_MOMENTS.length - 2);
  return BASEBALL_MOMENTS[(startIndex + index) % BASEBALL_MOMENTS.length];
}

function getTodayKey() {
  const date = new Date();
  return `baseball-${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function loadDailyState() {
  const savedState = localStorage.getItem(getTodayKey());
  if (savedState) {
    const state = JSON.parse(savedState);
    // Check if the saved state is from a previous day
    const savedKey = getTodayKey();
    const currentKey = getTodayKey();
    if (savedKey !== currentKey) {
      // It's a new day, return null to start fresh
      localStorage.removeItem(savedKey);
      return null;
    }
    return state;
  }
  return null;
}

function saveDailyState(state) {
  localStorage.setItem(getTodayKey(), JSON.stringify({
    ...state,
    lastUpdated: new Date().toISOString()
  }));
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
  
  const correctGuesses = collectedMoments.filter(id => 
    allMoments.some(moment => moment.id === id)
  ).length;

  function handleShare() {
    const today = new Date();
    const dateStr = today.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: '2-digit' });
    
    // Create boxes string based on collected moments
    const boxes = allMoments.map(moment => 
      collectedMoments.includes(moment.id) ? '🟩' : '⬜'
    ).join('');
    
    const shareText = `⚾️ Baseball Time Machine ${dateStr}\n` +
                     `${boxes}\n` +
                     `${correctGuesses} Perfect ${correctGuesses === 1 ? 'Guess' : 'Guesses'}\n` +
                     `Score: ⭐ ${score} ⭐\n` +
                     `\nPlay at: https://baseballtimemachine.netlify.app/`;

    // Social sharing URLs
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://baseballtimemachine.netlify.app/')}&quote=${encodeURIComponent(shareText)}`;

    // Create share menu with React-style event handling
    const shareMenu = document.createElement('div');
    shareMenu.className = 'fixed inset-0 bg-black/80 z-50 flex items-center justify-center';
    shareMenu.innerHTML = `
      <div class="bg-gray-800 p-6 rounded-lg max-w-sm w-full mx-4 space-y-4 relative">
        <button class="absolute top-2 right-2 text-gray-400 hover:text-white" onclick="this.parentElement.parentElement.remove()">
          ✕
        </button>
        <h3 class="text-white text-xl mb-4" style="font-family: Douglas-Burlington-Regular">Share Your Results</h3>
        <div class="space-y-3">
          <a href="${twitterUrl}" target="_blank" rel="noopener noreferrer" 
             class="flex items-center justify-center gap-2 w-full bg-[#1DA1F2] text-white py-2 px-4 rounded hover:bg-[#1a8cd8] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z"/>
            </svg>
            Share on X/Twitter
          </a>
          <a href="${facebookUrl}" target="_blank" rel="noopener noreferrer"
             class="flex items-center justify-center gap-2 w-full bg-[#4267B2] text-white py-2 px-4 rounded hover:bg-[#365899] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
            </svg>
            Share on Facebook
          </a>
          <button id="copyButton"
             class="w-full bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors">
            Copy to Clipboard
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(shareMenu);

    // Add click handler for copy button
    const copyButton = shareMenu.querySelector('#copyButton');
    copyButton.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(shareText);
        copyButton.textContent = 'Copied!';
        setTimeout(() => {
          copyButton.textContent = 'Copy to Clipboard';
        }, 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
        copyButton.textContent = 'Failed to copy';
        setTimeout(() => {
          copyButton.textContent = 'Copy to Clipboard';
        }, 2000);
      }
    });
  }

  return (
    <div className="text-center p-8 max-w-4xl mx-auto min-h-screen">
      <div className="text-center mb-16">
        <img  
          src="/LOGO.png"
          className="max-w-[600px] mx-auto"
          alt="The Daily Baseball Photo Trivia Game" 
        />
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Left Column - Score, Share, and Thumbnails */}
        <div className="flex flex-col">
          <div className="bg-gray-800/90 p-6 rounded-lg border border-gray-700">
            <h2 className="text-3xl text-white mb-4 text-center" 
                style={{ fontFamily: 'Douglas-Burlington-Regular' }}>
        Game Over!
      </h2>
            <div 
              className="text-7xl text-green-400 mb-4 text-center"
              style={{ fontFamily: 'Douglas-Burlington-Regular' }}
            >
              {score} points
            </div>
            <div className="text-xl text-[#f5f2e6] mb-6">
              You got {correctGuesses} perfect {correctGuesses === 1 ? 'guess' : 'guesses'}!
            </div>

            {/* Thumbnails Grid */}
            <div className="grid grid-cols-3 gap-3 mb-6 w-full">
              {allMoments.map((moment, index) => (
                <div 
                  key={index} 
                  className="flex flex-col items-center"
                >
                  <div 
                    className="relative bg-[#f5f2e6] p-1"
                    style={{
                      boxShadow: '3px 2px 4px rgba(0, 0, 0, 0.9)',
                    }}
                  >
                    <div className="absolute -top-1 -left-1 z-10">
                      {collectedMoments.includes(moment.id) ? (
                        <div className="bg-green-500 rounded-full p-1">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      ) : (
                        <div className="bg-red-500 rounded-full p-1">
                          <X className="w-3 h-3 text-white" />
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
                    className="mt-1 text-lg text-white"
                    style={{ fontFamily: 'Douglas-Burlington-Regular' }}
                  >
                    {moment.year}
                  </div>
                </div>
              ))}
            </div>
            
            <button
              onClick={handleShare}
              className="bg-[#1e4fba] hover:bg-[#2460e6] text-white py-3 px-8 rounded-lg text-2xl transition-all duration-300 ease-in-out shadow-md hover:shadow-lg active:bg-[#1a3f8c] flex items-center justify-center gap-2 w-full mx-auto whitespace-nowrap"
              style={{ fontFamily: 'Douglas-Burlington-Regular' }}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                <polyline points="16 6 12 2 8 6"/>
                <line x1="12" y1="2" x2="12" y2="15"/>
              </svg>
              Share My Results ({correctGuesses}/3)
            </button>
          </div>
        </div>

        {/* Right Column - Achievements */}
        <div className="flex flex-col">
          {achievements.length > 0 ? (
            <>
              <h3 className="text-4xl text-yellow-400 mb-6 text-center"
                  style={{ fontFamily: 'Douglas-Burlington-Regular' }}>
                Boom! Achievements Unlocked!
              </h3>

              <div className="grid grid-cols-1 gap-4">
                {achievements.map((achievementId, index) => {
              const achievement = ACHIEVEMENTS[achievementId];
              const AchievementIcon = achievement.icon;
              return (
                <div 
                  key={achievementId} 
                      className="bg-gray-800/90 p-4 rounded-lg flex items-center transform hover:scale-105 border border-gray-700 shadow-lg"
                >
                      <div className="bg-[#1e4fba] p-3 rounded-full mr-4">
                        <AchievementIcon className="text-[#f5f2e6] w-8 h-8" />
                  </div>
                  <div className="text-left flex-1">
                        <div className="text-xl text-[#f5f2e6] mb-1" style={{ fontFamily: 'Douglas-Burlington-Regular' }}>{achievement.name}</div>
                    <div className="text-gray-400">{achievement.description}</div>
                  </div>
                </div>
              );
            })}
          </div>
            </>
          ) : (
            <div className="text-center text-gray-400 text-xl">
              No achievements unlocked yet!
        </div>
      )}
          </div>
          </div>

      <div className="flex flex-col items-center gap-4">
        <div className="flex justify-center gap-4">
          <button
            onClick={onRestart}
            className="bg-[#f5f2e6] hover:bg-[#e5e2d6] text-[#1e4fba] py-3 px-8 rounded-lg text-2xl transition-all duration-300 ease-in-out shadow-md hover:shadow-lg active:bg-[#d5d2c6]"
            style={{ fontFamily: 'Douglas-Burlington-Regular' }}
          >
            Play Again
          </button>

          <button
            onClick={onShowCollection}
            className="bg-[#f5f2e6] hover:bg-[#e5e2d6] text-[#1e4fba] py-3 px-8 rounded-lg text-2xl transition-all duration-300 ease-in-out shadow-md hover:shadow-lg active:bg-[#d5d2c6] flex items-center gap-2"
            style={{ fontFamily: 'Douglas-Burlington-Regular' }}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <rect x="2" y="5" width="16" height="16" rx="2"/>
              <rect x="6" y="3" width="16" height="16" rx="2"/>
              <path d="M22 9v10a2 2 0 0 1-2 2H6"/>
            </svg>
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
  // Filter to only show collected moments
  const discoveredMoments = BASEBALL_MOMENTS.filter(moment => 
    collectedMoments.includes(moment.id)
  );
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="fixed inset-0 bg-black/90 z-50 overflow-y-auto">
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex justify-between items-center mb-8">
          <h2 
            className="text-4xl text-white"
            style={{ fontFamily: 'Douglas-Burlington-Regular' }}
          >
            My Collection ({discoveredMoments.length})
          </h2>
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-300"
          >
            Close
          </button>
        </div>
        
        {discoveredMoments.length === 0 ? (
          <div className="text-center text-gray-400 text-xl py-12">
            No photos discovered yet! Get a perfect guess to add photos to your collection.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {discoveredMoments.map((moment, index) => (
              <div 
                key={moment.id}
                className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 animate-fadeIn"
                style={{
                  animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`
                }}
              >
                <div 
                  className="relative bg-[#f5f2e6] p-2 cursor-pointer"
                  onClick={() => setSelectedImage(moment)}
                >
                  <img
                    src={moment.image}
                    alt={moment.description}
                    className="w-full h-auto object-contain"
                  />
                </div>
                <div className="p-3">
                  <div className="text-white mb-2" style={{ fontFamily: 'Douglas-Burlington-Regular' }}>
                    {moment.year}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {moment.description}
                  </div>
                </div>
              </div>
            ))}
        </div>
        )}
      </div>

      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-7xl w-full mx-auto">
      <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 text-xl"
      >
              Close
      </button>
            <div 
              className="relative bg-[#f5f2e6] p-2"
              style={{
                boxShadow: '10px 6px 12px rgba(0, 0, 0, 0.9)',
              }}
              onClick={e => e.stopPropagation()}
            >
              <img
                src={selectedImage.image}
                alt={selectedImage.description}
                className="w-full h-auto object-contain max-h-[90vh]"
              />
            </div>
          </div>
        </div>
      )}
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
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackData, setFeedbackData] = useState(null);
  const [showZoom, setShowZoom] = useState(false);

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

  function checkAchievements(isExactMatch, timeTaken) {
    const newAchievements = [...achievements];
    
    if (isExactMatch) {
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
    let feedbackResult = '';
    let points = 0;
  
    if (!guessStartTime) {
      setGuessStartTime(Date.now());
    } else {
      timeTaken = (Date.now() - guessStartTime) / 1000;
    }
  
    const timeBonus = timeTaken < 10 ? 100 : 0;
  
    // Perfect guess = HOME RUN
    if (difference === 0) {
      playSound('homeRun');
      points = 400 + timeBonus;
      setScore((prevScore) => prevScore + points);
      feedbackResult = "HOME RUN!";
      checkAchievements(true, timeTaken);
      
      // Only add to collection on perfect guesses
      if (!collectedMoments.includes(currentMoment.id)) {
        setCollectedMoments(prev => [...prev, currentMoment.id]);
      }

      const nextIndex = sequenceIndex + 1;
      setFeedbackData({
        result: feedbackResult,
        yearDifference: difference,
        points: points,
        image: currentMoment.image,
        funFact: currentMoment.funFact,
        isGameOver: nextIndex >= 3,
        isFoulBall: false,
        currentYear: currentMoment.year
      });
      setShowFeedback(true);
      return;
    }
  
    // Way off guess (10+ years) = immediate out
    if (difference >= 10) {
      playSound('out');
      const newOuts = outs + 1;
      setOuts(newOuts);
      setStrikes(0); // Reset strikes on out
      
      feedbackResult = "OUT!";
      
      setFeedbackData({
        result: feedbackResult,
        yearDifference: difference,
        points: 0,
        image: currentMoment.image,
        funFact: currentMoment.funFact,
        isGameOver: newOuts >= 3,
        isFoulBall: false,
        currentYear: currentMoment.year
      });
      setShowFeedback(true);
      return;
    }
  
    // Handle foul balls (within 10 years)
    const newStrikes = strikes + 1;
    setStrikes(newStrikes);
    playSound('hit');
    
    if (newStrikes === 3) {
      // On third strike, determine if they get points
    if (difference <= 5) {
        if (difference <= 1) {
          points = 300 + timeBonus;
          feedbackResult = "TRIPLE!";
        } else if (difference <= 3) {
          points = 200 + timeBonus;
          feedbackResult = "DOUBLE!";
        } else {
          points = 100 + timeBonus;
          feedbackResult = "SINGLE!";
        }
      setScore((prevScore) => prevScore + points);
    } else {
        feedbackResult = "STRIKE THREE! YOU'RE OUT!";
      }
      
      const newOuts = outs + 1;
      setOuts(newOuts);
      setStrikes(0); // Reset strikes after out
      
      const nextIndex = sequenceIndex + 1;
      setFeedbackData({
        result: feedbackResult,
        yearDifference: difference,
        points: points,
        image: currentMoment.image,
        funFact: currentMoment.funFact,
        isGameOver: newOuts >= 3 || nextIndex >= 3,
        isFoulBall: false,
        currentYear: currentMoment.year
      });
      setShowFeedback(true);
    } else {
      // First or second strike - show foul ball overlay
      setFeedbackData({
        yearDifference: difference,
        strikes: newStrikes,
        isFoulBall: true,
        currentYear: currentMoment.year
      });
      setShowFeedback(true);
    }
    
      checkAchievements(false, timeTaken);
      setGuessStartTime(null);
    setIsTimerActive(false);
    setPreviousDifference(difference);
  }

  function handleFeedbackNext() {
    setShowFeedback(false);
    
    if (feedbackData.isGameOver) {
        setGameState('over');
      return;
    }
    
    // Only advance to next image if it was a scoring hit or an out
    if (feedbackData.result.includes('HOME RUN') || 
        feedbackData.result.includes('TRIPLE') || 
        feedbackData.result.includes('DOUBLE') || 
        feedbackData.result.includes('SINGLE') ||
        feedbackData.result.includes('OUT')) {
      const nextIndex = sequenceIndex + 1;
      setImageOpacity(0);
      setTimeout(() => {
        setSequenceIndex(nextIndex);
        setCurrentMoment(getDailyMoment(nextIndex));
        setYear(1950);
        setTime(30);
        setIsTimerActive(false);
        setGuessStartTime(null);
        setStrikes(0); // Reset strikes for new image
        setTimeout(() => {
          setImageOpacity(1);
        }, 300);
      }, 300);
    }
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

  function handleStagingReset() {
    // Clear all localStorage data
    localStorage.removeItem(getTodayKey());
    localStorage.removeItem('baseball-collection');
    localStorage.removeItem('baseball-muted');
    
    // Reset all state
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
    setCollectedMoments([]);
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
        <div className="text-center relative mb-1">
          <img  
            src="/LOGO.png"
            className="max-w-[500px] mx-auto"
            alt="The Daily Baseball Photo Trivia Game" 
          />
        </div>
        
        <Card className="bg-transparent border-none">
          <CardContent className="p-2">
            {/* Photo container */}
            <div className="relative mx-2 mb-8">
              <div 
                className="relative"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                {/* Background stack effect - multiple layers */}
                <div 
                  className="absolute"
                  style={{
                    backgroundImage: 'url(/bgfade%20Medium.png)',
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    width: '100%',
                    height: '100%',
                    top: '5px',
                    left: '-10px',
                    zIndex: -3,
                    transform: 'rotate(-2deg)',
                    opacity: 0.8
                  }}
                />
                <div 
                  className="absolute"
                  style={{
                    backgroundImage: 'url(/bgfade%20Medium.png)',
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    width: '100%',
                    height: '100%',
                    top: '10px',
                    left: '-20px',
                    zIndex: -2,
                    transform: 'rotate(-4deg)',
                    opacity: 0.6
                  }}
                />
                <div 
                  className="absolute"
                  style={{
                    backgroundImage: 'url(/bgfade%20Medium.png)',
                    backgroundSize: '100% 100%',
                  backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    width: '100%',
                    height: '100%',
                    top: '15px',
                    left: '-30px',
                    zIndex: -1,
                    transform: 'rotate(-6deg)',
                    opacity: 0.4
                  }}
                />
                
                {/* Main image container */}
                <div 
                  className="relative bg-[#f5f2e6] p-4"
                  style={{
                    zIndex: 2,
                    boxShadow: '10px 6px 12px rgba(0, 0, 0, 0.9)',
                    maxWidth: '90%',
                    margin: '0.25rem'
                  }}
                >
                  <div
                    className="transition-opacity duration-300 ease-in-out relative"
                    style={{ opacity: imageOpacity }}
                  >
                    <img
                      src={currentMoment.image}
                      alt={currentMoment.description}
                      className="w-full h-auto object-contain max-h-[500px]"
                      style={{
                        objectFit: 'contain',
                        width: '100%',
                        height: 'auto'
                      }}
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
                    <div className="absolute top-2 left-2 text-left">
                      <div 
                        className="text-[#1e1e1e]/70 text-sm space-y-1"
                        style={{ fontFamily: 'Douglas-Burlington-Regular' }}
                      >
                        <div>Image: {sequenceIndex + 1} of 3</div>
                        {strikes > 0 && <div>Strikes: {strikes}</div>}
                        {outs > 0 && <div>Outs: {outs}</div>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

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
                disabled={showFeedback || imageOpacity < 1}
                className={`w-full mb-8 bg-[#1e4fba] hover:bg-[#2460e6] text-white py-4 rounded-lg text-2xl transition-all duration-300 ease-in-out shadow-md hover:shadow-lg active:bg-[#1a3f8c] ${(showFeedback || imageOpacity < 1) ? 'opacity-50 cursor-not-allowed' : ''}`}
                style={{ fontFamily: 'Douglas-Burlington-Regular' }}
              >
                TAKE A SWING
              </button>
            </div>
          </CardContent>
        </Card>
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
      
      {showFeedback && feedbackData && (
        <FeedbackOverlay
          {...feedbackData}
          onNext={handleFeedbackNext}
        />
      )}
      {showZoom && (
        <ImageZoom
          image={currentMoment.image}
          description={currentMoment.description}
          onClose={() => setShowZoom(false)}
        />
      )}
      {window.location.hostname === 'localhost' && (
        <div className="fixed bottom-2 right-2">
          <button
            onClick={handleStagingReset}
            className="bg-gray-600/30 hover:bg-gray-600/50 text-white/50 hover:text-white/80 px-3 py-1 rounded text-xs transition-all duration-200"
          >
            Reset For Testing
          </button>
        </div>
      )}
    </div>
  );
}