import { useState, useEffect, useRef, useCallback } from 'react';
import soundManager from '../utils/soundManager';

const MESSAGES = {
  WELCOME: 'Welcome to my site!',
  DEFAULT: 'I am looking for internships!',
  UPVOTE: 'Thank you for visiting!',
  DOWNVOTE: 'Thank you. I will work hard!',
  ABOUT: 'Learn about me & my journey!',
  PROJECTS: 'Check out the work I\'ve done!',
  WIP: 'WIP'
};

export const useSpeechBubble = () => {
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const timeoutRef = useRef(null);
  const revertTimeoutRef = useRef(null);
  const isHoveringRef = useRef(false);

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
  }, []);

  // Update message and play sound
  const updateMessage = useCallback((newMessage, playSound = true) => {
    setMessage(newMessage);
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
    
    // Change to default message after 3 seconds
    timeoutRef.current = setTimeout(() => {
      updateMessage(MESSAGES.DEFAULT, false);
    }, 3000);

    return () => clearTimeouts();
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
    handleUpvote,
    handleDownvote,
    handleNavHover,
    handleNavHoverEnd
  };
};

