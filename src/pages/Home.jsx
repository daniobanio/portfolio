import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import AnimatedButton from '../components/AnimatedButton';
import AnimatedSocialIcon from '../components/AnimatedSocialIcon';
import EmailCopyNotification from '../components/EmailCopyNotification';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { useSEO } from '../hooks/useSEO';
import { useFameCounter } from '../hooks/useFameCounter';
import { useSpeechBubble } from '../hooks/useSpeechBubble';
import { useCharacterMovement } from '../hooks/useCharacterMovement';
import useEmailCopy from '../hooks/useEmailCopy';
import DotGrid from '../components/DotGrid';
import soundManager from '../utils/soundManager';

const Home = () => {
  const heroContainerRef = useRef(null);
  const { fame, hasVoted, upvote, isLoading } = useFameCounter();
  const { message, isVisible, animationKey, handleUpvote, handleNavHover, handleNavHoverEnd, handleCharacterMoved, handleCharacterEmoted } = useSpeechBubble();
  const { containerRef, characterRef, characterImage, triggerEmote } = useCharacterMovement(heroContainerRef, handleCharacterMoved, handleCharacterEmoted);
  const { showNotification, setShowNotification, handleEmailCopy } = useEmailCopy();
  useSEO({
    title: 'Daniel Trinh | Front-end Web Developer in Vancouver',
    description: 'Portfolio of Daniel Trinh, a front-end web developer in Vancouver. UI/UX-focused React developer building interactive, high-performance experiences.',
    keywords: ['Daniel Trinh','Daniel Trinh portfolio','Daniel Trinh Vancouver','Daniel Trinh dev','front-end developer','React developer','UI/UX','GSAP','SCSS'],
    image: '/imgs/portrait.jpg',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Daniel Trinh',
      jobTitle: 'Front-end Web Developer',
      url: typeof window !== 'undefined' ? window.location.origin : undefined,
      sameAs: [
        'http://instagram.com/doobiedoesdo',
        'https://www.youtube.com/@doobiedoesdo',
        'https://www.linkedin.com/in/daniel-trinh-855520323/',
        'https://github.com/daniobanio'
      ],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Vancouver',
        addressRegion: 'BC',
        addressCountry: 'CA'
      }
    }
  });

  return (
    <main className="main-container">
      <Nav 
        onNavHover={handleNavHover}
        onNavHoverEnd={handleNavHoverEnd}
        onContactClick={handleEmailCopy}
      />
      <div className="main-content">
        <div className="hero-section">
          <DotGrid className="hero-img" />
          <div className="hero-container" ref={heroContainerRef}>
            <div className="hero-labels-container">
              <div className="hero-left-column">
                <div className="hero-label">
                  <p className="hero-label-left">Located in</p>
                  <p className="hero-label-right">Vancouver</p>
                </div>
                <div className="hero-label">
                  <p className="hero-label-left">Currently at</p>
                  <p className="hero-label-right">BCIT</p>
                </div>
                <div className="hero-label">
                  <p className="hero-label-left">Fame</p>
                  <div className="fame-btn">
                    <div 
                      className={`fame-up-btn ${hasVoted ? 'active' : ''}`}
                      onClick={() => {
                        upvote();
                        handleUpvote();
                        triggerEmote('love');
                      }}
                      role="button"
                      tabIndex={0}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          upvote();
                          handleUpvote();
                          triggerEmote('love');
                        }
                      }}
                      aria-label="Vote for this portfolio"
                      title={hasVoted ? 'You voted! Click to unvote' : 'Vote for this portfolio'}
                    >
                      <iconify-icon icon="mingcute:up-fill" width="24" height="24" style={{color: hasVoted ? 'var(--yellow)' : 'var(--white)'}}></iconify-icon>
                    </div>
                    <p className="hero-label-right">{isLoading ? '...' : fame}</p>
                  </div>
                </div>
              </div>
              <div className="hero-center-column">
                <p className="hero-center-lvl">Front-end Developer</p>
                <div 
                  ref={containerRef}
                  className="hero-char-container"
                >
                  <div 
                    key={animationKey} 
                    className="chat-bubble-container"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      pointerEvents: isVisible ? 'auto' : 'none',
                      transition: isVisible ? 'none' : 'opacity 0.3s ease-out'
                    }}
                  >
                    <p className="chat-bubble-text">{message}</p>
                    <img className="chat-bubble" src="/imgs/chatbubble.png" alt="Chat Bubble" />
                  </div>
                  <img 
                    ref={characterRef}
                    className="hero-center-char" 
                    src={characterImage} 
                    alt="Pixel art character representing Daniel"
                  />
                  <p 
                    className="hero-center-nametag" 
                    aria-label="Name tag displaying Daniel Trinh"
                  >
                    <img className="dt-logo" src="/imgs/dt-logo.png" alt="DT Logo" />DanielTrinh
                  </p>
                </div>
              </div>
              <div className="hero-right-column">
                <div className="hero-label">
                  <p className="hero-label-left">Online at</p>
                  <div className="online-label-flex">
                    <AnimatedSocialIcon label="Instagram" href="http://instagram.com/doobiedoesdo" icon="mingcute:instagram-line" width="28" height="28" style={{color: 'var(--hero-gray)'}} />
                    <AnimatedSocialIcon label="YouTube" href="https://www.youtube.com/@doobiedoesdo" icon="mingcute:youtube-line" width="28" height="28" style={{color: 'var(--hero-gray)'}} />
                    <AnimatedSocialIcon label="LinkedIn" href="https://www.linkedin.com/in/daniel-trinh-855520323/" icon="mingcute:linkedin-line" width="28" height="28" style={{color: 'var(--hero-gray)'}} />
                    <AnimatedSocialIcon label="GitHub" href="https://github.com/daniobanio" icon="mingcute:github-line" width="28" height="28" style={{color: 'var(--hero-gray)'}} />
                  </div>
                </div>
                <div className="hero-label">
                  <p className="hero-label-left">Keyboards built</p>
                  <p className="hero-label-right">4</p>
                </div>
                <div className="hero-label">
                  <p className="hero-label-left">MBTI</p>
                  <p className="hero-label-right">INTP</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="intro">
          <p>
            <span className="para-h1">danielt:</span> Hi there! I'm Daniel Trinh, a
            front-end web developer. I'm passionate about crafting digital experiences that connect and awe people.
            <AnimatedButton to="/projects" className="btn-filled">MY WORK →</AnimatedButton> <br />
            
          </p>
          <p>
            When I'm offline, I love taking photos, which you can check out <a href="http://instagram.com/doobiedoesdo" target="_blank" rel="noopener noreferrer" onClick={() => soundManager.playClick()} onMouseEnter={() => soundManager.playHover()}>here!</a> I also enjoy building keyboards, working out,
            and going on walks around beautiful Vancouver.
          </p>
          <p>
            Check out my <a href="https://www.youtube.com/@doobiedoesdo" target="_blank" rel="noopener noreferrer" onClick={() => soundManager.playClick()} onMouseEnter={() => soundManager.playHover()}>YouTube channel</a> for some videos of my
            hobbies :)
          </p>
        </div>
        <AnimatedButton to="/about" className="btn-big">MORE ABOUT ME →</AnimatedButton>
        <div className="featured-section">
          <h1>FEATURED WORKS</h1>
          <div className="featured-container">
            <div className="featured-work">
              <h2>Wordly</h2>
              <p>
                An addictive and accessible word web-game, featuring multi-language support, game modes, and hints.
              </p>
              <div className="tech">
                <iconify-icon icon="devicon:react" width="32" height="32"></iconify-icon>
                <iconify-icon icon="devicon:tailwindcss" width="32" height="32"></iconify-icon>
              </div>
              <div className="featured-btns">
                <AnimatedButton to="/projects/wordly" className="btn-small">READ MORE →</AnimatedButton>
                <div className="featured-links">
                  <a href="https://wordly.danieltrinh.ca" target="_blank" rel="noopener noreferrer" onClick={() => soundManager.playClick()} onMouseEnter={() => soundManager.playHover()}>LIVE SITE <iconify-icon icon="mingcute:link-line" width="32" height="32" style={{color: 'var(--yellow)'}}></iconify-icon></a>
                  <a href="https://github.com/daniobanio/wordly-react" target="_blank" rel="noopener noreferrer" onClick={() => soundManager.playClick()} onMouseEnter={() => soundManager.playHover()}>CODE<iconify-icon icon="mdi:github" width="32" height="32" style={{color: 'var(--yellow)'}}></iconify-icon></a>
                </div>
              </div>
            </div>
            <div className="featured-work">
              <h2>Architecture Portfolio</h2>
              <p>
              Portfolio design for an architecture student: minimal, modern layout with a flexible hero and reusable components.
              </p>
              <div className="tech">
                <iconify-icon icon="devicon:nextjs" width="32" height="32"></iconify-icon>
                <iconify-icon icon="devicon:tailwindcss" width="32" height="32"></iconify-icon>
                <iconify-icon icon="devicon:motion" width="32" height="32"></iconify-icon>
              </div>
              <div className="featured-btns">
                <AnimatedButton to="/projects/architecture-portfolio" className="btn-small">READ MORE →</AnimatedButton>
              </div>
            </div>
          </div>
          <AnimatedButton to="/projects" className="btn-filled">VIEW ALL PROJECTS →</AnimatedButton>
        </div>
        <div className="msg-section">
          <div className="msg-tab">KIND MESSAGES</div>
          <div className="msg-container">
            <div className="msg">
              <a 
                href="https://www.linkedin.com/in/journey-kim-a2a484329/" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => soundManager.playClick()} 
                onMouseEnter={() => soundManager.playHover()}
                style={{ textDecoration: 'none', display: 'inline-block' }}
              >
                <img className="msg-icon msg1" src="/imgs/testimonials/journeyKim.jpg" alt="Journey Kim"></img>
              </a>
              <p>
                <a 
                  href="https://www.linkedin.com/in/journey-kim-a2a484329/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => soundManager.playClick()} 
                  onMouseEnter={() => soundManager.playHover()}
                  style={{ textDecoration: 'none' }}
                >
                  <span className="msg-h1">&lt;UX Designer&gt; JourneyKim: </span>
                </a>
                I've worked with Daniel on three team projects, and he's one of the best developers to collaborate with. He understands design quickly, has a strong design sense, and communicates clearly. Daniel always develops exactly what the design requires and follows through with real responsibility. He's a reliable and detail oriented teammate.
              </p>
            </div>
            <div className="msg">
              <a 
                href="https://www.linkedin.com/in/dat-pham-ae26/" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => soundManager.playClick()} 
                onMouseEnter={() => soundManager.playHover()}
                style={{ textDecoration: 'none', display: 'inline-block' }}
              >
                <img className="msg-icon msg2" src="/imgs/testimonials/datPham.jpg" alt="Dat Pham"></img>
              </a>
              <p>
                <a 
                  href="https://www.linkedin.com/in/dat-pham-ae26/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => soundManager.playClick()} 
                  onMouseEnter={() => soundManager.playHover()}
                  style={{ textDecoration: 'none' }}
                >
                  <span className="msg-h2">&lt;Multimedia Designer&gt; DatPham: </span>
                </a>
                Daniel consistently delivers. No matter how challenging the project is he always finds a way to get it done, while adding his own personal touch. He takes initiative to continuously learn and expand his capabilities.
              </p>
            </div>
            <div className="msg">
              <a 
                href="https://www.linkedin.com/in/kim-huynhh/" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => soundManager.playClick()} 
                onMouseEnter={() => soundManager.playHover()}
                style={{ textDecoration: 'none', display: 'inline-block' }}
              >
                <img className="msg-icon msg3" src="/imgs/testimonials/kimHuynh.jpg" alt="Kim Huynh"></img>
              </a>
              <p>
                <a 
                  href="https://www.linkedin.com/in/kim-huynhh/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => soundManager.playClick()} 
                  onMouseEnter={() => soundManager.playHover()}
                  style={{ textDecoration: 'none' }}
                >
                  <span className="msg-h3">&lt;Project Coordinator&gt; KimHuynh: </span>
                </a>
                It was an absolute pleasure to work with Daniel on my portfolio website. He brought the same level of care and attention to detail to the design and development process that one would expect in an architectural plan. Daniel listened closely to my wants, needs, and preferences, shaping my scattered ideas into a coherent and well-structured site. I trusted him to deliver my vision, and he proved to be diligent, reliable, and thorough throughout the process. His craftsmanship resulted in a thoughtful, personalized portfolio that accurately showcases my projects and is something I’m proud to use within the industry.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <EmailCopyNotification show={showNotification} onClose={() => setShowNotification(false)} />
    </main>
  );
};

export default Home;
