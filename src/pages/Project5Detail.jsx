import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AnimatedNavItem from '../components/AnimatedNavItem';
import AnimatedSocialIcon from '../components/AnimatedSocialIcon';
import BackToTopLink from '../components/BackToTopLink';
import ProjectNavigation from '../components/ProjectNavigation';
import { useNavigation } from '../hooks/useNavigation';
import { useSEO } from '../hooks/useSEO';
import soundManager from '../utils/soundManager';
import 'highlight.js/styles/default.css';

const Project5Detail = () => {
  const { registerNavElement, isActive } = useNavigation();
  const [activeTab, setActiveTab] = useState('core');
  
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
          <li><AnimatedNavItem to="#" registerNavElement={registerNavElement} path="/workflow" isActive={isActive} disabled={true}>Workflow</AnimatedNavItem></li>
          <li><AnimatedNavItem to="#" registerNavElement={registerNavElement} path="/contact" isActive={isActive} disabled={true}>Contact</AnimatedNavItem></li>
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
              <a href="https://wordly.danieltrinh.ca" target="_blank" rel="noopener noreferrer" onClick={() => soundManager.playClick()} onMouseEnter={() => soundManager.playHover()}>LIVE SITE</a>
              <a href="https://github.com/daniobanio/wordly-react" target="_blank" rel="noopener noreferrer" onClick={() => soundManager.playClick()} onMouseEnter={() => soundManager.playHover()}>CODE (GITHUB)</a>
            </div>
          </div>
          <div className="project-displayImg">
            <img src="/imgs/project5/wordly-cover.png" alt="Wordly Cover" />
          </div>
        </div>
        <hr />
        <div className="project-content">
          <div className="project-para">
            <h1>Overview</h1>
            <h2>What is Wordly?</h2>
            <p>
              Inspired by NYT's Wordle, Wordly is a word puzzle game that anyone can enjoy. Whether they're practicing a new language, chasing a win streak, or competing with a friend.
            </p>
            <br />
            <p>
              Wordly started as a personal challenge to learn React, but I found myself imagining new ways to make the experience more addictive and accessible to players around the world.
            </p>
          </div>
          <hr />
          <div className="project-para">
            <h1>Features</h1>
            <h2>Language Support</h2>
            <p>
              Word games are incredibly engaging, but many are limited to English. With Wordly, I wanted to open the experience to more people, so they can play comfortably in their own language or use the game as a playful way to learn new vocabulary.
            </p>
            <br />
            <p>
              The first two languages, English and Spanish, are already implemented, with more coming soon.
            </p>
            <div className="project-img autowidth">
              <img src="/imgs/project5/wordly-lang.gif" alt="Language Support" />
            </div>
            <h2>Game Modes</h2>
            <p>
              I wanted to extend longevity and replay value while keeping the gameplay familiar. So I added a variety of game modes to Wordly, each offering their own unique twist to keep players interested.
            </p>
            <div className="project-img autowidth">
              <img src="/imgs/project5/wordly-modes.png" alt="Game Modes" />
            </div>
            <h2>Hints</h2>
            <p>
              If you're someone who's new to word games, or you're learning a new language, Wordly's hints can be a great feature to help you in guessing words!
            </p>
            <br />
            <p>
              When you click the 'Hint' button, the game reveals a random letter in the correct word. By default, you are allowed up to 3 hints, but that limit can be adjusted in the settings.
            </p>
            <div className="project-img autowidth">
              <img src="/imgs/project5/wordly-hint.gif" alt="Hints Feature" />
            </div>
          </div>
          <hr />
          <div className="project-para">
            <h1>Design</h1>
            <h2>Wireframes</h2>
            <p>
              I started with mid-fidelity Figma wireframes to map out board layouts, the flow of a round, and how controls such as hints and language switching should behave. I iterated on spacing, tile sizes, keyboard layout, and how the UI should adapt on small mobile screens.
            </p>
            <br />
            <p>
              <em>(Figma embed to be added)</em>
            </p>
          </div>
          <hr />
          <div className="project-para">
            <h1>Development</h1>
            <h2>Building with React</h2>
            <p>
              Wordly's architecture was built around modularity. The board, keyboard, tile component, word validation logic, hint engine, and game mode controller all exist as separate components that interact through shared state. This made it easier to expand the game without rewriting large sections of code.
            </p>
            <br />
            <div className="code-tabs-container">
              <div className="code-tabs-header">
                <button 
                  className={`code-tab ${activeTab === 'core' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab('core');
                    soundManager.playClick();
                  }}
                  onMouseEnter={() => soundManager.playHover()}
                >
                  Core Logic
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
                  className={`code-tab ${activeTab === 'language' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab('language');
                    soundManager.playClick();
                  }}
                  onMouseEnter={() => soundManager.playHover()}
                >
                  Language Support
                </button>
                <button 
                  className={`code-tab ${activeTab === 'audio' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab('audio');
                    soundManager.playClick();
                  }}
                  onMouseEnter={() => soundManager.playHover()}
                >
                  Audio Wrapper
                </button>
              </div>
              <div className="code-tabs-content">
                {activeTab === 'core' && (
                  <pre><code className="language-javascript">
{`// Word validation and tile state management
const validateWord = (word, targetWord) => {
  const result = [];
  const targetLetters = targetWord.split('');
  const wordLetters = word.split('');
  
  // First pass: mark correct positions
  wordLetters.forEach((letter, index) => {
    if (letter === targetLetters[index]) {
      result[index] = 'correct';
      targetLetters[index] = null; // Mark as used
    }
  });
  
  // Second pass: mark present but wrong position
  wordLetters.forEach((letter, index) => {
    if (!result[index]) {
      const foundIndex = targetLetters.indexOf(letter);
      if (foundIndex !== -1) {
        result[index] = 'present';
        targetLetters[foundIndex] = null;
      } else {
        result[index] = 'absent';
      }
    }
  });
  
  return result;
};`}
                  </code></pre>
                )}
                {activeTab === 'keyboard' && (
                  <pre><code className="language-javascript">
{`// Handle keyboard input with language support
const handleKeyPress = (key, currentLanguage) => {
  const validKeys = getValidKeysForLanguage(currentLanguage);
  
  if (key === 'Enter') {
    submitGuess();
  } else if (key === 'Backspace') {
    deleteLastLetter();
  } else if (validKeys.includes(key.toUpperCase())) {
    addLetter(key.toUpperCase());
  }
};

// Support for multiple keyboard layouts
const getValidKeysForLanguage = (lang) => {
  const layouts = {
    en: 'QWERTYUIOPASDFGHJKLZXCVBNM'.split(''),
    es: 'QWERTYUIOPASDFGHJKLÑZXCVBNM'.split('')
  };
  return layouts[lang] || layouts.en;
};`}
                  </code></pre>
                )}
                {activeTab === 'language' && (
                  <pre><code className="language-javascript">
{`// Multi-language word list management
const useWordList = (language) => {
  const [wordList, setWordList] = useState([]);
  
  useEffect(() => {
    const loadWordList = async () => {
      try {
        const response = await fetch(\`/wordlists/\${language}.json\`);
        const words = await response.json();
        setWordList(words);
      } catch (error) {
        console.error('Failed to load word list:', error);
      }
    };
    
    loadWordList();
  }, [language]);
  
  return wordList;
};`}
                  </code></pre>
                )}
                {activeTab === 'audio' && (
                  <pre><code className="language-javascript">
{`// Audio management for game feedback
import { Howl } from 'howler';

const useAudio = () => {
  const sounds = {
    correct: new Howl({ src: ['/sounds/correct.mp3'] }),
    present: new Howl({ src: ['/sounds/present.mp3'] }),
    absent: new Howl({ src: ['/sounds/absent.mp3'] }),
    win: new Howl({ src: ['/sounds/win.mp3'] }),
    lose: new Howl({ src: ['/sounds/lose.mp3'] })
  };
  
  const playSound = (type) => {
    if (sounds[type] && settings.audioEnabled) {
      sounds[type].play();
    }
  };
  
  return { playSound };
};`}
                  </code></pre>
                )}
              </div>
            </div>
          </div>
          <hr />
          <div className="project-para">
            <h1>Reflection</h1>
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
                <AnimatedSocialIcon label="Email" href="mailto:danieltrinh.dt@gmail.com" icon="mingcute:mail-line" width="32" height="32" style={{color: 'var(--white)'}} />
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
    </>
  );
};

export default Project5Detail;

