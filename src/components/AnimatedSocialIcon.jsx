import React, { useRef } from 'react';
import { gsap } from 'gsap';
import soundManager from '../utils/soundManager';

const AnimatedSocialIcon = ({ href, icon, width = "32", height = "32", style = {}, label, disabled = false }) => {
  const iconRef = useRef(null);

  const handleMouseEnter = () => {
    if (disabled) return;
    soundManager.playHover();
    gsap.to(iconRef.current, {
      scale: 1.1,
      y: -3,
      duration: 0.2,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    if (disabled) return;
    gsap.to(iconRef.current, {
      scale: 1,
      y: 0,
      duration: 0.2,
      ease: "power2.out"
    });
  };

  const handleClick = (e) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    soundManager.playClick();
  };

  return (
    <a 
      href={disabled ? "#" : href} 
      target={disabled ? undefined : "_blank"} 
      rel={disabled ? undefined : "noopener noreferrer"}
      ref={iconRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      title={label}
      aria-label={label}
      aria-disabled={disabled}
      className={disabled ? 'disabled' : ''}
      style={{ 
        opacity: disabled ? 0.5 : 1,
        pointerEvents: disabled ? 'auto' : 'auto'
      }}
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
