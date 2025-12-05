import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import AnimatedNavItem from '../components/AnimatedNavItem';
import AnimatedButton from '../components/AnimatedButton';
import AnimatedSocialIcon from '../components/AnimatedSocialIcon';
import EmailCopyNotification from '../components/EmailCopyNotification';
import { useNavigation } from '../hooks/useNavigation';
import { useSEO } from '../hooks/useSEO';
import { gsap } from 'gsap';
import soundManager from '../utils/soundManager';

const About = () => {
  const resumeLinkRef = useRef(null);
  const contactLinkRef = useRef(null);
  const [showNotification, setShowNotification] = useState(false);
  const { registerNavElement, isActive } = useNavigation();

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
    title: 'About | Daniel Trinh - Front-end Web Developer',
    description: 'Learn about Daniel Trinh, a front-end web developer based in Vancouver. My journey, values, and the technologies I love using to build the web.',
    keywords: ['About Daniel Trinh','Vancouver developer','front-end developer','React','UI/UX','portfolio'],
    image: '/imgs/portrait.jpg'
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
            <AnimatedNavItem to="/" registerNavElement={registerNavElement} path="/" isActive={isActive}>Home</AnimatedNavItem>
          </li>
        </ul>
        <ul className="nav-right">
          <li><AnimatedNavItem to="/about" registerNavElement={registerNavElement} path="/about" isActive={isActive}>About</AnimatedNavItem></li>
          <li><AnimatedNavItem to="/projects" registerNavElement={registerNavElement} path="/projects" isActive={isActive}>Projects</AnimatedNavItem></li>
          <li>
            <a 
              ref={resumeLinkRef}
              href="/DanielTrinh-Resume.pdf" 
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
        <div className="about-section">
          <h1 className="about-title">ME & MY JOURNEY</h1>
          <div className="about-photo-cards">
            <img className="photo-card" src="/imgs/cameracafe2.webp" alt="Daniel photographing food in a Vancouver cafe" />
            <img className="photo-card" src="/imgs/portrait.jpg" alt="Portrait of Daniel Trinh" />
            <img className="photo-card" src="/imgs/capstone.jpg" alt="Daniel presenting his keyboard acoustics capstone project" />
          </div>
          <div className="about-intro">
            <p>
              <span className="para-h1">Hey! I’m Daniel Trinh, a front-end web developer</span> with a background in design and a love for creating things that make people stop and say, “Woah.”
            </p>
            <p>
            I’ve been drawn to visual creativity since I was a kid messing around with GIMP and Photoshop on my old family laptop. That curiosity carried into high school, where I got into photography and eventually web development. The process of learning, experimenting, breaking things, and finally making something work is what hooked me, and it still does.
            </p>
            <p>
            Today, I study <span className="para-h1">New Media Design & Web Development at BCIT</span>, where I’m building skills in  UI/UX design and front-end development to create meaningful user experiences. Every new thing I learn adds fuel to the drive that started years ago: turning ideas into something people can see, use, and feel inspired by.
            </p>
            <p>
            I’m excited to keep growing, take on challenging projects, and build work that blends creativity and technical craft in ways that spark that same feeling of awe that inspired me in the first place.
            </p>
          </div>
        </div>
        <div className="grid-section">
          <div className="grid-item tech-stack">
            <div className="tech-stack-center">
              <div className="tech-stack-char">
                <div className="chat-bubble">
                  <p className="tech-bubble-text">my tech stack!</p>
                  <img className="tech-bubble" src="/imgs/chatbubble.png" alt="Chat Bubble" />
                </div>
                <img className="tech-stack-char" src="/imgs/character/standing.gif" alt="Pixel art character representing Daniel" />
                <iconify-icon class="react-tech" icon="devicon:react" width="64" height="64"></iconify-icon>
                <iconify-icon class="js-tech" icon="logos:javascript" width="64" height="64"></iconify-icon>
                <iconify-icon class="threejs-tech" icon="devicon:threejs-wordmark" width="64" height="64"></iconify-icon>
                <iconify-icon class="html-tech" icon="devicon:html5" width="64" height="64"></iconify-icon>
                <iconify-icon class="css-tech" icon="vscode-icons:file-type-css2" width="64" height="64"></iconify-icon>
                <iconify-icon class="gsap-tech" icon="simple-icons:gsap" width="64" height="64" style={{color: 'var(--gsap-brand)'}}></iconify-icon>
                <iconify-icon icon="devicon:figma" width="64" height="64"></iconify-icon>
              </div>
            </div>
          </div>
          <div className="grid-item youtube">
            <h1>My YouTube Channel</h1>
            <p>
              I like to post my hobbies and coding journey on my YouTube channel. If you enjoy photography and keyboards, check it out!
            </p>
            <AnimatedButton href="https://www.youtube.com/@doobiedoesdo" className="btn-filled">YOUTUBE →</AnimatedButton>
            <div className="youtube-icon-container">
              <iconify-icon class="youtube-icon" icon="mdi:youtube" width="425" height="425" style={{color: 'var(--main-gray)'}}></iconify-icon>
            </div>
          </div>
          <div className="grid-item photography">
            <h1>My Photography</h1>
            <p>
              What started as a random course I picked in high school turned into one of my favourite hobbies. I enjoy going on walks with my camera to take my mind off of things and to appreciate the beauty of Vancouver.
            </p>
            <AnimatedButton href="http://instagram.com/doobiedoesdo" className="btn-filled">VIEW PHOTOS →</AnimatedButton>
            <div className="photo-display">
              <img src="/imgs/photo1.webp" alt="Photo 1" />
              <img src="/imgs/photo2.webp" alt="Photo 2" />
              <img src="/imgs/photo3.webp" alt="Photo 3" />
              <img src="/imgs/photo4.webp" alt="Photo 4" />
              <img src="/imgs/photo5.webp" alt="Photo 5" />
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
      <EmailCopyNotification show={showNotification} onClose={() => setShowNotification(false)} />
    </main>
  );
};

export default About;
