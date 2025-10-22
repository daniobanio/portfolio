import React, { useRef } from 'react';
import { gsap } from 'gsap';
import soundManager from '../utils/soundManager';

const AnimatedSocialIcon = ({ href, icon, width = "32", height = "32", style = {} }) => {
  const iconRef = useRef(null);

  const handleMouseEnter = () => {
    soundManager.playHover();
    gsap.to(iconRef.current, {
      scale: 1.1,
      y: -3,
      duration: 0.2,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    gsap.to(iconRef.current, {
      scale: 1,
      y: 0,
      duration: 0.2,
      ease: "power2.out"
    });
  };

  const handleClick = () => {
    soundManager.playClick();
  };

  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      ref={iconRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <iconify-icon 
        icon={icon} 
        width={width} 
        height={height} 
        style={style}
      />
    </a>
  );
};

export default AnimatedSocialIcon;
