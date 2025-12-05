import React, { useEffect, useState, useCallback } from 'react';
import soundManager from '../utils/soundManager';
import { useLenis } from './LenisSmoothScroll';

const BackToTopLink = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [leftPositionPx, setLeftPositionPx] = useState(0);
  const lenis = useLenis();

  const updateLeftPosition = useCallback(() => {
    const container = document.querySelector('.main-container');
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const desiredLeft = rect.right + 12;
    const maxLeft = window.innerWidth - 140;
    setLeftPositionPx(Math.min(desiredLeft, maxLeft));
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (lenis) {
        setIsVisible(lenis.scroll > 300);
      } else {
        setIsVisible(window.scrollY > 300);
      }
    };
    
    if (lenis) {
      lenis.on('scroll', onScroll);
      onScroll();
      return () => {
        lenis.off('scroll', onScroll);
      };
    } else {
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
      return () => window.removeEventListener('scroll', onScroll);
    }
  }, [lenis]);

  useEffect(() => {
    updateLeftPosition();
    window.addEventListener('resize', updateLeftPosition);
    return () => window.removeEventListener('resize', updateLeftPosition);
  }, [updateLeftPosition]);

  const handleClick = (e) => {
    e.preventDefault();
    soundManager.playClick();
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleMouseEnter = () => {
    soundManager.playHover();
  };

  if (!isVisible) return null;

  return (
    <a
      href="#"
      className="back-to-top-link"
      style={{ left: leftPositionPx }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
    >
      BACK TO TOP
    </a>
  );
};

export default BackToTopLink;


