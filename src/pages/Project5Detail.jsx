import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import AnimatedNavItem from '../components/AnimatedNavItem';
import AnimatedSocialIcon from '../components/AnimatedSocialIcon';
import BackToTopLink from '../components/BackToTopLink';
import ProjectNavigation from '../components/ProjectNavigation';
import EmailCopyNotification from '../components/EmailCopyNotification';
import { useNavigation } from '../hooks/useNavigation';
import { useSEO } from '../hooks/useSEO';
import soundManager from '../utils/soundManager';
import { gsap } from 'gsap';
import 'highlight.js/styles/tokyo-night-dark.min.css';

const Project5Detail = () => {
  const resumeLinkRef = useRef(null);
  const contactLinkRef = useRef(null);
  const [showNotification, setShowNotification] = useState(false);
  const { registerNavElement, isActive } = useNavigation();
  const [activeTab, setActiveTab] = useState('state');

  const handleEmailCopy = async () => {
    try {
      await navigator.clipboard.writeText('hello@danieltrinh.ca');
      setShowNotification(true);
    } catch (err) {
      const textArea = document.createElement('textarea');
      textArea.value = 'hello@danieltrinh.ca';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setShowNotification(true);
    }
  };
  
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
      <div className="top-bar">
        <div className="top-bar-title">
          <img className="dt-logo" src="/imgs/dt-logo.png" alt="DT Logo" />
          <p>DANIELT'S CHAT</p>
        </div>
        <p>X</p>
      </div>
      <div className="nav-container">
        <ul className="nav-left">
          <li className="nav-home"><AnimatedNavItem to="/" registerNavElement={registerNavElement} path="/" isActive={isActive}>Home</AnimatedNavItem></li>
        </ul>
        <ul className="nav-right">
          <li><AnimatedNavItem to="/about" registerNavElement={registerNavElement} path="/about" isActive={isActive}>About</AnimatedNavItem></li>
          <li><AnimatedNavItem to="/projects" registerNavElement={registerNavElement} path="/projects" isActive={isActive}>Projects</AnimatedNavItem></li>
          <li>
            <a 
              ref={resumeLinkRef}
              href="/DanielTrinhResume.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              onMouseEnter={() => {
                soundManager.playHover();
                if (resumeLinkRef.current) {
                  gsap.to(resumeLinkRef.current, {
                    opacity: 1,
                    color: 'var(--yellow)',
                    duration: 0.15,
                    ease: 'power2.out',
                    overwrite: 'auto',
                  });
                }
              }}
              onMouseLeave={() => {
                if (resumeLinkRef.current) {
                  gsap.to(resumeLinkRef.current, {
                    opacity: 0.6,
                    color: 'var(--white)',
                    duration: 0.2,
                    ease: 'power2.out',
                    overwrite: 'auto',
                  });
                }
              }}
              onClick={() => soundManager.playClick()}
              style={{ 
                opacity: 0.6,
                color: 'var(--white)',
                textDecoration: 'none'
              }}
            >
              Resume
            </a>
          </li>
          <li>
            <a 
              ref={contactLinkRef}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                soundManager.playUpvote();
                handleEmailCopy();
              }}
              onMouseEnter={() => {
                soundManager.playHover();
                if (contactLinkRef.current) {
                  gsap.to(contactLinkRef.current, {
                    opacity: 1,
                    color: 'var(--yellow)',
                    duration: 0.15,
                    ease: 'power2.out',
                    overwrite: 'auto',
                  });
                }
              }}
              onMouseLeave={() => {
                if (contactLinkRef.current) {
                  gsap.to(contactLinkRef.current, {
                    opacity: 0.6,
                    color: 'var(--white)',
                    duration: 0.2,
                    ease: 'power2.out',
                    overwrite: 'auto',
                  });
                }
              }}
              style={{ 
                opacity: 0.6,
                color: 'var(--white)',
                textDecoration: 'none',
                cursor: 'pointer'
              }}
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
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
            <h2>Building with React</h2>
            <p>
            Initially, I started this React word game project to practice state management and user interaction.
            The code uses React hooks (useState, useEffect, useCallback, useContext) to manage state and side effects, and I structured components to keep logic separate and reusable. I used React Context API to centralize state across components, avoiding prop drilling. For animations, I used setTimeout to reveal letters sequentially, and CSS keyframes for flip effects. I handled keyboard input with useCallback and useEffect to attach/remove event listeners and prevent unnecessary re-renders. For persistence, I used localStorage to save streaks and language preferences. 
            </p>
            <br />
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
                  className={`code-tab ${activeTab === 'keyboard' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab('keyboard');
                    soundManager.playClick();
                  }}
                  onMouseEnter={() => soundManager.playHover()}
                >
                  Keyboard Handler
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
              </div>
              <div className="code-tabs-content">
                {activeTab === 'state' && (
                  <pre><code className="language-javascript">
{`export const AppContext = createContext();

export default function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({letterPos: 0, attemptVal: 0});
  const [wordSet, setWordSet] = useState(new Set());
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [almostLetters, setAlmostLetters] = useState([]);
  const [correctLetters, setCorrectLetters] = useState([]);
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
      {/* Components */}
    </AppContext.Provider>
  )
}`}
                  </code></pre>
                )}
                {activeTab === 'reveal' && (
                  <pre><code className="language-javascript">
{`const onEnter = () => {

  if (animatingRow !== null) return;
  
  if (currAttempt.letterPos !== 5) {
    showError(language.translations.notEnoughLetters, currAttempt.attemptVal);
    return;
  }
  let currWord = "";
  for (let i = 0; i < 5; i++) {
    currWord += board[currAttempt.attemptVal][i];
  }
  if (!wordSet.has(currWord.toLowerCase())) {
    showError(language.translations.wordNotValid, currAttempt.attemptVal);
    return;
  }
  setAnimatingRow(currAttempt.attemptVal);
  setRevealedLetters(new Set());
  
  const ANIMATION_DURATION = 1500;
  const LETTER_DELAY = 0.25;
  // Reveal each letter at the halfway point of its animation
  for (let i = 0; i < 5; i++) {
    const revealTime = (i * LETTER_DELAY) + 0.25;
    setTimeout(() => {
      setRevealedLetters(prev => new Set([...prev, \`\${currAttempt.attemptVal}-\${i}\`]));
    }, revealTime * 1000);
  }
  if (currWord === correctWord) {
    setTimeout(() => {
      const newStreak = streak + 1;
      setStreak(newStreak);
      updateStreak(newStreak);
      setGameOver({gameOver: true, guessedWord: true});
    }, ANIMATION_DURATION + 500);
    return;
  }
  setTimeout(() => {
    setCurrAttempt({attemptVal: currAttempt.attemptVal + 1, letterPos: 0});
    setAnimatingRow(null);
  }, ANIMATION_DURATION);
}`}
                  </code></pre>
                )}
                {activeTab === 'keyboard' && (
                  <pre><code className="language-javascript">
{`const Keyboard = () => {

  const { onDelete, onSelectLetter, onEnter, disabledLetters,
          almostLetters, correctLetters, gameOver, language } = useContext(AppContext);
  
  const { keys } = language;
  const { line1, line2, line3 } = keys;
  const handleKeyboard = useCallback((e) => {
    if (gameOver.gameOver) return;
    if (e.key === "Enter") {
      playSound('keyPress');
      onEnter();
    } else if (e.key === "Backspace") {
      playSound('keyPress');
      onDelete();
    } else {
      [...line1, ...line2, ...line3].forEach((key) => {
        if (e.key.toLowerCase() === key.toLowerCase()) {
          playSound('keyPress');
          onSelectLetter(key);
        }
      });
    }
  }, [onEnter, onDelete, onSelectLetter, gameOver, line1, line2, line3]);
  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);
    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard]);
  return (
    <div className="keyboard">
      {/* Keyboard UI */}
    </div>
  );
};`}
                  </code></pre>
                )}
                {activeTab === 'letter' && (
                  <pre><code className="language-javascript">
{`const Letter = ({ letterPos, attemptVal }) => {

  const { board, correctWord, currAttempt, animatingRow, 
          revealedLetters, setDisabledLetters, setAlmostLetters, 
          setCorrectLetters } = useContext(AppContext);
  
  const letter = board[attemptVal][letterPos];
  const correct = correctWord.toUpperCase()[letterPos] === letter;
  const almost = !correct && letter !== '' && correctWord.includes(letter);

  // Check if this letter should show its state
  const isRevealed = currAttempt.attemptVal > attemptVal || 
                     revealedLetters.has(\`\${attemptVal}-\${letterPos}\`);
  const letterState = isRevealed ? 
    (correct ? "correct" : almost ? "almost" : "error") : undefined;
  const isAnimating = animatingRow === attemptVal;
  const animationDelay = isAnimating ? letterPos * 0.25 : 0;
  useEffect(() => {
    
    // Update keyboard letter states after row is complete
    if (letter !== "" && !correct && !almost) {
      setDisabledLetters((prev) => [...prev, letter]);
    } else if (letter !== "" && !correct) {
      setAlmostLetters((prev) => [...prev, letter]);
    } else {
      setCorrectLetters((prev) => [...prev, letter]);
    }
  }, [currAttempt.attemptVal]);

  return (
    <div 
      className={\`letter \${isAnimating ? 'guess-animating' : ''}\`}
      id={letterState}
      style={isAnimating ? { animationDelay: \`\${animationDelay}s\` } : {}}
    >
      {letter}
    </div>
  );
};`}
                  </code></pre>
                )}
                {activeTab === 'languages' && (
                  <pre><code className="language-javascript">
{`export const languages = {
  EN: {
    label: 'English',
    code: 'EN',
    wordList: enWords,
    keys: {
      line1: ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
      line2: ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
      line3: ["Z", "X", "C", "V", "B", "N", "M"]
    },
    translations: {
      enter: 'ENTER',
      hint: 'Hint',
      wordNotValid: 'Word not valid!',
      guessedIn: (word, attempts) => 
        \`You guessed \${word} in \${attempts} attempt\${attempts > 1 ? "s" : ""}!\`,
      streak: 'Win Streak:',
      // ... more translations
    }
  },
  ES: {
    label: 'Español',
    code: 'ES',
    wordList: esWords,
    encoding: 'iso-8859-1', // Handles special characters
    keys: {
      line1: ["Ó", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "Í"],
      line2: ["Ñ", "A", "S", "D", "F", "G", "H", "J", "K", "L", "É"],
      line3: ["Á", "Ú", "Ü", "Z", "X", "C", "V", "B", "N", "M"]
    },
    translations: {
      enter: 'Ir',
      hint: 'Pista',
      wordNotValid: 'Palabra no válida!',
      guessedIn: (word, attempts) => 
        \`¡Adivinaste \${word} en \${attempts} intento\${attempts > 1 ? "s" : ""}!\`,
      // ... more translations
    }
  }
};`}
                  </code></pre>
                )}
              </div>
            </div>
          </div>
          <div className="project-para">
            <h1 className="separator-header yellow">Reflection</h1>
            <p>
              Building Wordly helped me bridge the gap between "knowing React syntax" and thinking in React. I learned how to make components scalable, and how to structure a growing codebase.
            </p>
            <br />
            <p>
              As the project grows, future improvements include:
            </p>
            <ul>
              <li>A lightweight backend for user stats, streaks, and versus matchmaking</li>
              <li>Custom difficulty sliders or themed challenges</li>
              <li>Real-time multiplayer infrastructure using WebSockets</li>
            </ul>
          </div>
        </div>
        <ProjectNavigation currentSlug="/projects/wordly" />
      </div>
      <div className="footer">
        <div className="footer-container">
          <div className="footer-online">
            <div className="online-circle"></div>
            <p>Online at</p>
            <div className="footer-icons">
              <div className="footer-icons-flex">
                <AnimatedSocialIcon label="Instagram" href="https://www.instagram.com/daniobanioo/" icon="mingcute:instagram-line" width="32" height="32" style={{color: 'var(--white)'}} />
                <AnimatedSocialIcon label="YouTube" href="https://www.youtube.com/@doobiedoesdo" icon="mingcute:youtube-line" width="32" height="32" style={{color: 'var(--white)'}} />
                <AnimatedSocialIcon label="LinkedIn" href="https://www.linkedin.com/in/daniel-trinh-855520323/" icon="mingcute:linkedin-line" width="32" height="32" style={{color: 'var(--white)'}} />
                <AnimatedSocialIcon label="GitHub" href="https://github.com/daniobanio" icon="mingcute:github-line" width="32" height="32" style={{color: 'var(--white)'}} />
                <AnimatedSocialIcon label="Email" href="mailto:hello@danieltrinh.ca" icon="mingcute:mail-line" width="32" height="32" style={{color: 'var(--white)'}} />
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            <p>2025 Daniel Trinh. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </main>
    <BackToTopLink />
    <EmailCopyNotification show={showNotification} onClose={() => setShowNotification(false)} />
    </>
  );
};

export default Project5Detail;

