import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

const AnimatedNavItem = ({ to, children, className, registerNavElement, path, isActive }) => {
  const navRef = useRef(null);

  useEffect(() => {
    if (registerNavElement && navRef.current) {
      registerNavElement(path || to, navRef.current);
    }
    if (navRef.current) {
      gsap.set(navRef.current, { willChange: 'opacity, color' });
    }
  }, [registerNavElement, path, to]);

  const key = path || to;

  const handleMouseEnter = () => {
    gsap.to(navRef.current, {
      opacity: 1,
      color: 'var(--yellow)',
      duration: 0.15,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  const handleMouseLeave = () => {
    const leaveToOpacity = isActive && key ? (isActive(key) ? 1 : 0.6) : 0.6;
    gsap.to(navRef.current, {
      opacity: leaveToOpacity,
      color: 'var(--white)',
      duration: 0.2,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  return (
    <Link
      to={to || '#'}
      className={className}
      ref={navRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </Link>
  );
};

export default AnimatedNavItem;
