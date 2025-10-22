import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import soundManager from '../utils/soundManager';

const AnimatedButton = ({ to, href, children, className, onClick, type = 'link', disabled = false }) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    if (buttonRef.current) {
      gsap.set(buttonRef.current, { filter: 'brightness(1)', y: 0, willChange: 'transform, filter' });
    }
  }, []);

  const handleMouseEnter = () => {
    if (disabled) return;
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
    if (disabled) return;
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
    if (disabled) {
      e.preventDefault();
      return;
    }
    soundManager.playClick();
    if (onClick) {
      onClick(e);
    }
  };

  const disabledStyle = disabled ? { 
    opacity: 0.5,
    pointerEvents: 'auto'
  } : {};

  const disabledClass = disabled ? (className ? `${className} disabled` : 'disabled') : className;

  // External link
  if (href) {
    return (
      <a
        href={disabled ? "#" : href}
        target={disabled ? undefined : "_blank"}
        rel={disabled ? undefined : "noopener noreferrer"}
        className={disabledClass}
        ref={buttonRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        aria-disabled={disabled}
        style={disabledStyle}
      >
        {children}
      </a>
    );
  }

  // Internal link
  if (to) {
    return (
      <Link
        to={disabled ? "#" : to}
        className={disabledClass}
        ref={buttonRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        aria-disabled={disabled}
        style={disabledStyle}
      >
        {children}
      </Link>
    );
  }

  // Regular button
  return (
    <button
      className={disabledClass}
      ref={buttonRef}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      disabled={disabled}
      aria-disabled={disabled}
      style={disabledStyle}
    >
      {children}
    </button>
  );
};

export default AnimatedButton;
