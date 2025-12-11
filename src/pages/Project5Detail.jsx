import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BackToTopLink from '../components/BackToTopLink';
import ProjectNavigation from '../components/ProjectNavigation';
import EmailCopyNotification from '../components/EmailCopyNotification';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { useSEO } from '../hooks/useSEO';
import useEmailCopy from '../hooks/useEmailCopy';
import soundManager from '../utils/soundManager';
import 'highlight.js/styles/tokyo-night-dark.min.css';

const Project5Detail = () => {
  const [activeTab, setActiveTab] = useState('state');
  const { showNotification, setShowNotification, handleEmailCopy } = useEmailCopy();
  
  useSEO({
    title: 'Wordly | Daniel Trinh',
    description: 'Wordly is a word puzzle game inspired by Wordle, featuring multi-language support, game modes, and hints. Built with React and TailwindCSS.',
    keywords: ['Wordly','word game','React','TailwindCSS','word puzzle','Daniel Trinh'],
    image: '/imgs/project5/wordly-cover.png'
  });

  useEffect(() => {
    // Dynamically import and initialize Highlight.js
    const initHighlight = async () => {
      const hljs = await import('highlight.js');
      const javascript = await import('highlight.js/lib/languages/javascript');
      hljs.default.registerLanguage('javascript', javascript.default);
      // Use setTimeout to ensure DOM is ready
      setTimeout(() => {
        hljs.default.highlightAll();
      }, 0);
    };
    initHighlight();
  }, [activeTab]);

  return (
    <>
    <main className="main-container">
      <Nav onContactClick={handleEmailCopy} />
      <div className="main-content">
        <div className="project-info-container">
          <div className="project-detail">
            <div className="project-title-container">
              <p className="back-btn"><Link to="/projects" onClick={() => soundManager.playClick()} onMouseEnter={() => soundManager.playHover()}>← BACK</Link></p>
              <h1 className="project-title">Wordly</h1>
            </div>
            <div className="project-info">
              <div className="project-info-key">
                <ul>
                  <li>Team</li>
                  <li>Role</li>
                  <li>Timeline</li>
                  <li>Tools</li>
                </ul>
              </div>
              <div className="project-info-value">
                <ul>
                  <li>Individual</li>
                  <li>UX/UI Designer, Web Developer</li>
                  <li>Nov 2025 - Present</li>
                  <li>React, TailwindCSS, Figma</li>
                </ul>
              </div>
            </div>
            <div className="project-links">
              <a href="https://wordly.danieltrinh.ca" target="_blank" rel="noopener noreferrer" onClick={() => soundManager.playClick()} onMouseEnter={() => soundManager.playHover()}>LIVE SITE <iconify-icon icon="mingcute:link-line" width="32" height="32" style={{color: 'var(--yellow)'}}></iconify-icon></a>
              <a href="https://github.com/daniobanio/wordly-react" target="_blank" rel="noopener noreferrer" onClick={() => soundManager.playClick()} onMouseEnter={() => soundManager.playHover()}>CODE <iconify-icon icon="mdi:github" width="32" height="32" style={{color: 'var(--yellow)'}}></iconify-icon></a>
            </div>
          </div>
          <div className="project-displayImg">
            <img src="/imgs/project5/wordly-cover.png" alt="Wordly Cover" />
          </div>
        </div>
        <hr />
        <div className="project-content">
          <div className="project-para">
            <h1 className="separator-header">Overview</h1>
            <h2>What is Wordly?</h2>
            <p>
              Inspired by NYT's Wordle, Wordly is a word puzzle game that anyone can enjoy. Whether they're practicing a new language, chasing a win streak, or competing with a friend.
            </p>
            <br />
            <p>
              Wordly started as a personal challenge to learn and practice React, but I found myself imagining new ways to make the experience more addictive and accessible to players around the world.
            </p>
          </div>
          <div className="project-para">
            <h1 className="separator-header yellow">Features</h1>
            <h2>Language Support</h2>
            <p>
              Word games are incredibly engaging, but many are limited to English. With Wordly, I wanted to open the experience to more people, so they can play comfortably in their own language or use the game as a playful way to learn new vocabulary. The first two languages, English and Spanish, are already implemented, with more coming soon.
            </p>
            <br />
            <div className="project-img autowidth">
              <img src="/imgs/project5/wordly-lang.gif" alt="Language Support" />
            </div>
            <h2>Game Modes</h2>
            <p>
              I wanted to extend longevity and replay value while keeping the gameplay familiar. So I added a variety of game modes to Wordly, each offering their own unique twist to keep players interested.
            </p>
            <br />
            <div className="project-img autowidth">
              <img src="/imgs/project5/wordly-modes.png" alt="Game Modes" />
            </div>
            <h2>Hints</h2>
            <p>
              If you're someone who's new to word games, or you're learning a new language, Wordly's hints can be a great feature to help you in guessing words!
              When you click the 'Hint' button, the game reveals a random letter in the correct word. 
              {/* By default, you are allowed up to 3 hints, but that limit can be adjusted in the settings. */}
            </p>
            <br />
            <div className="project-img autowidth">
              <img src="/imgs/project5/wordly-hint.gif" alt="Hints Feature" />
            </div>
          </div>
          <div className="project-para">
            <h1 className="separator-header yellow">Design</h1>
            <h2>Wireframes</h2>
            <p>
              I started with mid-fidelity Figma wireframes to map out board layouts, the flow of a round, and how controls such as hints and language switching should behave. I iterated on spacing, tile sizes, keyboard layout, and how the UI should adapt on small mobile screens.
            </p>
            <br />
            <p>
              <em>(Figma embed to be added)</em>
            </p>
          </div>
          <div className="project-para">
            <h1 className="separator-header yellow">Development</h1>
            <h2>Tech Stack</h2>
            <p>
            React: Component-based architecture, allowing the reuse of UI elements like <code>Key</code> and <code>Letter</code> across different game modes.
            </p>
            <p>
            Context API: Implemented to avoid prop-drilling. Source for the game state (letter, board, streak) accessible by any component in the tree.
            </p>
            <p>TailwindCSS: Used for utility-first styling, ensuring responsive layouts and rapid UI iteration.
            </p>
            <br />
            <hr />
            <h2>Architechural Approach</h2>
            <p>Seperate game logic from UI components by utilizing a centralized state architecture. This seperation means the game logic can change, and the UI will simply reflect the current state, making it easier to scale and manage when adding multiple gamemodes.
            </p>
            <br />
            <hr />
            <h1>Implementation</h1>

            <div className="code-tabs-container">
              <div className="code-tabs-header">
                <button 
                  className={`code-tab ${activeTab === 'state' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab('state');
                    soundManager.playClick();
                  }}
                  onMouseEnter={() => soundManager.playHover()}
                >
                  State Management
                </button>
                <button 
                  className={`code-tab ${activeTab === 'reveal' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab('reveal');
                    soundManager.playClick();
                  }}
                  onMouseEnter={() => soundManager.playHover()}
                >
                  Letter Reveal
                </button>
                <button 
                  className={`code-tab ${activeTab === 'letter' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab('letter');
                    soundManager.playClick();
                  }}
                  onMouseEnter={() => soundManager.playHover()}
                >
                  Letter State
                </button>
                <button 
                  className={`code-tab ${activeTab === 'languages' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab('languages');
                    soundManager.playClick();
                  }}
                  onMouseEnter={() => soundManager.playHover()}
                >
                  Languages
                </button>
                <button 
                  className={`code-tab ${activeTab === 'data' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab('data');
                    soundManager.playClick();
                  }}
                  onMouseEnter={() => soundManager.playHover()}
                >
                  Data
                </button>
              </div>
              <div className="code-tabs-content">
                {activeTab === 'state' && (
                  <pre><code className="language-javascript">
{`// Centralized state management using Context API to avoid prop-drilling

export const AppContext = createContext();

export default function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({letterPos: 0, attemptVal: 0});
  const [wordSet, setWordSet] = useState(new Set());
  const [gameOver, setGameOver] = useState({gameOver: false, guessedWord: false});
  // ... more state

  return (
    <AppContext.Provider value={{ 
      board, setBoard, currAttempt, setCurrAttempt,
      onSelectLetter, onEnter, onDelete, correctWord,
      disabledLetters, setDisabledLetters,
      almostLetters, setAlmostLetters,
      correctLetters, setCorrectLetters,
      gameOver, setGameOver, resetGame, language
    }}>
      <div className="game">
        <Nav />
        <Board />
        <Keyboard />
      </div>
    </AppContext.Provider>
  )
}`}
                  </code></pre>
                )}
                {activeTab === 'reveal' && (
                  <pre><code className="language-javascript">
{`// Letter reveal animation logic
// State updates only after animations complete

const onEnter = () => {
  if (animatingRow !== null) return;
  // ... validation checks ...

  // Trigger animation state
  setAnimatingRow(currAttempt.attemptVal);
  setRevealedLetters(new Set());
  
  const ANIMATION_DURATION = 1500;
  const LETTER_DELAY = 0.25;

  // Reveal each letter at the halfway point of its CSS flip animation
  for (let i = 0; i < 5; i++) {
    const revealTime = (i * LETTER_DELAY) + 0.25;
    setTimeout(() => {
      setRevealedLetters(prev => new Set([...prev, \`\${currAttempt.attemptVal}-\${i}\`]));
    }, revealTime * 1000);
  }

  // Defer game logic updates until animations finish
  setTimeout(() => {
    if (currWord === correctWord) {
      setGameOver({gameOver: true, guessedWord: true});
    } else {
      setCurrAttempt({attemptVal: currAttempt.attemptVal + 1, letterPos: 0});
    }
    setAnimatingRow(null);
  }, ANIMATION_DURATION);
}`}
                  </code></pre>
                )}
                {activeTab === 'letter' && (
                  <pre><code className="language-javascript">
{`const Letter = ({ letterPos, attemptVal }) => {

  const { board, correctWord, currAttempt, revealedLetters } = useContext(AppContext);
  
  const letter = board[attemptVal][letterPos];
  const correct = correctWord.toUpperCase()[letterPos] === letter;
  const almost = !correct && letter !== '' && correctWord.includes(letter);
  // Determine state only if the row is submitted or currently revealing
  const isRevealed = currAttempt.attemptVal > attemptVal || 
                     revealedLetters.has(\`\${attemptVal}-\${letterPos}\`);
                     
  const letterState = isRevealed ? 
    (correct ? "correct" : almost ? "almost" : "error") : undefined;
  return (
    <div className="letter" id={letterState}>
      {letter}
    </div>
  )
}`}
                  </code></pre>
                )}
                {activeTab === 'languages' && (
                  <pre><code className="language-javascript">
{`// Scalable multi-language support

export const languages = {

  EN: {
    label: 'English',
    code: 'EN',
    wordList: enWords,
    keys: {
      line1: ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
      // ...
    },
    translations: {
      wordNotValid: 'Word not valid!',
      guessedIn: (word, attempts) => \`You guessed \${word} in \${attempts} attempts!\`,
    }
  },
  ES: {
    label: 'Español',
    code: 'ES',
    wordList: esWords,
    encoding: 'iso-8859-1', // Handles special character sets
    keys: {
      line1: ["Ó", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "Í"],
      // ...
    },
    translations: {
      wordNotValid: 'Palabra no válida!',
      guessedIn: (word, attempts) => \`¡Adivinaste \${word} en \${attempts} intentos!\`,
    }
  }
};`}
                  </code></pre>
                )}
                {activeTab === 'data' && (
                  <pre><code className="language-javascript">
{`// Performance optimization using TextDecoder for data parsing and O(1) Sets

export const generateWordSet = async (wordListUrl, encoding = 'utf-8') => {
  let wordSet;
  let correctWord;
  
  await fetch(wordListUrl)
    .then((res) => res.arrayBuffer())
    .then((buffer) => {
      // Use TextDecoder to correctly handle different language encodings
      const decoder = new TextDecoder(encoding);
      const result = decoder.decode(buffer);
      // Process raw text into an optimized Set for O(1) lookups
      const wordArr = result.split(/\\r?\\n/)
           .map(word => word.trim())
           .filter(word => word.length > 0);
      
      wordSet = new Set(wordArr);
      correctWord = wordArr[Math.floor(Math.random() * wordArr.length)].toUpperCase();
    })
  return { wordSet, correctWord };
}`}
                  </code></pre>
                )}
              </div>
            </div>
            <h2>Optimizations</h2>
            <p>
            To prevent re-rendering the 30-key keyboard on every keystroke, I used <code>useCallback</code>. This helped keep the game at a smooth 60fps.
            </p><br />
            <p>
            Validating guesses against the 13,000+ words needed to be instant. I asynchronously fetched the word list (text file), used <code>TextDecoder</code> to parse it, and processed it into JavaScript <code>Sets</code>. Checking if a word is valid now takes O(1) constant time lookup.
            </p>
          </div>
          <div className="project-para">
            <h1 className="separator-header yellow">Reflection</h1>
            <p>
            Building Wordly helped me think in systems. It taught me the importance of component lifecycle management and how to architect data flows that remain performant at scale.
            </p>
            <br />
            <p>
            Future Roadmap:
            </p>
            <ul>
              <li>Further adjustability for difficulty with settings</li>
              <li>Implement a backend to support user accounts, enabling features like global leaderboards, player statistics, and cross-device progression</li>
              <li>Explore WebSocket integration for a multiplayer "Versus" gamemode</li>
            </ul>
          </div>
        </div>
        <ProjectNavigation currentSlug="/projects/wordly" />
      </div>
      <Footer />
    </main>
    <BackToTopLink />
    <EmailCopyNotification show={showNotification} onClose={() => setShowNotification(false)} />
    </>
  );
};

export default Project5Detail;

