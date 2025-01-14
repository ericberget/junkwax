import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "./components/ui/card";
import { Trophy, Medal, Star, Timer as TimerIcon, Award, Check, X } from 'lucide-react';
import { Timer } from './components/Timer';
import { Books } from './components/Books';
import { HowToPlay } from './components/HowToPlay';
import { FeedbackOverlay } from './components/FeedbackOverlay';
import { ImageZoom } from './components/ImageZoom';
import { FeedbackForm } from './components/FeedbackForm';
import { GameModeSelect } from './components/GameModeSelect';
import { TriviaFeedback } from './components/TriviaFeedback';


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
    image: '/1951Mantle.jpg',
    hint: "The Commerce Comet's Rookie Card",
    description: "Mickey Mantle's rookie season with the Yankees",
    funFact: "This image captures Mickey Mantle during his rookie season with the New York Yankees in 1951. The 19-year-old from Commerce, Oklahoma was initially assigned uniform #6, following in the footsteps of Babe Ruth (#3), Lou Gehrig (#4), and Joe DiMaggio (#5). However, after struggling and being briefly sent down to the minors, he returned wearing his iconic #7. Despite the early setback, Mantle would go on to become one of baseball's greatest switch-hitters, winning three AL MVP awards and helping the Yankees capture seven World Series titles during his 18-year career."
  },
  {
    id: 3,
    year: 1913,
    image: '/1913.jpg',
    hint: "Baseball's Brainy Ballplayer",
    description: "Johnny Evers of the Chicago Cubs",
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
    year: 1896,
    image: '/Honus1896.jpg',
    hint: "The Flying Dutchman's Minor League Days",
    description: "Paterson Silk Weavers, Atlantic League, 1896",
    funFact: "This remarkable 1896 photo captures two future Hall of Famers at the start of their careers: 22-year-old Honus Wagner (top, third from left) and Ed Barrow (middle, second from left). While Wagner would become baseball's greatest shortstop, Barrow would make his mark as an executive, helping build the Yankees dynasty of the 1920s and 1930s. In 1896, Wagner was still developing his skills in the minors, playing for $35 a month with the Paterson Silk Weavers. His manager? None other than Ed Barrow, who would later say he knew Wagner was special when he saw him jump a fence from a standing position while chasing a foul ball."
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
    funFact: "This 1982 photo captures a golden era of Montreal Expos baseball, featuring future Hall of Famers Gary Carter and Tim Raines. The Expos' distinctive powder blue uniforms and tricolor caps became iconic symbols of baseball in Montreal. The team was loaded with talent, including Andre Dawson, who would win the NL Rookie of the Year in 1977, and Tim Raines, who led the National League in stolen bases from 1981-1984. Despite never winning a World Series, the Expos of this era were among the most exciting teams in baseball, regularly drawing over 2 million fans to Olympic Stadium."
  },
  {
    id: 10,
    year: 1911,
    image: '/1911_Honus_Wagner.jpg',
    hint: "Honus Wagner",
    description: "Honus Wagner",
    funFact: "Honus Wagner earned several memorable nicknames during his legendary career. He was most famously known as 'The Flying Dutchman' due to his German heritage and incredible speed on the basepaths. His Pittsburgh teammates also called him 'Hans' (short for Johannes, his birth name) and 'Old Honus.' But perhaps his most colorful nickname was 'Bowlegged Beauty,' a reference to his distinctive curved legs that didn't stop him from becoming one of baseball's most graceful shortstops."
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
    image: '/kirby.jpg',
    hint: "The Future Hall of Famer's Rookie Season",
    description: "Kirby Puckett's rookie season with the Minnesota Twins",
    funFact: "Kirby Puckett's path to the majors was anything but typical. He was discovered by Twins scout Jim Rantz while playing in a semi-pro tournament in Illinois. After being drafted, Puckett rocketed through the minor leagues, making his MLB debut on May 8, 1984. In his very first game, he went 4-for-5 with a stolen base, becoming the 9th player in MLB history to collect four hits in their debut. Despite his relatively late start in baseball and standing just 5'8\", Puckett would go on to become one of baseball's most beloved figures, leading the Twins to two World Series championships and earning a place in Cooperstown."
  },
  {
    id: 13,
    year: 1981,
    image: '/boggs.jpg',
    hint: "longest game in history",
    description: "boggs",
    funFact: "Boggs vs Ripken in the longerst game ever played. Boggs and Ripken were top prospects for the Red Sox and Orioles, respectively. The Pawtucket Red Sox hosted the Rochester Red Wings on a cold and windy spring Saturday, April 18. After 32 innings, with the game tied at 2, the decision was made to finish the game at a later date. It was 4:09 AM. According to reports, 19 fans remained in the stands; each one was granted lifetime passes to games at McCoy Stadium in Pawtucket. The Red Sox won the game 3-2 in 33 innings when the game resumed on June 23."
  },
  {
    id: 14,
    year: 1901,
    image: '/1901Tug.jpg',
    hint: "Cleveland's First AL Season",
    description: "1901 Cleveland Blues Team Photo",
    funFact: "This Cleveland team played in the very first American League game ever on April 24, 1901. Then called the Blues and managed by Jimmy McAleer (in derby hat), they would later become known as the Indians in 1915 and Guardians in 2022. On May 23rd of their inaugural season, they pulled off one of the greatest comebacks in baseball history, scoring 9 runs with two outs in the ninth to win 14-13.",
    source: "https://sabr.org/gamesproj/game/may-23-1901-hopeless-defeat-turned-into-glorious-victory/"
  },
  {
    id: 6,
    year: 1933,
    image: '/1933.jpg',
    hint: "The First All-Star Game",
    description: "The First MLB All-Star Game at Comiskey Park",
    funFact: "This image captures a historic moment in baseball history - the first Major League Baseball All-Star Game, played on July 6, 1933, at Chicago's Comiskey Park. The game was conceived by Chicago Tribune sports editor Arch Ward as part of the city's Century of Progress Exposition. The American League, led by Babe Ruth (who hit the first home run in All-Star Game history), defeated the National League 4-2. The success of this 'one-time' exhibition led to it becoming an annual tradition, marking one of baseball's most enduring innovations from the Great Depression era. The game featured an incredible lineup of future Hall of Famers, including Lou Gehrig, Jimmie Foxx, Al Simmons, and Charlie Gehringer for the American League, facing Carl Hubbell, Bill Terry, Pie Traynor, and Chuck Klein of the National League."
  },
  {
    id: 17,
    year: 1951,
    image: '/Mays1951.jpg',
    hint: "The Say Hey Kid's Rookie Season",
    description: "Willie Mays' Rookie Season with the New York Giants",
    funFact: "This photograph captures Willie Mays during his remarkable rookie season with the New York Giants in 1951. Despite a rough 1-for-26 start to his career that had him doubting himself, the 20-year-old center fielder would go on to win the National League Rookie of the Year award, batting .274 with 20 home runs. His natural talent and infectious enthusiasm earned him the nickname 'The Say Hey Kid.' That same year, Mays would help the Giants complete their historic comeback against the Dodgers, culminating in Bobby Thomson's 'Shot Heard 'Round the World.' This was just the beginning of a legendary 22-year career that would see Mays become one of baseball's greatest all-around players, known for his spectacular catches, powerful hitting, and baserunning prowess."
  },
  {
    id: 18,
    year: 1909,
    image: '/stPaul.jpg',
    hint: "The St. Paul Colored Gophers",
    description: "St. Paul Colored Gophers Team Photo",
    funFact: "The St. Paul Colored Gophers were one of the most formidable Black baseball teams of the pre-Negro Leagues era. In 1909, they were considered by many to be the strongest African American team in the country. The team featured several legendary players, including Bobby Marshall, who would later become one of the first African American players in the NFL. The Colored Gophers regularly competed against - and often defeated - white teams, helping to demonstrate the high caliber of Black baseball talent decades before integration. Their success helped pave the way for the more formally organized Negro National League, which would be established in 1920 by Rube Foster."
  },
  {
    id: 19,
    year: 1924,
    image: '/ruthKnockedOut.jpg',
    hint: "The Babe's Dangerous Collision",
    description: "Babe Ruth Knocked Unconscious at Griffith Stadium",
    funFact: " On July 5th, 1924, in the fourth inning of a game against the Washington Senators at Griffith Stadium, Babe Ruth chased a long fly ball and crashed full-speed into the concrete wall. The collision knocked him unconscious for nearly five minutes, creating a scene that stunned the crowd into silence. Despite the severity of the impact, Ruth not only returned to the game but also hit a double in his next at-bat. This incident exemplified Ruth's legendary toughness and dedication - after the game he simply said, 'I feel a bit woozy, but outside of a slight headache, I'm all right.' The photo became one of baseball's most memorable images, showing the dramatic moment when even the seemingly invincible Babe Ruth proved mortal.",
    source: "https://www.loc.gov/item/2016838013/"
  },
  {
    id: 20,
    year: 1969,
    image: '/metspitchers.jpg',
    hint: "The Miracle Mets' Arms",
    description: "1969 Mets Pitching Staff",
    funFact: "The '69 Mets pitching staff was so dominant that Tom Seaver (25-7), Jerry Koosman (17-9), Gary Gentry (13-12), and Nolan Ryan combined for an incredible 28 shutouts. Their team ERA of 2.99 was tops in the league, and they would go on to shock the heavily favored Baltimore Orioles in the World Series."
  },
  {
    id: 21,
    year: 1948,
    image: '/fellerAndSatchel.jpg',
    hint: "Two Legendary Fireballers Face Off",
    description: "Bob Feller vs. Satchel Paige",
    funFact: "This rare photo captures a historic matchup between two of baseball's greatest pitchers. Bob Feller and Satchel Paige faced off in numerous barnstorming games, with Feller later saying Paige was the best pitcher he ever saw. In their matchups, Paige's teams won 6 of the 9 documented games against Feller's teams."
  },
  {
    id: 22,
    year: 1914,
    image: '/baberedsox.jpg',
    hint: "The Babe as a Rookie Pitcher",
    description: "Babe Ruth with the Boston Red Sox",
    funFact: "Before becoming baseball's greatest slugger, Babe Ruth was one of the American League's best left-handed pitchers. He went 89-46 with a 2.28 ERA in six seasons as a Red Sox pitcher before being converted to an outfielder. His pitching was so dominant that he once threw a 13-inning complete game victory in the World Series."
  },
  {
    id: 23,
    year: 1985,
    image: '/blueJays1980s.jpg',
    hint: "First Division Title in Toronto",
    description: "1985 Toronto Blue Jays",
    funFact: "The '85 Blue Jays captured their first AL East title with a franchise-record 99 wins. Led by Dave Stieb's pitching (14-13, 2.48 ERA) and Jesse Barfield's 27 home runs, they became the first team outside the United States to reach the playoffs."
  },
  {
    id: 24,
    year: 1957,
    image: '/hank.jpg',
    hint: "The Braves' Big Three",
    description: "Aaron, Mathews and Adcock before World Series",
    funFact: "Photographed before Game 1 of the '57 Series, the Braves' power trio would help Milwaukee defeat the Yankees. Hank Aaron dominated the Series with a .393 average, 3 home runs, and 7 RBI, leading the Braves to their first championship since 1914."
  },
  {
    id: 25,
    year: 1917,
    image: '/ernieShore.jpg',
    hint: "The Most Unusual Perfect Game",
    description: "Ernie Shore's Relief Perfect Game",
    funFact: "On June 23, 1917, Babe Ruth started for the Red Sox and walked Ray Morgan to lead off the game. After arguing balls and strikes, Ruth told umpire Brick Owens 'If you chase me, I'll punch your face.' When ejected, Ruth made good on his threat, hitting Owens behind the ear. Ernie Shore came in, Morgan was caught stealing, and Shore retired all 26 batters he faced in a 4-0 win. Ruth got a 10-game suspension.",
    source: "https://baseballhall.org/discover/babe-ruth-made-history-with-help-from-ernie-shore"
  },
  {
    id: 26,
    year: 1947,
    image: '/ted.jpg',
    hint: "The Greatest Hitter Who Ever Lived",
    description: "Ted Williams at Fenway Park",
    funFact: "Ted Williams was a fighter pilot in both WWII and Korea, missing nearly 5 full seasons in his prime. Despite this, he still hit .344 lifetime and was the last player to hit .400. He also refused to tip his cap to fans for 24 years, until his final at-bat homer in 1960."
  },
  {
    id: 27,
    year: 1975,
    image: '/fisk2.jpg',
    hint: "Stay Fair!",
    description: "Carlton Fisk's Famous Wave",
    funFact: "The iconic image of Fisk waving his Game 6 homer fair only exists because the cameraman was distracted by a rat. He was supposed to follow the ball but got startled and kept the camera on Fisk instead, creating one of baseball's most memorable moments."
  },
  {
    id: 28,
    year: 1909,
    image: '/tycobb1909.jpg',
    hint: "The Georgia Peach's Triple Crown Season",
    description: "Ty Cobb with the Detroit Tigers",
    funFact: "In 1909, Ty Cobb won the Triple Crown while wearing specially modified baseball spikes that were extra sharp - a tactic that terrified infielders. He would often file his spikes before games and raise his leg while sliding to intimidate defenders. When asked about his aggressive style, Cobb famously said, 'I had to fight all my life to survive. They were all against me... but I beat the bastards and left them in the ditch.'"
  },
  {
    id: 29,
    year: 1912,
    image: '/1912.jpg',
    hint: "Opening Day at Baseball's New Cathedral",
    description: "First Game at Fenway Park",
    funFact: "When Fenway Park opened in 1912, the Red Sox owner didn't invite Boston's mayor to throw out the first pitch - because he was a Yankees fan! The park's first game was actually delayed two days due to rain, and many seats were still being nailed down just hours before the first pitch. The left field wall wouldn't be painted green until 1947, and the term 'Green Monster' wouldn't be coined until the 1960s."
  },
  {
    id: 30,
    year: 1927,
    image: '/BabeLou.jpg',
    hint: "Murderers' Row",
    description: "Babe Ruth and Lou Gehrig",
    funFact: "Despite being baseball's most famous duo, Ruth and Gehrig had a complex relationship. They went on a 21-game barnstorming tour together in 1927, splitting $80,000, but didn't speak for much of it. Ruth loved staying up late, drinking, and carousing, while Gehrig preferred reading and going to bed early. During the tour, they took separate cars to games and stayed in different hotels. Still, they combined for 107 home runs that season, with Ruth hitting 60 and Gehrig 47."
  },
  {
    id: 31,
    year: 1984,
    image: '/1984AS.jpg',
    hint: "All-Star Game's First Home Run Derby",
    description: "MLB's Inaugural Home Run Derby",
    funFact: "The first official MLB Home Run Derby was held at San Francisco's Candlestick Park in 1984, but the event was nearly cancelled due to the stadium's notorious winds. Dave Parker won with a modest total of 6 home runs - a far cry from today's totals. The real drama came when Reggie Jackson hit a ball that got stuck in the right field foul pole screen, leading to a 10-minute debate about whether it counted as a homer. It didn't, and Reggie wasn't happy about it!"
  },
  {
    id: 32,
    year: 1987,
    image: '/1987.jpg',
    hint: "The Homer Hanky Year",
    description: "Minnesota Twins World Series Victory",
    funFact: "The Homer Hanky was accidentally invented when a Minneapolis Star Tribune marketing manager misheard 'homer hankies' as 'homer honkies' in a meeting. The paper initially ordered 100,000 hankies for the 1987 playoffs, but they sold out in hours. The Metrodome's ventilation system had to be adjusted because 55,000 fans waving hankies was actually affecting fly balls! By the World Series, the hankies were so popular that Cardinals manager Whitey Herzog tried (unsuccessfully) to get them banned, claiming they distracted his players."
  },
  {
    id: 33,
    year: 1988,
    image: '/1988.jpg',
    hint: "The Impossible Has Happened!",
    description: "Kirk Gibson's World Series Homer",
    funFact: "Kirk Gibson was so injured before his famous World Series homer that he was icing both legs in the clubhouse and didn't even put on his uniform until the 8th inning. When Tommy Lasorda asked if he could pinch hit, Gibson reportedly said, 'Hit? I can't even walk!' The bat he used was accidentally discovered in a storage room at Dodger Stadium in 2010 - it had been mislabeled and forgotten for 22 years."
  },
  {
    id: 34,
    year: 1908,
    image: '/cubsMascot.jpg',
    hint: "The Cubs' Nightmare-Inducing Mascot",
    description: "The Cubs' Terrifying Bear Mascot",
    funFact: "This haunting photo was taken on July 10, 1908, before a Cubs-Phillies game at Chicago's West Side Park. The man in the bear suit was actually an understudy for Arthur Hill, a famed British 'animal impersonator' who played the Cowardly Lion in the original 1902 stage production of 'The Wizard of Oz.' With temperatures reaching 88° that day, the poor understudy sat in the heavy costume for two hours, only able to cool himself by pulling a string to open the bear's mouth. After the Cubs won in 11 innings, he celebrated by 'doing a bit of capering in the manner of polar bears released from captivity.' Read More: https://www.toddradom.com/blog/2018/2/28/the-story-behind-the-chicago-cubs-nightmare-inducing-bear-mascot-of-1908"
  },
  {
    id: 35,
    year: 1947,
    image: '/pageFence.jpg',
    hint: "Satchel's Famous Warm-Up Routine",
    description: "Satchel Paige's Pre-Game Show",
    funFact: "Satchel Paige was famous for his pre-game warmup routine where he'd set up a wooden matchbox as a target and throw pitch after pitch over it. He'd tell his fielders to sit down in the outfield while he pitched, saying 'I don't need fielders for this one.' He named his pitches things like 'The Bee Ball' (it be where I want it to be), 'The Jump Ball,' 'The Whipsy-Dipsy-Do,' and 'The Hesitation Pitch' - which was so effective it was later banned by MLB."
  },
  {
    id: 36,
    year: 1914,
    image: '/ruthBostonPitching.jpg',
    hint: "The Sultan of Swat's Pitching Days",
    description: "Babe Ruth with the Boston Red Sox",
    funFact: "Before he was baseball's home run king, Babe Ruth was one of the best left-handed pitchers in baseball. In 1914, his rookie year, the Red Sox signed him for just $600. His teammates nicknamed him 'Babe' because he was so naive and childlike - he'd never eaten a proper meal, used proper table manners, or worn a suit before joining the team. The team had to assign an older player to be his chaperone and teach him basic life skills!"
  },
  {
    id: 37,
    year: 1951,
    image: '/1951.jpg',
    hint: "The Shot Heard 'Round the World",
    description: "Bobby Thomson's Pennant-Winning Homer",
    funFact: "When Bobby Thomson hit the 'Shot Heard 'Round the World' to win the 1951 pennant, the Giants' radio announcer Russ Hodges screamed 'The Giants win the pennant!' so many times that he became hoarse and nearly fainted. Amazingly, the only known full recording of his famous call exists because a Brooklyn Dodgers fan, distraught at his team's loss, had recorded the game on his new Webcor tape recorder to preserve what he thought would be a Dodgers victory!"
  },
  {
    id: 38,
    year: 1957,
    image: '/1957.jpg',
    hint: "The Hammer's First Championship",
    description: "Hank Aaron and the Milwaukee Braves",
    funFact: "In 1957, Hank Aaron led the Milwaukee Braves to their only World Series title by hitting .393 and outdueling Mickey Mantle's Yankees. What many don't know is that Aaron played the entire Series with a broken thumb that he kept secret from everyone except the team trainer. He'd ice it between innings and stuff his glove with extra padding. When asked years later how he did it, Aaron simply said, 'The World Series only comes around so often - you play through it.'"
  },
  {
    id: 39,
    year: 1939,
    image: '/lou.jpg',
    hint: "The Iron Horse's Farewell",
    description: "Lou Gehrig's Farewell Speech at Yankee Stadium",
    funFact: "On July 4, 1939, Lou Gehrig delivered his famous 'Luckiest Man' speech at Yankee Stadium. What many don't know is that Gehrig initially didn't want to speak at all. He had to be convinced by his wife Eleanor and team officials. When he finally agreed, he spoke without any written notes, from the heart. The Yankees' bat boy that day had the presence of mind to record the speech on a home movie camera, giving us the only known footage of this historic moment. The original speech lasted about 6 minutes, but only about 1 minute of footage survives today."
  },
  {
    id: 39,
    year: 1911,
    image: '/1911.jpg',
    hint: "The First Unofficial All-Star Game",
    description: "Baseball's First All-Star Gathering",
    funFact: "In 1911, Cleveland's Addie Joss died tragically of tubercular meningitis at age 31. To support his family, baseball organized what is considered the first all-star game - a benefit featuring Ty Cobb, Walter Johnson, Cy Young, and other stars. The game raised $12,914 (over $375,000 today) for Joss's family. The pitching matchup was legendary: Walter Johnson vs. Ed Walsh, with Johnson striking out 8 in 5 scoreless innings."
  },
  {
    id: 4,
    year: 1991,
    image: '/1991.jpg',
    hint: "World Series Collision",
    description: "World Series Collision",
    funFact: "This image shows a dramatic moment between Lonnie Smith (runner) and Brian Harper (catcher) during the 1991 World Series between the Atlanta Braves and the Minnesota Twins. The 1991 World Series, often dubbed the Greatest World Series Ever Played, featured a record four games decided by a single run, with three of them going into extra innings. The Minnesota Twins won Game 7 in a nail-biting 1-0 victory, clinching the championship in one of the most intense pitching duels in MLB history! The play in the image exemplifies the grit and intensity that defined this iconic series."
  }
];

