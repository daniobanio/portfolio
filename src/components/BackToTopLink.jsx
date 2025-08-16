import React, { useEffect, useState, useCallback } from 'react';

const BackToTopLink = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [leftPositionPx, setLeftPositionPx] = useState(0);

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
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    updateLeftPosition();
    window.addEventListener('resize', updateLeftPosition);
    return () => window.removeEventListener('resize', updateLeftPosition);
  }, [updateLeftPosition]);

  const handleClick = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <a
      href="#"
      className="back-to-top-link"
      style={{ left: leftPositionPx }}
      onClick={handleClick}
    >
      BACK TO TOP
    </a>
  );
};

export default BackToTopLink;


