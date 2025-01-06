export function HowToPlay({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/90 z-50 overflow-y-auto">
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex justify-between items-center mb-8">
          <h2 
            className="text-4xl text-[#f5f2e6]"
            style={{ fontFamily: 'Douglas-Burlington-Regular' }}
          >
            How To Play
          </h2>
          <button 
            onClick={onClose}
            className="text-[#1e4fba] hover:text-[#2460e6] transition-colors duration-200"
          >
            Close
          </button>
        </div>

        <div className="bg-gray-800/90 rounded-lg p-6 border border-gray-700">
          <div className="space-y-8">
            <section>
              <h3 className="text-2xl text-yellow-400 mb-3" style={{ fontFamily: 'Douglas-Burlington-Regular' }}>
                The Basics
              </h3>
              <div className="mb-4 text-[#f5f2e6]">
                <p>Guess the year of each historical baseball photo.</p>
                <p>You'll see <span className="font-bold text-yellow-400">three</span> different photos each day.</p>
              </div>
            </section>

            <section>
              <h3 className="text-2xl text-yellow-400 mb-3" style={{ fontFamily: 'Douglas-Burlington-Regular' }}>
                Strikes & Outs
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-[#f5f2e6]">
                <li>Guesses within 10 years count as a foul ball (strike)</li>
                <li>Three strikes = One out</li>
                <li>Way off guesses (10+ years) = Immediate out</li>
                <li>Three outs = Game over</li>
              </ul>
            </section>

            <section>
              <h3 className="text-2xl text-yellow-400 mb-3" style={{ fontFamily: 'Douglas-Burlington-Regular' }}>
                Scoring System
              </h3>
              <ul className="list-disc pl-5 space-y-2">
                <li className="text-[#f5f2e6]"><span className="text-green-400">Home Run (400 points)</span>: Perfect year guess</li>
                <li className="text-[#f5f2e6]"><span className="text-green-400">Triple (300 points)</span>: Within 1 year</li>
                <li className="text-[#f5f2e6]"><span className="text-green-400">Double (200 points)</span>: Within 2-3 years</li>
                <li className="text-[#f5f2e6]"><span className="text-green-400">Single (100 points)</span>: Within 4-5 years</li>
                <li className="text-[#f5f2e6]"><span className="text-green-400">Speed Bonus (100 points)</span>: Added for guesses under 10 seconds</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
} 