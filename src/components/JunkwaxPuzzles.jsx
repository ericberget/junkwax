export const JUNKWAX_PUZZLES = [
  {
    id: 1,
    player: 'Chipper Jones',
    year: 1991,
    company: 'Upper Deck',
    zoomImage: '/baseballcards/c1zoom.jpg',
    fullImage: '/baseballcards/c1.jpg',
    description: "This 1991 Upper Deck card features a young Chipper Jones before his legendary career with the Atlanta Braves. Selected first overall in the 1990 MLB draft, Jones would go on to become one of the greatest switch-hitters in baseball history. An eight-time All-Star and the 1999 NL MVP, Chipper finished his career with a .303 batting average, 468 home runs, and 1,623 RBI. He was inducted into the Baseball Hall of Fame in 2018 with 97.2% of the vote."
  },
  {
    id: 2,
    player: 'Jose Canseco',
    year: 1987,
    company: 'Topps',
    zoomImage: '/baseballcards/c2zoom.jpg',
    fullImage: '/baseballcards/c2.jpg',
    description: "This 1987 Topps card captures Jose Canseco during his explosive early years with the Oakland A's. The distinctive wood-grain border design of the '87 Topps set perfectly frames baseball's most dynamic young slugger. Canseco would go on to become MLB's first 40-40 player (40 homers and 40 stolen bases in a single season) in 1988, win the AL MVP that same year, and help form the 'Bash Brothers' with Mark McGwire. Despite a controversial career, Canseco's impact on the game and card collecting in the late 1980s was undeniable."
  },
  {
    id: 3,
    player: 'Dave Winfield',
    year: 1989,
    company: 'Topps',
    zoomImage: '/baseballcards/c3zoom.jpg',
    fullImage: '/baseballcards/c3.jpg',
    description: "This 1989 Topps card captures Dave Winfield during his Yankees years. A true five-tool player, Winfield was a 12-time All-Star and 7-time Gold Glove winner. He was drafted by four teams in three different sports (MLB, NBA, and ABA), making him one of the most versatile athletes in history. After 22 seasons, 3,110 hits, and 465 home runs, Winfield was inducted into the Hall of Fame in 2001, choosing to enter as a San Diego Padre despite his notable years with the Yankees."
  },
  {
    id: 4,
    player: 'Randy Johnson',
    year: 1989,
    company: 'Donruss',
    zoomImage: '/baseballcards/c4zoom.jpg',
    fullImage: '/baseballcards/c4.jpg',
    description: "This 1989 Donruss card shows Randy Johnson early in his career with the Montreal Expos. Standing at an intimidating 6'10\", 'The Big Unit' would develop into one of the most dominant pitchers in baseball history. His accomplishments include 5 Cy Young Awards, a perfect game, 4,875 strikeouts (second all-time), and a World Series co-MVP award in 2001. The Hall of Famer's combination of height, velocity, and slider movement made him nearly unhittable in his prime, leading to 100.3 career WAR, the highest ever by a left-handed pitcher."
  },
  {
    id: 5,
    player: 'Deion Sanders',
    year: 1991,
    company: 'Upper Deck',
    zoomImage: '/baseballcards/c5zoom.jpg',
    fullImage: '/baseballcards/c5.jpg',
    description: "This 1991 Upper Deck card captures 'Prime Time' Deion Sanders during his time with the Atlanta Braves. One of the greatest athletes in sports history, Sanders is the only person to play in both a Super Bowl and World Series. His blazing speed and electric personality made him a fan favorite in both baseball and football. In 1991, he hit .304 for the Braves during their worst-to-first season while also starring as a cornerback for the Atlanta Falcons, making him one of the last great two-sport athletes. A member of the Pro Football Hall of Fame, Sanders finished his MLB career with 186 stolen bases and a .263 batting average across nine seasons."
  },
  {
    id: 6,
    player: 'Tony Gwynn',
    year: 1987,
    company: 'Fleer',
    zoomImage: '/baseballcards/c6zoom.jpg',
    fullImage: '/baseballcards/c6.jpg',
    description: "This 1987 Fleer card captures Tony Gwynn during his prime years with the San Diego Padres. Known as 'Mr. Padre', Gwynn was one of the greatest pure hitters in baseball history. An eight-time batting champion and 15-time All-Star, Gwynn finished his career with a remarkable .338 batting average and 3,141 hits. His incredible bat control and consistency at the plate made him nearly impossible to strike out, and he was inducted into the Baseball Hall of Fame in 2007 with 97.6% of the vote."
  }
];

// Helper function to get a random puzzle
export function getRandomPuzzle() {
  const randomIndex = Math.floor(Math.random() * JUNKWAX_PUZZLES.length);
  return JUNKWAX_PUZZLES[randomIndex];
}

// Helper function to get puzzle by ID
export function getPuzzleById(id) {
  return JUNKWAX_PUZZLES.find(puzzle => puzzle.id === id);
}

// List of all card companies that appear in the puzzles
export const CARD_COMPANIES = [
  'Topps',
  'Donruss',
  'Bowman',
  'Pinnacle',
  'Upper Deck',
  'Fleer',
  'Score'
]; 