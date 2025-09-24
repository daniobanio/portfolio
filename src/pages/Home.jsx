import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedNavItem from '../components/AnimatedNavItem';
import AnimatedButton from '../components/AnimatedButton';
import AnimatedSocialIcon from '../components/AnimatedSocialIcon';
import { useNavigation } from '../hooks/useNavigation';
import { useSEO } from '../hooks/useSEO';
import DotGrid from '../components/DotGrid';

const Home = () => {
  const { registerNavElement, isActive } = useNavigation();
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
        'https://www.instagram.com/daniobanioo/',
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
      <div className="top-bar">
        <div className="top-bar-title">
          <img className="dt-logo" src="/imgs/dt-logo.png" alt="DT Logo" />
          <p>DANIELT'S CHAT</p>
        </div>
        <p>X</p>
      </div>
      <div className="nav-container">
        <ul className="nav-left">
          <li className="nav-home">
            <AnimatedNavItem to="/" registerNavElement={registerNavElement} path="/" isActive={isActive}>
              Home
            </AnimatedNavItem>
          </li>
        </ul>
        <ul className="nav-right">
          <li>
            <AnimatedNavItem to="/about" registerNavElement={registerNavElement} path="/about" isActive={isActive}>
              About
            </AnimatedNavItem>
          </li>
          <li>
            <AnimatedNavItem to="/projects" registerNavElement={registerNavElement} path="/projects" isActive={isActive}>
              Projects
            </AnimatedNavItem>
          </li>
          <li>
            <AnimatedNavItem to="#" registerNavElement={registerNavElement} path="/workflow" isActive={isActive}>
              Workflow
            </AnimatedNavItem>
          </li>
          <li>
            <AnimatedNavItem to="#" registerNavElement={registerNavElement} path="/contact" isActive={isActive}>
              Contact
            </AnimatedNavItem>
          </li>
        </ul>
      </div>
      <div className="main-content">
        <div className="hero-section">
          <DotGrid className="hero-img" />
          <div className="hero-container">
            <div className="hero-labels-container">
              <div className="hero-left-column">
                <p className="hero-title-label">Front-end Web Developer</p>
                <div className="hero-label">
                  <p className="hero-label-left">Located in</p>
                  <p className="hero-label-right">Vancouver</p>
                </div>
                <div className="hero-label">
                  <p className="hero-label-left">Currently at</p>
                  <p className="hero-label-right">BCIT</p>
                </div>
                <div className="hero-label">
                  <p className="hero-label-left">Fame
                    <div className="fame-btn">
                      <div className="fame-up-btn">
                        <iconify-icon icon="mingcute:up-fill" width="24" height="24" style={{color: 'var(--white)'}}></iconify-icon>
                      </div>
                      <div className="fame-down-btn">
                        <iconify-icon icon="mingcute:down-fill" width="24" height="24" style={{color: 'var(--white)'}}></iconify-icon>
                      </div>
                    </div>
                  </p>
                  <p className="hero-label-right">67</p>
                </div>
              </div>
              <div className="hero-center-column">
                <p className="hero-center-lvl">Lvl. 19</p>
                <div className="hero-char-container">
                  <p className="chat-bubble-text">welcome to my site!</p>
                  <img className="chat-bubble" src="/imgs/chatbubble.png" alt="Chat Bubble" />
                  <img className="hero-center-char" src="/imgs/character.png" alt="Pixel art character representing Daniel" />
                  <p className="hero-center-nametag" aria-label="Name tag displaying Daniel Trinh">
                    <img className="dt-logo" src="/imgs/dt-logo.png" alt="DT Logo" />DanielTrinh
                  </p>
                </div>
              </div>
              <div className="hero-right-column">
                <div className="hero-label">
                  <p className="hero-label-left">Online at</p>
                  <div className="online-label-flex">
                    <AnimatedSocialIcon aria-label="Instagram" href="https://www.instagram.com/daniobanioo/" icon="mingcute:instagram-line" width="28" height="28" style={{color: 'var(--hero-gray)'}} />
                    <AnimatedSocialIcon aria-label="YouTube" href="https://www.youtube.com/@doobiedoesdo" icon="mingcute:youtube-line" width="28" height="28" style={{color: 'var(--hero-gray)'}} />
                    <AnimatedSocialIcon aria-label="LinkedIn" href="https://www.linkedin.com/in/daniel-trinh-855520323/" icon="mingcute:linkedin-line" width="28" height="28" style={{color: 'var(--hero-gray)'}} />
                    <AnimatedSocialIcon aria-label="GitHub" href="https://github.com/daniobanio" icon="mingcute:github-line" width="28" height="28" style={{color: 'var(--hero-gray)'}} />
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
            front-end web developer. I'm passionate about crafting immersive
            digital experiences that connect people.
            <AnimatedButton to="/projects" className="btn-filled">MY WORK →</AnimatedButton> <br />
            
          </p>
          <p>
            When I'm offline, I love taking photos, which you can check out <a href="http://instagram.com/doobiedoesdo" target="_blank" rel="noopener noreferrer">here!</a> I also enjoy building keyboards, working out,
            and going on walks around beautiful Vancouver.
          </p>
          <p>
            Check out my <a href="https://www.youtube.com/@doobiedoesdo" target="_blank" rel="noopener noreferrer">YouTube channel</a> for some videos of my
            hobbies and coding journey :)
          </p>
        </div>
        <AnimatedButton to="/about" className="btn-big">MORE ABOUT ME →</AnimatedButton>
        <div className="featured-section">
          <h1>FEATURED WORKS</h1>
          <div className="featured-container">
            <div className="featured-work">
              <h2>myBCIT Redesign</h2>
              <p>
                Redesigned from the ground up, this new design improves user experience by introducing clearer navigation, and a visual hierarchy that...
              </p>
              <div className="tech">
                <iconify-icon icon="devicon:figma" width="32" height="32"></iconify-icon>
              </div>
              <div className="featured-btns">
                <AnimatedButton to="/projects/mybcit-redesign" className="btn-small">READ MORE →</AnimatedButton>
                <div className="featured-links">
                  <a href="#">PROTOTYPE <iconify-icon icon="fe:prototype" width="32" height="32" style={{color: 'var(--yellow)'}}></iconify-icon></a>
                </div>
              </div>
            </div>
            <div className="featured-work">
              <h2>Kim Huynh Portfolio</h2>
              <p>
                This portfolio designed for an architecture student showcases her academic projects, reflects her design personality, and can be used for...
              </p>
              <div className="tech">
                <iconify-icon icon="devicon:figma" width="32" height="32"></iconify-icon>
              </div>
              <div className="featured-btns">
                <AnimatedButton to="/projects/kim-huynh-portfolio" className="btn-small">READ MORE →</AnimatedButton>
                <div className="featured-links">
                  <a href="#">PROTOTYPE <iconify-icon icon="fe:prototype" width="32" height="32" style={{color: 'var(--yellow)'}}></iconify-icon></a>
                </div>
              </div>
            </div>
          </div>
          <AnimatedButton to="/projects" className="btn-filled">VIEW ALL PROJECTS →</AnimatedButton>
        </div>
        <div className="msg-section">
          <div className="msg-tab">KIND MESSAGES</div>
          <div className="msg-container">
            <div className="msg">
              <p>
                <span className="msg-h1">&lt;Product Manager&gt; VincentTang: </span>
                Daniel has a great eye for detail and a deep understanding of how users think. His designs aren't just beautiful—they're functional, intuitive, and always thoughtfully crafted.
              </p>
            </div>
            <div className="msg">
              <p>
                <span className="msg-h2">&lt;Startup Founder&gt; GabrielJunio: </span>
                Daniel is always dependable, communicates clearly, and brings a calm, focused energy to every project. You can count on him to jump in wherever needed and keep things moving."
              </p>
            </div>
            <div className="msg">
              <p>
                <span className="msg-h3">&lt;Design Director&gt; ElijahCarlos: </span>
                Daniel consistently raised the bar in group work, blending creative thinking with technical skill. He's the kind of person who makes everyone around him better."
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="footer-container">
          <div className="footer-online">
            <div className="online-circle"></div>
            <p>Online at</p>
            <div className="footer-icons">
              <div className="footer-icons-flex">
                <AnimatedSocialIcon href="https://www.instagram.com/daniobanioo/" icon="mingcute:instagram-line" width="32" height="32" style={{color: 'var(--white)'}} />
                <AnimatedSocialIcon href="https://www.youtube.com/@doobiedoesdo" icon="mingcute:youtube-line" width="32" height="32" style={{color: 'var(--white)'}} />
                <AnimatedSocialIcon href="https://www.linkedin.com/in/daniel-trinh-855520323/" icon="mingcute:linkedin-line" width="32" height="32" style={{color: 'var(--white)'}} />
                <AnimatedSocialIcon href="https://github.com/daniobanio" icon="mingcute:github-line" width="32" height="32" style={{color: 'var(--white)'}} />
                <AnimatedSocialIcon href="mailto:danieltrinh.dt@gmail.com" icon="mingcute:mail-line" width="32" height="32" style={{color: 'var(--white)'}} />
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            <p>2025 Daniel Trinh. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
