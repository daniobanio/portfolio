import { useState, useEffect, useRef, useCallback } from 'react';
import soundManager from '../utils/soundManager';

const MESSAGES = {
  WELCOME: 'Welcome to my site!',
  MOVE_INSTRUCTION: 'Move me with\nW A S D!',
  FINAL: 'I am looking for internships!',
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
  const hideTimeoutRef = useRef(null);
  const isHoveringRef = useRef(false);
  const hasUserInteractedRef = useRef(false);
  const interactionTimeoutRef = useRef(null);
  const hasUserMovedRef = useRef(false);
  const currentStateRef = useRef('welcome'); // 'welcome', 'move', 'final', 'hidden'

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
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
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

  // Revert to default message based on current state
  const revertToDefault = useCallback(() => {
    if (!isHoveringRef.current) {
      if (currentStateRef.current === 'move') {
        updateMessage(MESSAGES.MOVE_INSTRUCTION, false);
      } else if (currentStateRef.current === 'final') {
        updateMessage(MESSAGES.FINAL, false);
      }
    }
  }, [updateMessage]);

  // Handle when user first moves the character
  const handleCharacterMoved = useCallback(() => {
    if (!hasUserMovedRef.current) {
      hasUserMovedRef.current = true;
      currentStateRef.current = 'final';
      
      setIsVisible(true);
      updateMessage(MESSAGES.FINAL);
      
      // Hide after 5 seconds
      hideTimeoutRef.current = setTimeout(() => {
        setIsVisible(false);
        currentStateRef.current = 'hidden';
      }, 5000);
    }
  }, [updateMessage]);

  // Initialize welcome sequence
  useEffect(() => {
    // Show welcome message immediately
    currentStateRef.current = 'welcome';
    updateMessage(MESSAGES.WELCOME, false);
    
    // Track user interactions (clicks, key presses, mouse movement, touch) for 2 seconds
    const markUserInteraction = () => {
      hasUserInteractedRef.current = true;
    };

    // Add event listeners for user interactions
    window.addEventListener('click', markUserInteraction);
    window.addEventListener('keydown', markUserInteraction);
    window.addEventListener('mousemove', markUserInteraction);
    window.addEventListener('touchstart', markUserInteraction);

    // After 2 seconds, stop tracking interactions
    interactionTimeoutRef.current = setTimeout(() => {
      window.removeEventListener('click', markUserInteraction);
      window.removeEventListener('keydown', markUserInteraction);
      window.removeEventListener('mousemove', markUserInteraction);
      window.removeEventListener('touchstart', markUserInteraction);
    }, 2000);
    
    // Change to move instruction after 2 seconds, play sound if user interacted
    // BUT only if user hasn't already moved
    timeoutRef.current = setTimeout(() => {
      if (!hasUserMovedRef.current) {
        currentStateRef.current = 'move';
        updateMessage(MESSAGES.MOVE_INSTRUCTION, hasUserInteractedRef.current);
      }
    }, 2000);

    return () => {
      clearTimeouts();
      window.removeEventListener('click', markUserInteraction);
      window.removeEventListener('keydown', markUserInteraction);
      window.removeEventListener('mousemove', markUserInteraction);
      window.removeEventListener('touchstart', markUserInteraction);
    };
  }, [updateMessage, clearTimeouts]);

  // Show temporary message and revert after delay
  const showTemporaryMessage = useCallback((messageText) => {
    clearTimeouts();
    setIsVisible(true);
    updateMessage(messageText, false);
    
    revertTimeoutRef.current = setTimeout(() => {
      if (currentStateRef.current === 'hidden') {
        setIsVisible(false);
      } else {
        revertToDefault();
      }
    }, 3000);
  }, [updateMessage, revertToDefault, clearTimeouts]);

  // Handle vote messages
  const handleUpvote = useCallback(() => {
    showTemporaryMessage(MESSAGES.UPVOTE);
  }, [showTemporaryMessage]);

  const handleDownvote = useCallback(() => {
    showTemporaryMessage(MESSAGES.DOWNVOTE);
  }, [showTemporaryMessage]);

  // Handle navigation hover
  const handleNavHover = useCallback((navType) => {
    const messageMap = {
      about: MESSAGES.ABOUT,
      projects: MESSAGES.PROJECTS,
      workflow: MESSAGES.WIP,
      contact: MESSAGES.WIP
    };
    
    const hoverMessage = messageMap[navType];
    if (hoverMessage) {
      isHoveringRef.current = true;
      showTemporaryMessage(hoverMessage);
    }
  }, [showTemporaryMessage]);

  // Handle navigation hover end
  const handleNavHoverEnd = useCallback(() => {
    isHoveringRef.current = false;
    clearTimeouts();
    
    revertTimeoutRef.current = setTimeout(() => {
      if (currentStateRef.current === 'hidden') {
        setIsVisible(false);
      } else {
        revertToDefault();
      }
    }, 3000);
  }, [revertToDefault, clearTimeouts]);

  return {
    message,
    isVisible,
    animationKey,
    handleUpvote,
    handleDownvote,
    handleNavHover,
    handleNavHoverEnd,
    handleCharacterMoved
  };
};

