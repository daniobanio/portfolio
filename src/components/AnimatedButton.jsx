import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import soundManager from '../utils/soundManager';

const AnimatedButton = ({ to, href, children, className, onClick, type = 'link' }) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    if (buttonRef.current) {
      gsap.set(buttonRef.current, { filter: 'brightness(1)', y: 0, willChange: 'transform, filter' });
    }
  }, []);

  const handleMouseEnter = () => {
    soundManager.playHover();
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        y: -2,
        filter: 'brightness(1.1)',
        duration: 0.18,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
  };

  const handleMouseLeave = () => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        y: 0,
        filter: 'brightness(1)',
        duration: 0.2,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
  };

  const handleClick = (e) => {
    soundManager.playClick();
    if (onClick) {
      onClick(e);
    }
  };

  // External link
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        ref={buttonRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {children}
      </a>
    );
  }

  // Internal link
  if (to) {
    return (
      <Link
        to={to}
        className={className}
        ref={buttonRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {children}
      </Link>
    );
  }

  // Regular button
  return (
    <button
      className={className}
      ref={buttonRef}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  );
};

export default AnimatedButton;
