import React from 'react';

const RECOMMENDED_BOOKS = [
  {
    title: "Color Blind: The Forgotten Team That Broke Baseball's Color Line",
    author: "Tom Dunkel",
    description: "The fascinating story of an integrated baseball team in North Dakota that competed in the 1930s, years before Jackie Robinson broke the major league color barrier.",
    amazonLink: "https://www.amazon.com/Color-Blind-Forgotten-Broke-Baseballs/dp/0802121373",
    coverImage: "/books/colorblind.jpg"
  },
  {
    title: "The Glory of Their Times",
    author: "Lawrence S. Ritter",
    description: "A baseball classic that revolutionized sports journalism, this is an oral history of the game in the early 20th century, told by the players who played it. First published in 1966, it remains the most important baseball book ever written.",
    amazonLink: "https://www.amazon.com/Glory-Their-Times-Baseball-Perennial/dp/0061994715/",
    coverImage: "/books/book-glory.jpg"
  },
  {
    title: "Baseball's Golden Age: The Photographs of Charles M. Conlon",
    author: "Neal McCabe and Constance McCabe",
    description: "A selection of 205 duotone photographs from the archives of The Sporting Age, taken by the preeminent photographer between 1904 and 1942, highlights such moments as Ty Cobb's slide into third and Home Run Baker's batting practice, in a treasury complemented by text on the photographer's enduring legacy.",
    amazonLink: "https://www.amazon.com/Baseballs-Golden-Age-Photographs-Charles/dp/0810991195/",
    coverImage: "/books/book-conlon.jpg"
  },
  {
    title: "The Baseball 100",
    author: "Joe Posnanski",
    image: "/books/baseball100.jpg",
    description: "A fascinating countdown of the 100 greatest baseball players in history, featuring unforgettable tales and unique perspectives on the game's biggest legends.",
    link: "https://www.amazon.com/Baseball-100-Joe-Posnanski/dp/1982180587/"
  }
];

export function Books({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/90 z-50 overflow-y-auto">
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex justify-between items-center mb-8">
          <h2 
            className="text-4xl text-[#f5f2e6]"
            style={{ fontFamily: 'Douglas-Burlington-Regular' }}
          >
            Baseball History Books
          </h2>
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-300"
          >
            Close
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {RECOMMENDED_BOOKS.map((book, index) => (
            <div 
              key={index}
              className="bg-gray-800/90 rounded-lg overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300"
            >
              <div className="relative bg-[#f5f2e6] p-3">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-auto object-contain"
                  style={{ maxHeight: '300px' }}
                />
              </div>
              <div className="p-4">
                <h3 
                  className="text-lg text-white mb-2"
                  style={{ fontFamily: 'Douglas-Burlington-Regular' }}
                >
                  {book.title}
                </h3>
                <p className="text-gray-400 mb-2 text-sm">by {book.author}</p>
                <p className="text-gray-300 mb-4 text-sm" style={{ lineHeight: '1.6' }}>
                  {book.description}
                </p>
                <a 
                  href={book.amazonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#3B5998] hover:bg-[#4B69A8] text-white px-4 py-2 rounded-lg transition-all duration-300 ease-in-out shadow-md hover:shadow-lg text-sm"
                  style={{ fontFamily: 'Douglas-Burlington-Regular' }}
                >
                  View on Amazon
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 