const ACHIEVEMENTS = {
  FIRST_HIT: { id: 'FIRST_HIT', name: 'Rookie of the Year', description: 'Get your first perfect guess', icon: Star },
  STREAK_3: { id: 'STREAK_3', name: 'Triple Play', description: '3 perfect guesses in a row', icon: Trophy },
  SPEED_DEMON: { id: 'SPEED_DEMON', name: 'Speed Demon', description: 'Perfect guess under 10 seconds', icon: TimerIcon },
  POWER_HITTER: { id: 'POWER_HITTER', name: 'Power Hitter', description: 'Score over 1000 points', icon: Award },
  NO_STRIKES: { id: 'NO_STRIKES', name: 'Perfect Game', description: 'Complete a round with no outs', icon: Medal },
  GOOSE_EGG: { id: 'GOOSE_EGG', name: 'Goose Egg', description: 'Zero points? Maybe try cricket instead...', icon: X }
};

const SOUND_EFFECTS = {
  homeRun: new Audio('/sounds/HR.wav'),
  hit: new Audio('/sounds/hit.mp3'),
  out: new Audio('/sounds/out.wav'),
  achievement: new Audio('/sounds/achievement.wav'),
  sliderTick: new Audio('/sounds/tick2.wav')
};

// Set volume for all sound effects
Object.values(SOUND_EFFECTS).forEach(sound => {
  if (sound === SOUND_EFFECTS.homeRun) {
    sound.volume = 0.4; // 40% volume for home run sound
  } else if (sound === SOUND_EFFECTS.sliderTick) {
    sound.volume = 0.2; // 20% volume for slider tick
  } else {
    sound.volume = 0.2; // 20% volume for other sounds
  }
});

