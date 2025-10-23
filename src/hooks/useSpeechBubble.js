import { useState, useEffect, useRef, useCallback } from 'react';
import soundManager from '../utils/soundManager';

const MESSAGES = {
  WELCOME: 'Welcome to my site!',
  DEFAULT: 'I am looking for internships!',
  UPVOTE: 'Thank you for enjoying!',
  DOWNVOTE: 'Thank you. I will work hard!',
  ABOUT: 'Learn about me & my journey!',
  PROJECTS: 'Check out the work I\'ve done!',
  WIP: 'WIP'
};

export const useSpeechBubble = () => {
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [animationKey, setAnimationKey] = useState(0);
  const timeoutRef = useRef(null);
  const revertTimeoutRef = useRef(null);
  const isHoveringRef = useRef(false);
  const hasUserInteractedRef = useRef(false);
  const interactionTimeoutRef = useRef(null);

  // Clear any pending timeouts
  const clearTimeouts = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (revertTimeoutRef.current) {
      clearTimeout(revertTimeoutRef.current);
      revertTimeoutRef.current = null;
    }
    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current);
      interactionTimeoutRef.current = null;
    }
  }, []);

  // Update message and play sound
  const updateMessage = useCallback((newMessage, playSound = true) => {
    setMessage(newMessage);
    setAnimationKey(prev => prev + 1);
    if (playSound) {
      soundManager.playMessage();
    }
  }, []);

  // Revert to default message
  const revertToDefault = useCallback(() => {
    if (!isHoveringRef.current) {
      updateMessage(MESSAGES.DEFAULT);
    }
  }, [updateMessage]);

  // Initialize welcome sequence
  useEffect(() => {
    // Show welcome message immediately
    updateMessage(MESSAGES.WELCOME, false);
    
    // Track user interactions (clicks, key presses, mouse movement, touch) for 3 seconds
    const markUserInteraction = () => {
      hasUserInteractedRef.current = true;
    };

    // Add event listeners for user interactions
    window.addEventListener('click', markUserInteraction);
    window.addEventListener('keydown', markUserInteraction);
    window.addEventListener('mousemove', markUserInteraction);
    window.addEventListener('touchstart', markUserInteraction);

    // After 3 seconds, stop tracking interactions
    interactionTimeoutRef.current = setTimeout(() => {
      window.removeEventListener('click', markUserInteraction);
      window.removeEventListener('keydown', markUserInteraction);
      window.removeEventListener('mousemove', markUserInteraction);
      window.removeEventListener('touchstart', markUserInteraction);
    }, 3000);
    
    // Change to default message after 3 seconds, play sound if user interacted
    timeoutRef.current = setTimeout(() => {
      updateMessage(MESSAGES.DEFAULT, hasUserInteractedRef.current);
    }, 3000);

    return () => {
      clearTimeouts();
      window.removeEventListener('click', markUserInteraction);
      window.removeEventListener('keydown', markUserInteraction);
      window.removeEventListener('mousemove', markUserInteraction);
      window.removeEventListener('touchstart', markUserInteraction);
    };
  }, [updateMessage, clearTimeouts]);

  // Handle vote messages
  const handleUpvote = useCallback(() => {
    clearTimeouts();
    updateMessage(MESSAGES.UPVOTE, false);
    
    // Revert after 3 seconds
    revertTimeoutRef.current = setTimeout(revertToDefault, 3000);
  }, [updateMessage, revertToDefault, clearTimeouts]);

  const handleDownvote = useCallback(() => {
    clearTimeouts();
    updateMessage(MESSAGES.DOWNVOTE, false);
    
    // Revert after 3 seconds
    revertTimeoutRef.current = setTimeout(revertToDefault, 3000);
  }, [updateMessage, revertToDefault, clearTimeouts]);

  // Handle navigation hover
  const handleNavHover = useCallback((navType) => {
    isHoveringRef.current = true;
    clearTimeouts();
    
    let hoverMessage = MESSAGES.WIP;
    
    switch(navType) {
      case 'about':
        hoverMessage = MESSAGES.ABOUT;
        break;
      case 'projects':
        hoverMessage = MESSAGES.PROJECTS;
        break;
      case 'workflow':
      case 'contact':
        hoverMessage = MESSAGES.WIP;
        break;
      default:
        return;
    }
    
    updateMessage(hoverMessage, false);
  }, [updateMessage, clearTimeouts]);

  // Handle navigation hover end
  const handleNavHoverEnd = useCallback(() => {
    isHoveringRef.current = false;
    clearTimeouts();
    
    // Revert after 3 seconds
    revertTimeoutRef.current = setTimeout(revertToDefault, 3000);
  }, [revertToDefault, clearTimeouts]);

  return {
    message,
    isVisible,
    animationKey,
    handleUpvote,
    handleDownvote,
    handleNavHover,
    handleNavHoverEnd
  };
};

