import React, { useRef } from 'react';
import AnimatedNavItem from './AnimatedNavItem';
import { useNavigation } from '../hooks/useNavigation';
import soundManager from '../utils/soundManager';
import { gsap } from 'gsap';

const Nav = ({ onNavHover, onNavHoverEnd, onContactClick }) => {
  const resumeLinkRef = useRef(null);
  const contactLinkRef = useRef(null);
  const { registerNavElement, isActive } = useNavigation();

  const handleResumeHover = () => {
    soundManager.playHover();
    if (onNavHover) onNavHover('resume');
    if (resumeLinkRef.current) {
      gsap.to(resumeLinkRef.current, {
        opacity: 1,
        color: 'var(--yellow)',
        duration: 0.15,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
  };

  const handleResumeLeave = () => {
    if (onNavHoverEnd) onNavHoverEnd();
    if (resumeLinkRef.current) {
      gsap.to(resumeLinkRef.current, {
        opacity: 0.6,
        color: 'var(--white)',
        duration: 0.2,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
  };

  const handleContactHover = () => {
    soundManager.playHover();
    if (onNavHover) onNavHover('contact');
    if (contactLinkRef.current) {
      gsap.to(contactLinkRef.current, {
        opacity: 1,
        color: 'var(--yellow)',
        duration: 0.15,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
  };

  const handleContactLeave = () => {
    if (onNavHoverEnd) onNavHoverEnd();
    if (contactLinkRef.current) {
      gsap.to(contactLinkRef.current, {
        opacity: 0.6,
        color: 'var(--white)',
        duration: 0.2,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
  };

  return (
    <>
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
            <AnimatedNavItem 
              to="/" 
              registerNavElement={registerNavElement} 
              path="/" 
              isActive={isActive}
            >
              Home
            </AnimatedNavItem>
          </li>
        </ul>
        <ul className="nav-right">
          <li>
            <AnimatedNavItem 
              to="/about" 
              registerNavElement={registerNavElement} 
              path="/about" 
              isActive={isActive}
              onHoverStart={() => onNavHover && onNavHover('about')}
              onHoverEnd={onNavHoverEnd}
            >
              About
            </AnimatedNavItem>
          </li>
          <li>
            <AnimatedNavItem 
              to="/projects" 
              registerNavElement={registerNavElement} 
              path="/projects" 
              isActive={isActive}
              onHoverStart={() => onNavHover && onNavHover('projects')}
              onHoverEnd={onNavHoverEnd}
            >
              Projects
            </AnimatedNavItem>
          </li>
          <li>
            <a 
              ref={resumeLinkRef}
              href="/DanielTrinhResume.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              onMouseEnter={handleResumeHover}
              onMouseLeave={handleResumeLeave}
              onClick={() => soundManager.playClick()}
              style={{ 
                opacity: 0.6,
                color: 'var(--white)',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <span className="nav-text">Resume</span>
              <span className="nav-icon"><iconify-icon icon="quill:paper" width="5vw" height="5vw"></iconify-icon></span>
            </a>
          </li>
          <li>
            <a 
              ref={contactLinkRef}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                soundManager.playUpvote();
                if (onContactClick) onContactClick();
              }}
              onMouseEnter={handleContactHover}
              onMouseLeave={handleContactLeave}
              style={{ 
                opacity: 0.6,
                color: 'var(--white)',
                textDecoration: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <span className="nav-text">Contact</span>
              <span className="nav-icon"><iconify-icon icon="ic:outline-email" width="5vw" height="5vw"></iconify-icon></span>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Nav;