// Xorshift for deterministic random number generation
function xorshift(seed) {
  let state = seed;
  
  return function() {
    state ^= state << 13;
    state ^= state >> 17;
    state ^= state << 5;
    return Math.abs(state);
  };
}

function getDailyMoment(index = 0) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Create a seed based on the year and day of year
  const yearDay = `${today.getFullYear()}${Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24))}`;
  const seed = parseInt(yearDay);
  
  // Initialize our random number generator with today's seed
  const rng = xorshift(seed);
  
  // Create a shuffled array of indices
  const indices = Array.from({ length: BASEBALL_MOMENTS.length }, (_, i) => i);
  
  // Fisher-Yates shuffle with our seeded RNG
  for (let i = indices.length - 1; i > 0; i--) {
    const j = rng() % (i + 1);
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  
  // Use the first three indices for today's moments
  return BASEBALL_MOMENTS[indices[index]];
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


function YearDigit({ digit, index, onIncrement }) {
  return (
    <div 
      className="w-14 h-[68px] bg-white border-2 border-gray-300 rounded flex items-center justify-center text-4xl font-mono text-blue-900 shadow-lg mx-1 cursor-pointer active:bg-gray-100 select-none"
      style={{ fontFamily: 'Douglas-Burlington-Regular' }}
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
  const allMoments = getAllDailyMoments();
  const [selectedMoment, setSelectedMoment] = useState(currentMoment);
  const correctGuesses = allMoments.filter(moment => 
    collectedMoments.includes(moment.id)
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
                     `Mode: ${gameMode === 'classic' ? 'Classic' : 'Trivia'}\n` +
                     `\nPlay at: https://baseballtimemachine.netlify.app/`;

    // Social sharing URLs
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://baseballtimemachine.netlify.app/')}&quote=${encodeURIComponent(shareText)}`;

    // Create share menu
    const shareMenu = document.createElement('div');
    shareMenu.className = 'fixed inset-0 bg-black/80 z-50 flex items-center justify-center';
    shareMenu.innerHTML = `
      <div class="bg-gray-800 p-6 rounded-lg max-w-sm w-full mx-4 space-y-4 relative">
        <button class="absolute top-2 right-2 text-gray-400 hover:text-white" onclick="this.parentElement.parentElement.remove()">
          ✕
        </button>
        <h3 class="text-white text-xl mb-4" style="font-family: Douglas-Burlington-Regular">Share Your Results</h3>
        <div class="space-y-3">
          <a href="${twitterUrl}" target="_blank" class="flex items-center gap-2 bg-[#1DA1F2] text-white p-3 rounded-lg hover:bg-[#1a8cd8] transition-colors w-full justify-center">
            Share on Twitter
          </a>
          <a href="${facebookUrl}" target="_blank" class="flex items-center gap-2 bg-[#4267B2] text-white p-3 rounded-lg hover:bg-[#365899] transition-colors w-full justify-center">
            Share on Facebook
          </a>
          <button onclick="navigator.clipboard.writeText('${shareText}').then(() => { this.textContent = 'Copied!'; setTimeout(() => { this.textContent = 'Copy to Clipboard'; }, 2000); })" class="w-full bg-gray-700 text-white p-3 rounded-lg hover:bg-gray-600 transition-colors">
            Copy to Clipboard
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(shareMenu);
  }

  return (
    <div 
      className="min-h-screen w-full overflow-hidden" 
      style={{ 
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.95) 70%), url('/bg.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'black'
      }}>
      <div className="text-center p-4 sm:p-6 max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <img  
            src="/LOGO.png"
            className="game-over-logo w-full max-w-[944px] sm:max-w-[840px] md:max-w-[1050px] mx-auto px-1 sm:px-2 md:px-0"
            alt="The Daily Baseball Photo Trivia Game" 
          />
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Left Column - Score and Share */}
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
                {typeof score === 'number' ? score : 0} points
              </div>
              <div className="text-xl text-[#f5f2e6] mb-6">
                {gameMode === 'classic' ? (
                  `You got ${correctGuesses} perfect ${correctGuesses === 1 ? 'guess' : 'guesses'}!`
                ) : (
                  'Thanks for playing Trivia Mode!'
                )}
              </div>
              
              {/* Share Button */}
              <button
                onClick={handleShare}
                className="w-full bg-[#1e4fba] hover:bg-[#2460e6] text-white py-3 rounded-lg text-xl transition-all duration-300 ease-in-out shadow-md hover:shadow-lg mb-4"
                style={{ fontFamily: 'Douglas-Burlington-Regular' }}
              >
                Share Results
              </button>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 mb-4">
                <button
                  onClick={onShowCollection}
                  className="w-full bg-[#f5f2e6] hover:bg-[#e5e2d6] text-[#1e4fba] py-3 rounded-lg text-xl transition-all duration-300 ease-in-out shadow-md hover:shadow-lg active:bg-[#d5d2c6] flex items-center justify-center gap-2"
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
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5h3.5"/>
                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5h-3.5"/>
                    <path d="M4 22h16"/>
                    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
                  </svg>
                  My Career Stats
                </button>
              </div>

              {/* Mode Indicator */}
              <div className="text-center mt-4 text-gray-400">
                Played in {gameMode === 'classic' ? 'Classic' : 'Trivia'} Mode
              </div>
            </div>
          </div>

          {/* Right Column - Today's Moments */}
          <div 
            className="bg-gray-800/90 p-6 rounded-lg border border-gray-700 relative overflow-hidden"
            style={{
              minHeight: '300px'
            }}
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `url(${allMoments[0].image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(3px)'
              }}
            />
            
            {/* Content */}
            <div className="relative z-10">
              <h3 
                className="text-2xl text-[#f5f2e6] mb-4"
                style={{ fontFamily: 'Douglas-Burlington-Regular' }}
              >
                {gameMode === 'classic' ? "Today's Moments" : "Today's Moment"}
              </h3>

              <div className="grid grid-cols-1 gap-4">
                {allMoments.slice(0, gameMode === 'classic' ? 3 : 1).map((moment, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-lg ${
                      collectedMoments.includes(moment.id) 
                        ? 'bg-green-900/20 border border-green-500/30' 
                        : 'bg-gray-900/50 border border-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <img 
                        src={moment.image} 
                        alt={moment.description}
                        className="w-24 h-24 object-cover rounded"
                      />
                      <div className="text-left">
                        <div className="text-[#f5f2e6] mb-1">{moment.description}</div>
                        <div className="text-gray-400 text-sm">{moment.year}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          {/* Achievements Section */}
          {achievements.length > 0 && (
            <div className="bg-gray-800/90 rounded-lg p-6 border border-gray-700 mt-8 max-w-2xl mx-auto w-full">
              <h3 
                className="text-2xl text-[#f5f2e6] mb-4"
                style={{ fontFamily: 'Douglas-Burlington-Regular' }}
              >
                <span className="text-yellow-400">Boom!</span> Achievements Unlocked!
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {achievements.map((achievementId) => {
                  const achievement = ACHIEVEMENTS[achievementId];
                  if (!achievement) return null;
                  const Icon = achievement.icon;
                  return (
                    <div 
                      key={achievementId}
                      className="flex items-center gap-3 bg-gray-900/50 p-3 rounded-lg border border-gray-700"
                    >
                      <div className="bg-[#1e4fba] p-2 rounded-lg">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-[#f5f2e6]">{achievement.name}</div>
                        <div className="text-gray-400 text-sm">{achievement.description}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          {/* Books Section */}
          <div className="bg-gray-800/90 rounded-lg p-6 border border-gray-700 mt-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-6">
              <img 
                src="/books/BOOKSTACK.png" 
                alt="Stack of Baseball Books" 
                className="w-32 h-auto"
              />
              <div className="text-left">
                <h3 
                  className="text-2xl text-[#f5f2e6] mb-2"
                  style={{ fontFamily: 'Douglas-Burlington-Regular' }}
                >
                  Essential Baseball Reading
                </h3>
                <p className="text-gray-300 mb-4">
                  Discover our curated collection of must-read baseball history books.
                </p>
                <button
                  onClick={onShowBooks}
                  className="bg-[#1e4fba] hover:bg-[#2460e6] text-white px-6 py-2 rounded-lg transition-all duration-300 ease-in-out shadow-md hover:shadow-lg text-xl"
                  style={{ fontFamily: 'Douglas-Burlington-Regular' }}
                >
                  View Recommended Books
                </button>
              </div>
            </div>
          </div>

          {/* Beta Test Button */}
          <div className="mt-2 text-center">
            <button
              onClick={onRestart}
              className="text-gray-400 hover:text-gray-300 text-sm bg-gray-800/50 hover:bg-gray-800/70 px-4 py-2 rounded transition-all duration-200"
            >
              Beta Test: Play Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Collection({ onClose, collectedMoments, gameMode }) {
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
                  <div className="text-2xl mb-1" style={{ fontFamily: 'Douglas-Burlington-Regular' }}>{careerStats.gamesPlayed}</div>
                  <div className="text-[#f5f2e6]/50 text-lg">Games Played</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-1" style={{ fontFamily: 'Douglas-Burlington-Regular' }}>{careerStats.streak}</div>
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
            Home Run Trophy Case ({discoveredMoments.length})
          </h2>
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-300 absolute top-4 right-4"
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

// Add trivia questions for each baseball moment
const TRIVIA_QUESTIONS = {
  1: [ // Satchel in Bismarck
    {
      question: "In what year did Satchel Paige play for the Bismarck team?",
      options: ["1934", "1935", "1936", "1937"],
      correctAnswer: "1935"
    },
    {
      question: "Who was the player-manager of the Bismarck team?",
      options: ["Satchel Paige", "Neil Churchill", "Moose Johnson", "Jackie Robinson"],
      correctAnswer: "Neil Churchill"
    }
  ],
  2: [ // Mickey Mantle's rookie season
    {
      question: "How many World Series home runs did Mickey Mantle hit in his career?",
      options: ["5", "10", "15", "18"],
      correctAnswer: "18"
    },
    {
      question: "What was Mickey Mantle's career batting average in World Series games?",
      options: [".275", ".295", ".305", ".315"],
      correctAnswer: ".305"
    }
  ],
  7: [ // Roger Maris
    {
      question: "How many home runs did Maris hit to break Babe Ruth's record?",
      options: ["59", "60", "61", "62"],
      correctAnswer: "61"
    },
    {
      question: "In what year was the asterisk next to Maris's record officially removed?",
      options: ["1985", "1988", "1991", "1995"],
      correctAnswer: "1991"
    }
  ],
  12: [ // Kirby Puckett
    {
      question: "How many hits did Puckett get in his MLB debut?",
      options: ["2", "3", "4", "5"],
      correctAnswer: "4"
    },
    {
      question: "How many World Series championships did Puckett win with the Twins?",
      options: ["1", "2", "3", "4"],
      correctAnswer: "2"
    }
  ],
  19: [ // Babe Ruth Knocked Out
    {
      question: "How long was Babe Ruth unconscious after hitting the wall?",
      options: ["2 minutes", "5 minutes", "7 minutes", "10 minutes"],
      correctAnswer: "5 minutes"
    },
    {
      question: "What did Ruth do in his next at-bat after the collision?",
      options: ["Struck out", "Hit a single", "Hit a double", "Hit a home run"],
      correctAnswer: "Hit a double"
    }
  ],
  20: [ // 1969 Mets Pitching Staff
    {
      question: "What was the team's nickname during their miraculous 1969 season?",
      options: ["Amazing Mets", "Miracle Mets", "Amazin' Mets", "Magnificent Mets"],
      correctAnswer: "Miracle Mets"
    },
    {
      question: "Who was the Mets' ace pitcher in 1969?",
      options: ["Nolan Ryan", "Jerry Koosman", "Tom Seaver", "Gary Gentry"],
      correctAnswer: "Tom Seaver"
    }
  ],
  21: [ // Satchel Paige and Bob Feller
    {
      question: "How old was Satchel Paige when he made his MLB debut with the Cleveland Indians?",
      options: ["32 years old", "38 years old", "42 years old", "45 years old"],
      correctAnswer: "42 years old"
    },
    {
      question: "What was Bob Feller's nickname?",
      options: ["Rapid Robert", "The Heater", "Bullet Bob", "Speed King"],
      correctAnswer: "Rapid Robert"
    }
  ],
  22: [ // Babe Ruth with Red Sox
    {
      question: "What was Babe Ruth's ERA during his six seasons as a Red Sox pitcher?",
      options: ["2.28", "2.98", "3.12", "3.45"],
      correctAnswer: "2.28"
    },
    {
      question: "How many World Series did Ruth win as a pitcher with the Red Sox?",
      options: ["1", "2", "3", "4"],
      correctAnswer: "3"
    }
  ],
  23: [ // 1985 Blue Jays
    {
      question: "Who was the Blue Jays' manager during their first division title in 1985?",
      options: ["Bobby Cox", "Cito Gaston", "Jimy Williams", "Roy Hartsfield"],
      correctAnswer: "Bobby Cox"
    },
    {
      question: "Which team did the Blue Jays beat to clinch the 1985 AL East title?",
      options: ["New York Yankees", "Boston Red Sox", "Detroit Tigers", "Baltimore Orioles"],
      correctAnswer: "New York Yankees"
    }
  ],
  27: [ // Carlton Fisk's Wave
    {
      question: "Why did the cameraman keep the camera on Fisk instead of following the ball?",
      options: ["He was distracted by a rat", "The camera malfunctioned", "He was told to", "He lost sight of the ball"],
      correctAnswer: "He was distracted by a rat"
    },
    {
      question: "Which World Series game featured Fisk's famous wave?",
      options: ["Game 5", "Game 6", "Game 7", "Game 4"],
      correctAnswer: "Game 6"
    }
  ],
  32: [ // 1987 Twins
    {
      question: "What caused the Metrodome's ventilation system to be adjusted?",
      options: ["55,000 fans waving Homer Hankies", "High humidity", "Power outage", "Air pressure issues"],
      correctAnswer: "55,000 fans waving Homer Hankies"
    },
    {
      question: "Which opposing manager tried to get the Homer Hankies banned?",
      options: ["Whitey Herzog", "Tommy Lasorda", "Sparky Anderson", "Dick Williams"],
      correctAnswer: "Whitey Herzog"
    }
  ],
  // Default questions for moments without specific trivia
  default: [
    {
      question: "What is considered the 'Dead Ball Era' in baseball history?",
      options: ["1900-1919", "1920-1939", "1940-1959", "1960-1979"],
      correctAnswer: "1900-1919"
    },
    {
      question: "When was the first World Series played?",
      options: ["1901", "1903", "1905", "1907"],
      correctAnswer: "1903"
    }
  ],
  3: [ // Johnny Evers
    {
      question: "What was Johnny Evers' nickname?",
      options: ["The Human Crab", "The Flash", "The Spider", "The Hawk"],
      correctAnswer: "The Human Crab"
    },
    {
      question: "In what year was Johnny Evers elected to the Hall of Fame?",
      options: ["1936", "1940", "1946", "1950"],
      correctAnswer: "1946"
    }
  ],
  6: [ // First All-Star Game
    {
      question: "Who hit the first home run in All-Star Game history?",
      options: ["Lou Gehrig", "Babe Ruth", "Jimmie Foxx", "Al Simmons"],
      correctAnswer: "Babe Ruth"
    },
    {
      question: "What was the final score of the first MLB All-Star Game?",
      options: ["AL 4-2", "AL 5-2", "NL 4-2", "NL 3-2"],
      correctAnswer: "AL 4-2"
    }
  ],
  8: [ // Jim Thorpe
    {
      question: "In which Olympic events did Jim Thorpe win gold medals in 1912?",
      options: ["Pentathlon and Decathlon", "100m and 200m", "Long Jump and High Jump", "Shot Put and Discus"],
      correctAnswer: "Pentathlon and Decathlon"
    },
    {
      question: "When were Jim Thorpe's Olympic medals posthumously restored?",
      options: ["1972", "1977", "1982", "1987"],
      correctAnswer: "1982"
    }
  ],
  17: [ // Willie Mays Rookie Season
    {
      question: "What was Willie Mays' batting average in his rookie season?",
      options: ["0.254", "0.264", "0.274", "0.284"],
      correctAnswer: "0.274"
    },
    {
      question: "How many home runs did Mays hit in his rookie season?",
      options: ["15", "20", "25", "30"],
      correctAnswer: "20"
    }
  ],
  25: [ // Ernie Shore's Relief Perfect Game
    {
      question: "What was Babe Ruth's punishment for punching the umpire?",
      options: ["5-game suspension", "10-game suspension", "15-game suspension", "20-game suspension"],
      correctAnswer: "10-game suspension"
    },
    {
      question: "What was the final score of Shore's relief perfect game?",
      options: ["1-0", "2-0", "3-0", "4-0"],
      correctAnswer: "4-0"
    }
  ],
  26: [ // Ted Williams
    {
      question: "What was Ted Williams' lifetime batting average?",
      options: ["0.334", "0.344", "0.354", "0.364"],
      correctAnswer: "0.344"
    },
    {
      question: "How many full seasons did Williams miss due to military service?",
      options: ["3", "4", "5", "6"],
      correctAnswer: "5"
    }
  ],
  30: [ // Babe Ruth and Lou Gehrig
    {
      question: "How many home runs did Ruth and Gehrig combine for in 1927?",
      options: ["97", "107", "117", "127"],
      correctAnswer: "107"
    },
    {
      question: "How much money did Ruth and Gehrig split on their 1927 barnstorming tour?",
      options: ["$40,000", "$60,000", "$80,000", "$100,000"],
      correctAnswer: "80,000"
    }
  ],
  34: [ // Cubs' Bear Mascot
    {
      question: "What was the temperature on the day this photo was taken?",
      options: ["78°", "83°", "88°", "93°"],
      correctAnswer: "88°"
    },
    {
      question: "What was the mascot performer's connection to 'The Wizard of Oz'?",
      options: ["Played the Lion", "Understudy for the Lion", "Played the Bear", "Directed the show"],
      correctAnswer: "Understudy for the Lion"
    }
  ],
  35: [ // Satchel Paige's Warm-Up
    {
      question: "Which of these was NOT one of Paige's named pitches?",
      options: ["The Bee Ball", "The Jump Ball", "The Whipsy-Dipsy-Do", "The Curve Ball"],
      correctAnswer: "The Curve Ball"
    },
    {
      question: "Which of Paige's pitches was later banned by MLB?",
      options: ["The Bee Ball", "The Jump Ball", "The Whipsy-Dipsy-Do", "The Hesitation Pitch"],
      correctAnswer: "The Hesitation Pitch"
    }
  ],
  39: [ // Lou Gehrig's Farewell
    {
      question: "How long was Gehrig's original farewell speech?",
      options: ["4 minutes", "6 minutes", "8 minutes", "10 minutes"],
      correctAnswer: "6 minutes"
    },
    {
      question: "Who recorded the only known footage of the speech?",
      options: ["A news reporter", "The team photographer", "The bat boy", "A fan"],
      correctAnswer: "The bat boy"
    }
  ],
  4: [ // 1991 World Series Collision
    {
      question: "Which players are involved in this collision at home plate?",
      options: ["Lonnie Smith and Brian Harper", "Terry Pendleton and Junior Ortiz", "Ron Gant and Greg Olson", "David Justice and Brian Harper"],
      correctAnswer: "Lonnie Smith and Brian Harper"
    },
    {
      question: "How many games in the 1991 World Series were decided by a single run?",
      options: ["Two", "Three", "Four", "Five"],
      correctAnswer: "Four"
    }
  ]
};

export default function BaseballTimeMachine() {
  const [gameMode, setGameMode] = useState(null);
  
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
    playSound('sliderTick');
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
      
      // Only award Perfect Game if all three images are collected and we're on the last image
      if (sequenceIndex === 2 && outs === 0 && !achievements.includes('NO_STRIKES') && collectedMoments.length === 3) {
        // Get today's moments
        const todaysMoments = [
          getDailyMoment(0).id,
          getDailyMoment(1).id,
          getDailyMoment(2).id
        ];
        
        // Check if all of today's moments are in the collection
        const hasAllTodaysMoments = todaysMoments.every(id => collectedMoments.includes(id));
        
        if (hasAllTodaysMoments) {
        newAchievements.push('NO_STRIKES');
        }
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

      setFeedbackData({
        result: feedbackResult,
        yearDifference: difference,
        points: points,
        image: currentMoment.image,
        funFact: currentMoment.funFact,
        isGameOver: sequenceIndex >= 2,
        isFoulBall: false,
        currentYear: currentMoment.year,
        trivia: gameMode === 'trivia' ? TRIVIA_QUESTIONS[currentMoment.id] || TRIVIA_QUESTIONS.default : null
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
        currentYear: currentMoment.year,
        trivia: gameMode === 'trivia' ? TRIVIA_QUESTIONS[currentMoment.id] || TRIVIA_QUESTIONS.default : null
      });
      setShowFeedback(true);
      return;
    }
  
    // Handle foul balls (within 10 years)
    const newStrikes = strikes + 1;
    
    // First or second strike - show foul ball overlay
    if (newStrikes < 3) {
      setStrikes(newStrikes);
      playSound('hit');
      setFeedbackData({
        yearDifference: difference,
        strikes: newStrikes,
        isFoulBall: true,
        currentYear: currentMoment.year,
        trivia: gameMode === 'trivia' ? TRIVIA_QUESTIONS[currentMoment.id] || TRIVIA_QUESTIONS.default : null
      });
      setShowFeedback(true);
      return;
    }
    
    // On third strike, determine if they get points
    setStrikes(0); // Reset strikes
    playSound('hit');
    
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
      const newOuts = outs + 1;
      setOuts(newOuts);
    }
    
    setFeedbackData({
      result: feedbackResult,
      yearDifference: difference,
      points: points,
      image: currentMoment.image,
      funFact: currentMoment.funFact,
      isGameOver: (outs + 1 >= 3) || (sequenceIndex >= 2),
      isFoulBall: false,
      currentYear: currentMoment.year,
      trivia: gameMode === 'trivia' ? TRIVIA_QUESTIONS[currentMoment.id] || TRIVIA_QUESTIONS.default : null
    });
    setShowFeedback(true);
    
    checkAchievements(false, timeTaken);
    setGuessStartTime(null);
    setIsTimerActive(false);
    setPreviousDifference(difference);
  }

  // Modify handleFeedbackNext to handle trivia mode
  function handleFeedbackNext(additionalPoints = 0) {
    setShowFeedback(false);
    
    if (typeof additionalPoints === 'number' && additionalPoints > 0) {
      setScore(prev => (typeof prev === 'number' ? prev : 0) + additionalPoints);
    }
    
    // If we have 3 outs or it's the last image in either mode AND it's not a foul ball, go to game over
    if ((outs >= 3) || 
        (gameMode === 'trivia' && sequenceIndex === 0 && !feedbackData.isFoulBall) || 
        (gameMode === 'classic' && sequenceIndex === 2 && !feedbackData.isFoulBall)) {
      updateCareerStats();
      setGameState('over');
      return;
    }
    
    // Reset for next guess if it was a foul ball
    if (feedbackData.isFoulBall) {
      setYear(1950);
      setTime(30);
      setIsTimerActive(false);
      setGuessStartTime(null);
      return;
    }
    
    // In classic mode, continue to next image if available and not a foul ball
    if (gameMode === 'classic' && sequenceIndex < 2 && !feedbackData.isFoulBall) {
      const nextIndex = sequenceIndex + 1;
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
        }, 300);
      }, 300);
    }
  }

  function updateCareerStats() {
    const savedStats = JSON.parse(localStorage.getItem('baseball-career-stats') || JSON.stringify({
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

    // Check if streak should continue or reset
    let newStreak = 0;
    const today = new Date();
    const lastPlayed = savedStats.lastPlayed ? new Date(savedStats.lastPlayed) : null;
    
    if (lastPlayed) {
      today.setHours(0, 0, 0, 0);
      lastPlayed.setHours(0, 0, 0, 0);
      
      const diffTime = Math.abs(today - lastPlayed);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        newStreak = savedStats.streak + 1;
      } else if (diffDays === 0) {
        newStreak = savedStats.streak;
      }
    } else {
      newStreak = 1;
    }

    // Get today's moments
    const todaysMoments = gameMode === 'classic' ? [
      getDailyMoment(0).id,
      getDailyMoment(1).id,
      getDailyMoment(2).id
    ] : [getDailyMoment(0).id];
    
    // Count perfect guesses from today's game
    const perfectGuessesThisGame = todaysMoments.filter(id => 
      collectedMoments.includes(id)
    ).length;

    // Only track hits for classic mode
    let singlesThisGame = 0;
    let doublesThisGame = 0;
    let triplesThisGame = 0;

    if (gameMode === 'classic' && feedbackData) {
      const result = feedbackData.result;
      if (result === "SINGLE!") singlesThisGame++;
      if (result === "DOUBLE!") doublesThisGame++;
      if (result === "TRIPLE!") triplesThisGame++;
    }

    // Ensure all numbers are properly typed
    const currentScore = typeof score === 'number' ? score : 0;
    const previousTotal = typeof savedStats.totalPoints === 'number' ? savedStats.totalPoints : 0;

    // Update career stats
    const updatedStats = {
      totalPoints: previousTotal + currentScore,
      perfectGuesses: (savedStats.perfectGuesses || 0) + perfectGuessesThisGame,
      gamesPlayed: (savedStats.gamesPlayed || 0) + 1,
      achievements: [...new Set([...savedStats.achievements, ...achievements])],
      singles: gameMode === 'classic' ? (savedStats.singles || 0) + singlesThisGame : (savedStats.singles || 0),
      doubles: gameMode === 'classic' ? (savedStats.doubles || 0) + doublesThisGame : (savedStats.doubles || 0),
      triples: gameMode === 'classic' ? (savedStats.triples || 0) + triplesThisGame : (savedStats.triples || 0),
      streak: newStreak,
      lastPlayed: today.toISOString()
    };

    localStorage.setItem('baseball-career-stats', JSON.stringify(updatedStats));
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
    setShowFeedback(false);
    setFeedbackData(null);
    setImageOpacity(1);
  }

  function handleStagingReset() {
    // Clear all localStorage data
    localStorage.removeItem(getTodayKey());
    localStorage.removeItem('baseball-collection');
    localStorage.removeItem('baseball-muted');
    localStorage.removeItem('baseball-game-mode');
    localStorage.removeItem('baseball-career-stats');
    
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
    setGameMode(null); // Reset game mode selection
  }

  // Function to preview tomorrow's puzzle
  function handlePreviewTomorrow() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Reset game state
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
    
    // Override the current date for getDailyMoment
    const originalDate = new Date();
    Date = class extends Date {
      constructor() {
        super();
        return tomorrow;
      }
    };
    
    // Get tomorrow's moment
    setCurrentMoment(getDailyMoment(0));
    
    // Restore the original Date
    Date = originalDate.constructor;
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

  useEffect(() => {
    if (gameMode) {
      localStorage.setItem('baseball-game-mode', gameMode);
    }
    // Clear game mode when component unmounts
    return () => {
      localStorage.removeItem('baseball-game-mode');
    };
  }, [gameMode]);

  const handleModeSelect = (mode) => {
    if (mode === 'reset') {
      handleStagingReset();
      return;
    }
    
    // Set the game mode first
    setGameMode(mode);
    
    // Initialize the first moment
    const firstMoment = getDailyMoment(0);
    setCurrentMoment(firstMoment);
    
    // Initialize game state
    setGameState('playing');
    setYear(1950);
    setOuts(0);
    setStrikes(0);
    setScore(0);
    setFeedback('');
    setPerfectStreak(0);
    setAchievements([]);
    setTime(30);
    setIsTimerActive(false);
    setGuessStartTime(null);
    setSequenceIndex(0);
    setImageOpacity(1);
    setShowFeedback(false);
    setFeedbackData(null);
    
    // Clear any existing collection for today's game
    const todaysMoments = mode === 'classic' ? [
      getDailyMoment(0).id,
      getDailyMoment(1).id,
      getDailyMoment(2).id
    ] : [getDailyMoment(0).id];
    
    setCollectedMoments(prev => prev.filter(id => !todaysMoments.includes(id)));
  };

  // If no mode selected, show mode selection screen
  if (!gameMode) {
    return <GameModeSelect onSelectMode={handleModeSelect} />;
  }

  // Game Over screen
  if (gameState === 'over') {
    return (
      <GameOver 
        score={score}
        achievements={achievements}
        onRestart={handleRestart}
        currentMoment={currentMoment}
        onShowCollection={() => {
          setShowCollection(true);
          setGameState('playing');
        }}
        onShowBooks={() => {
          setShowBooks(true);
          setGameState('playing');
        }}
        collectedMoments={collectedMoments}
        setAchievements={setAchievements}
        gameMode={gameMode}
      />
    );
  }

  const yearDigits = year.toString().padStart(4, '0').split('');

  // Main game screen
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
      <div className="text-center p-4 sm:p-8 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <img  
            src="/LOGO.png"
            className="w-full max-w-[472px] sm:max-w-[420px] md:max-w-[525px] mx-auto px-1 sm:px-2 md:px-0"
            alt="The Daily Baseball Photo Trivia Game" 
          />
        </div>

        <Card className="bg-transparent border-none">
          <CardContent className="p-1 sm:p-2">
            {/* Image */}
            <div className="relative mx-0 sm:mx-2 mb-2 sm:mb-4">
              <div 
                className="relative"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                {/* Single background layer */}
                <div 
                  className="absolute hidden sm:block"
                  style={{
                    backgroundImage: 'url(/bgfade%20Medium.png)',
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    width: '100%',
                    height: '100%',
                    top: '10px',
                    left: '-20px',
                    zIndex: -1,
                    transform: 'rotate(-3deg)',
                    opacity: 0.8
                  }}
                />
                
                {/* Main image container */}
                <div 
                  className="relative bg-[#f5f2e6] p-2 sm:p-4 w-full sm:w-auto"
                  style={{
                    zIndex: 2,
                    boxShadow: '10px 6px 12px rgba(0, 0, 0, 0.9)',
                    maxWidth: '100%',
                    margin: '0'
                  }}
                >
                  <div
                    className="transition-opacity duration-300 ease-in-out relative"
                    style={{ opacity: imageOpacity }}
                  >
                    <img
                      src={currentMoment.image}
                      alt={currentMoment.description}
                      className="w-full h-auto object-contain max-h-[600px] sm:max-h-[500px]"
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
                  </div>
                </div>
              </div>
            </div>

            {/* Stats and How To Play row with Year */}
            <div className="hidden md:flex justify-between items-start -mb-8">
              <div className="space-y-2 relative z-10 pointer-events-auto">
                <button
                  onClick={() => setShowHowToPlay(true)}
                  className="text-[#f5f2e6]/50 hover:text-[#f5f2e6] text-[0.9375rem] transition-colors duration-200 bg-[#f5f2e6]/5 px-3 py-1 rounded block"
                  style={{ fontFamily: 'Douglas-Burlington-Regular' }}
                >
                  HOW TO PLAY
                </button>
              </div>
              <div 
                className="text-[#f5f2e6]/70 text-[0.9375rem] space-y-1 text-right"
                style={{ fontFamily: 'Douglas-Burlington-Regular' }}
              >
                {gameMode === 'classic' && <div><span className="text-[#f5f2e6]/45">Image:</span> {sequenceIndex + 1} of 3</div>}
                <div><span className="text-[#f5f2e6]/45">Strikes:</span> {strikes}</div>
                <div><span className="text-[#f5f2e6]/45">Outs:</span> {outs}</div>
              </div>
            </div>

            {/* Mobile Stats Display */}
            <div className="flex justify-between items-center mb-4 md:hidden px-2 py-2 border border-[#f5f2e6]/10 rounded-lg mx-1">
              {gameMode === 'classic' && (
                <div 
                  className="text-[#f5f2e6]/70 text-base"
                  style={{ fontFamily: 'Douglas-Burlington-Regular' }}
                >
                  <span className="text-[#f5f2e6]/45">Image:</span> {sequenceIndex + 1}/3
                </div>
              )}
              <div 
                className="text-[#f5f2e6]/70 text-base"
                style={{ fontFamily: 'Douglas-Burlington-Regular' }}
              >
                <span className="text-[#f5f2e6]/45">Strikes:</span> {strikes}
              </div>
              <div 
                className="text-[#f5f2e6]/70 text-base"
                style={{ fontFamily: 'Douglas-Burlington-Regular' }}
              >
                <span className="text-[#f5f2e6]/45">Outs:</span> {outs}
              </div>
            </div>

            <div className={`space-y-4 md:-mt-12 ${gameMode === 'trivia' ? 'mt-8' : ''}`}>
              <div className="relative">
                <div className="flex justify-center">
                  {yearDigits.map((digit, index) => (
                    <YearDigit 
                      key={index} 
                      digit={digit} 
                      index={index}
                      onIncrement={handleYearDigitIncrement}
                    />
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600 px-2 mb-1">
                  <span>1850</span>
                  <span>2025</span>
                </div>
                <div className="-mt-2">
                  <input
                    type="range"
                    min="1850"
                    max="2025"
                    value={year}
                    onChange={handleYearChange}
                    className="w-full h-3 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
              
              <button
                onClick={handleGuess}
                disabled={showFeedback || imageOpacity < 1}
                className={`w-full mb-4 bg-[#1e4fba] hover:bg-[#2460e6] text-white py-4 rounded-lg text-2xl transition-all duration-300 ease-in-out shadow-md hover:shadow-lg active:bg-[#1a3f8c] ${(showFeedback || imageOpacity < 1) ? 'opacity-50 cursor-not-allowed' : ''}`}
                style={{ fontFamily: 'Douglas-Burlington-Regular' }}
              >
                TAKE A SWING
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Overlays */}
      {showCollection && (
        <Collection 
          onClose={() => setShowCollection(false)} 
          collectedMoments={collectedMoments}
          gameMode={gameMode}
        />
      )}
      {showHowToPlay && (
        <HowToPlay onClose={() => setShowHowToPlay(false)} />
      )}
      {showFeedback && feedbackData && (
        gameMode === 'trivia' && !feedbackData.isFoulBall ? (
          <TriviaFeedback
            {...feedbackData}
            trivia={TRIVIA_QUESTIONS[currentMoment.id] || TRIVIA_QUESTIONS.default}
            onComplete={handleFeedbackNext}
          />
        ) : (
          <FeedbackOverlay
            {...feedbackData}
            onNext={handleFeedbackNext}
          />
        )
      )}
      {showZoom && (
        <ImageZoom
          image={currentMoment.image}
          description={currentMoment.description}
          onClose={() => setShowZoom(false)}
        />
      )}
      {showFeedbackForm && (
        <FeedbackForm onClose={() => setShowFeedbackForm(false)} />
      )}
      {showBooks && (
        <Books onClose={() => setShowBooks(false)} />
      )}

      {/* Footer Buttons */}
      <div className="fixed bottom-2 right-2 flex gap-2">
        <button
          onClick={() => setGameMode(null)}
          className="bg-gray-600/30 hover:bg-gray-600/50 text-white/50 hover:text-white/80 px-3 py-1 rounded text-xs transition-all duration-200"
        >
          Switch Game Mode
        </button>
        <button
          onClick={() => {
            console.log('Feedback button clicked');
            setShowFeedbackForm(prev => !prev);
          }}
          className="bg-gray-600/30 hover:bg-gray-600/50 text-white/50 hover:text-white/80 px-3 py-1 rounded text-xs transition-all duration-200"
        >
          Feedback (Beta)
        </button>
        <button
          onClick={handlePreviewTomorrow}
          className="bg-gray-600/30 hover:bg-gray-600/50 text-white/50 hover:text-white/80 px-3 py-1 rounded text-xs transition-all duration-200"
        >
          Preview Tomorrow
        </button>
        {window.location.hostname === 'localhost' && (
          <button
            onClick={handleStagingReset}
            className="bg-gray-600/30 hover:bg-gray-600/50 text-white/50 hover:text-white/80 px-3 py-1 rounded text-xs transition-all duration-200"
          >
            Reset For Testing
          </button>
        )}
      </div>
    </div>
  );
}

const handleYearDigitIncrement = (digitIndex) => {
  const yearStr = year.toString().padStart(4, '0');
  const digits = yearStr.split('');
  
  // Try incrementing first
  const incrementedDigit = ((parseInt(digits[digitIndex]) + 1) % 10).toString();
  digits[digitIndex] = incrementedDigit;
  let newYear = parseInt(digits.join(''));
  
  // Check if increment is valid
  let isValidYear = newYear >= 1850 && newYear <= 2025;
  if (digitIndex === 0 && parseInt(digits[0]) > 2) isValidYear = false;
  if (digitIndex === 0 && parseInt(digits[0]) === 2 && parseInt(digits[1]) > 0) isValidYear = false;
  if (digitIndex === 1 && parseInt(digits[0]) === 2 && parseInt(digits[1]) > 0) isValidYear = false;
  if (digitIndex === 1 && parseInt(digits[0]) === 1 && parseInt(digits[1]) < 8) isValidYear = false;
  
  // If increment isn't valid, try decrementing instead
  if (!isValidYear) {
    digits[digitIndex] = ((parseInt(yearStr[digitIndex]) - 1 + 10) % 10).toString();
    newYear = parseInt(digits.join(''));
    isValidYear = newYear >= 1850 && newYear <= 2025;
    
    // Recheck validity conditions for decrement
    if (digitIndex === 0 && parseInt(digits[0]) > 2) isValidYear = false;
    if (digitIndex === 0 && parseInt(digits[0]) === 2 && parseInt(digits[1]) > 0) isValidYear = false;
    if (digitIndex === 1 && parseInt(digits[0]) === 2 && parseInt(digits[1]) > 0) isValidYear = false;
    if (digitIndex === 1 && parseInt(digits[0]) === 1 && parseInt(digits[1]) < 8) isValidYear = false;
  }
  
  // Update if valid
  if (isValidYear) {
    setYear(newYear);
    playSound('sliderTick');
    if (!guessStartTime) {
      setGuessStartTime(Date.now());
      setIsTimerActive(true);
    }
  }
};