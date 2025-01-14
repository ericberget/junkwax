export function Collection({ onClose, collectedMoments, gameMode }) {
  // Filter to only show collected moments
  const discoveredMoments = BASEBALL_MOMENTS.filter(moment => 
    collectedMoments.includes(moment.id)
  );
  const [selectedImage, setSelectedImage] = useState(null);

  // Load career stats from localStorage and ensure totalPoints is a number
  const careerStats = JSON.parse(localStorage.getItem('baseball-career-stats') || JSON.stringify({
    totalPoints: 0,
    perfectGuesses: 0,
    gamesPlayed: 0,
    achievements: [],
    singles: 0,
    doubles: 0,
    triples: 0,
    streak: 0,
    lastPlayed: null
  }));

  // Ensure totalPoints is a number
  const displayPoints = typeof careerStats.totalPoints === 'number' ? careerStats.totalPoints : 0;

  return (
    <div className="fixed inset-0 bg-black/90 z-50 overflow-y-auto">
      <div className="max-w-4xl mx-auto p-4">
        {/* Career Stats Section */}
        <div className="text-center mb-12">
          <div className="bg-gray-800/90 rounded-lg p-8 border border-gray-700">
            <h2 
              className="text-2xl text-white mb-4"
              style={{ fontFamily: 'Douglas-Burlington-Regular' }}
            >
              Total Career Points
            </h2>
            <div 
              className="text-6xl text-green-400 mb-8"
              style={{ fontFamily: 'Douglas-Burlington-Regular' }}
            >
              {displayPoints} points
            </div>
            <div className="grid grid-cols-1 gap-6 text-[#f5f2e6]/70 text-xl max-w-2xl mx-auto">
              {/* Hitting Stats - Only show in Classic Mode */}
              {gameMode === 'classic' && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl mb-1" style={{ fontFamily: 'Douglas-Burlington-Regular' }}>{discoveredMoments.length}</div>
                    <div className="text-[#f5f2e6]/50 text-lg">Home Runs</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-1" style={{ fontFamily: 'Douglas-Burlington-Regular' }}>{careerStats.triples || 0}</div>
                    <div className="text-[#f5f2e6]/50 text-lg">Triples</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-1" style={{ fontFamily: 'Douglas-Burlington-Regular' }}>{careerStats.doubles || 0}</div>
                    <div className="text-[#f5f2e6]/50 text-lg">Doubles</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-1" style={{ fontFamily: 'Douglas-Burlington-Regular' }}>{careerStats.singles || 0}</div>
                    <div className="text-[#f5f2e6]/50 text-lg">Singles</div>
                  </div>
                </div>
              )}

              {/* Career Stats */}
              <div className="grid grid-cols-2 gap-4 border-t border-[#f5f2e6]/10 pt-6">
                <div className="text-center">
                  <div className="text-2xl mb-1" style={{ fontFamily: 'Douglas-Burlington-Regular' }}>{careerStats.gamesPlayed || 0}</div>
                  <div className="text-[#f5f2e6]/50 text-lg">Games Played</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-1" style={{ fontFamily: 'Douglas-Burlington-Regular' }}>{careerStats.streak || 0}</div>
                  <div className="text-[#f5f2e6]/50 text-lg">Day Streak</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trophy Case Section */}
        <div className="flex justify-between items-center mb-8">
          <h2 
            className="text-4xl text-white"
            style={{ fontFamily: 'Douglas-Burlington-Regular' }}
          >
            {gameMode === 'classic' ? 'Home Run Trophy Case' : 'Perfect Guesses'} ({discoveredMoments.length})
          </h2>
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-300 absolute top-4 right-4"
          >
            Close
          </button>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {discoveredMoments.map((moment) => (
            <div 
              key={moment.id}
              onClick={() => setSelectedImage(moment)}
              className="cursor-pointer group relative"
            >
              <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden border border-gray-700 group-hover:border-green-500 transition-all duration-300">
                <img
                  src={moment.image}
                  alt={moment.description}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white text-center p-4">
                <div>
                  <div className="text-lg font-bold mb-1">{moment.year}</div>
                  <div className="text-sm">{moment.description}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Image Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="max-w-4xl w-full">
              <img
                src={selectedImage.image}
                alt={selectedImage.description}
                className="w-full h-auto"
              />
              <div className="text-white text-center mt-4">
                <div className="text-2xl font-bold mb-2">{selectedImage.year}</div>
                <div className="text-lg">{selectedImage.description}</div>
                <div className="text-gray-400 mt-4">{selectedImage.funFact}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 