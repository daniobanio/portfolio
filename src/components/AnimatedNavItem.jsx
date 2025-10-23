import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import soundManager from '../utils/soundManager';

const AnimatedNavItem = ({ to, children, className, registerNavElement, path, isActive, disabled = false, onHoverStart, onHoverEnd }) => {
  const navRef = useRef(null);

  useEffect(() => {
    if (registerNavElement && navRef.current) {
      registerNavElement(path || to, navRef.current);
    }
    if (navRef.current) {
      gsap.set(navRef.current, { willChange: 'opacity, color' });
    }
  }, []);

  const key = path || to;

  const handleMouseEnter = () => {
    if (disabled) return;
    soundManager.playHover();
    if (onHoverStart) {
      onHoverStart();
    }
    gsap.to(navRef.current, {
      opacity: 1,
      color: 'var(--yellow)',
      duration: 0.15,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  const handleMouseLeave = () => {
    if (disabled) return;
    if (onHoverEnd) {
      onHoverEnd();
    }
    const leaveToOpacity = isActive && key ? (isActive(key) ? 1 : 0.6) : 0.6;
    gsap.to(navRef.current, {
      opacity: leaveToOpacity,
      color: 'var(--white)',
      duration: 0.2,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  const handleClick = (e) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    soundManager.playClick();
  };

  const disabledClass = disabled ? (className ? `${className} disabled` : 'disabled') : className;

  return (
    <Link
      to={to || '#'}
      className={disabledClass}
      ref={navRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      aria-disabled={disabled}
      style={disabled ? { 
        opacity: 0.5,
        pointerEvents: 'auto'
      } : {}}
    >
      {children}
    </Link>
  );
};

export default AnimatedNavItem;
