import { useState, useEffect, useRef, useCallback } from 'react';
import soundManager from '../utils/soundManager';

const MESSAGES = {
  WELCOME: 'Welcome to my site!',
  MOVE_INSTRUCTION: 'Move me with\nW A S D!',
  EMOTE_INSTRUCTION: 'Emote with numbers 1-6!',
  FINAL: 'I am looking for internships!',
  UPVOTE: 'Thank you for enjoying!',
  ABOUT: 'Learn about me & my journey!',
  PROJECTS: 'Check out the work I\'ve done!',
  WIP: 'WIP'
};

export const useSpeechBubble = () => {
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [animationKey, setAnimationKey] = useState(0);
  const timeoutRef = useRef(null);
  const isHoveringRef = useRef(false);
  const hasUserMovedRef = useRef(false);
  const hasUserEmotedRef = useRef(false);
  const currentStateRef = useRef('welcome'); // 'welcome', 'move', 'emote', 'final', 'hidden'

  // Clear any pending timeout
  const clearPendingTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
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

  // Handle when user first moves the character
  const handleCharacterMoved = useCallback(() => {
    if (!hasUserMovedRef.current) {
      hasUserMovedRef.current = true;
      currentStateRef.current = 'emote';
      clearPendingTimeout();
      
      updateMessage(MESSAGES.EMOTE_INSTRUCTION);
    }
  }, [updateMessage, clearPendingTimeout]);

  // Handle when user first emotes
  const handleCharacterEmoted = useCallback(() => {
    if (!hasUserEmotedRef.current) {
      hasUserEmotedRef.current = true;
      currentStateRef.current = 'final';
      clearPendingTimeout();
      
      updateMessage(MESSAGES.FINAL);
      
      // Hide after 5 seconds
      timeoutRef.current = setTimeout(() => {
        setIsVisible(false);
        currentStateRef.current = 'hidden';
      }, 5000);
    }
  }, [updateMessage, clearPendingTimeout]);

  // Initialize welcome sequence
  useEffect(() => {
    currentStateRef.current = 'welcome';
    updateMessage(MESSAGES.WELCOME, false);
    
    // Transition to move instruction after 2 seconds (if user hasn't moved)
    timeoutRef.current = setTimeout(() => {
      if (!hasUserMovedRef.current) {
        currentStateRef.current = 'move';
        updateMessage(MESSAGES.MOVE_INSTRUCTION, true);
      }
    }, 2000);

    return () => clearPendingTimeout();
  }, [updateMessage, clearPendingTimeout]);

  // Show temporary message and handle revert
  const showTemporaryMessage = useCallback((messageText) => {
    clearPendingTimeout();
    setIsVisible(true);
    updateMessage(messageText, false);
    
    timeoutRef.current = setTimeout(() => {
      const state = currentStateRef.current;
      
      if (state === 'move') {
        // Revert to move instruction with sound
        updateMessage(MESSAGES.MOVE_INSTRUCTION, true);
      } else if (state === 'emote') {
        // Revert to emote instruction with sound
        updateMessage(MESSAGES.EMOTE_INSTRUCTION, true);
      } else if (state === 'final' || state === 'hidden') {
        // Hide the bubble
        setIsVisible(false);
      }
    }, 3000);
  }, [updateMessage, clearPendingTimeout]);

  // Handle vote messages
  const handleUpvote = useCallback(() => {
    showTemporaryMessage(MESSAGES.UPVOTE);
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
  }, []);

  return {
    message,
    isVisible,
    animationKey,
    handleUpvote,
    handleNavHover,
    handleNavHoverEnd,
    handleCharacterMoved,
    handleCharacterEmoted
  };
};

