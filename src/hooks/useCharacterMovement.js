import { useState, useEffect, useRef, useCallback } from 'react';
import soundManager from '../utils/soundManager';

// Physics constants defined per-frame at 60 FPS (intuitive values)
const PHYSICS_FRAME_RATE = 60;
const MOVEMENT_SPEED_PER_FRAME = 4; // pixels per frame
const JUMP_VELOCITY_PER_FRAME = 15.5; // pixels per frame (initial upward velocity)
const GRAVITY_PER_FRAME = 60; // pixels per frame per frame (downward acceleration)
const GROUND_Y = 0;

// Convert to per-second for delta time scaling
const MOVEMENT_SPEED = MOVEMENT_SPEED_PER_FRAME * PHYSICS_FRAME_RATE;
const JUMP_STRENGTH = JUMP_VELOCITY_PER_FRAME * PHYSICS_FRAME_RATE;
const GRAVITY = GRAVITY_PER_FRAME * PHYSICS_FRAME_RATE;

// Delta time clamping
const MIN_DELTA = 0.001; // 1ms - prevent division issues
const MAX_DELTA = 0.1; // 100ms - prevent huge jumps when tab regains focus

// Emote mappings
const EMOTES = {
  '1': 'cry',
  '2': 'cute',
  '3': 'f3',
  '4': 'freaky',
  '5': 'love',
  '6': 'snooze'
};

export const useCharacterMovement = (containerRef, onFirstMove, onFirstEmote) => {
  const [characterImage, setCharacterImage] = useState('/imgs/character/standing.gif');
  
  // Physics state in refs (no re-renders)
  const positionRef = useRef({ x: 0, y: GROUND_Y });
  const velocityY = useRef(0);
  const directionRef = useRef('left');
  const animationStateRef = useRef('standing');
  const isJumpingRef = useRef(false);
  
  // Control and timing refs
  const keysPressed = useRef(new Set());
  const animationFrameRef = useRef(null);
  const lastTimeRef = useRef(0);
  const boundariesRef = useRef({ left: 0, right: 0 });
  const hasMovedRef = useRef(false);
  const hasEmotedRef = useRef(false);
  const containerElementRef = useRef(null);
  const characterImageRef = useRef(null);
  
  // Emote state
  const currentEmoteRef = useRef(null);
  const emoteTimeoutRef = useRef(null);

  // Calculate boundaries based on container
  const updateBoundaries = useCallback(() => {
    if (containerRef?.current) {
      const container = containerRef.current;
      const containerWidth = container.offsetWidth;
      const characterWidth = 120; // approximate character width
      
      boundariesRef.current = {
        left: -containerWidth / 2 + characterWidth / 2,
        right: containerWidth / 2 - characterWidth / 2
      };
    }
  }, [containerRef]);

  // Update boundaries on mount and window resize
  useEffect(() => {
    updateBoundaries();
    window.addEventListener('resize', updateBoundaries);
    return () => window.removeEventListener('resize', updateBoundaries);
  }, [updateBoundaries]);

  // Update animation state and character image (only re-renders when image changes)
  const updateAnimationState = useCallback((newState, emote = null) => {
    if (animationStateRef.current === newState && currentEmoteRef.current === emote) return;
    
    animationStateRef.current = newState;
    currentEmoteRef.current = emote;
    
    let newImage;
    const emotePath = emote ? `/imgs/character/emotes/${emote}/` : '/imgs/character/';
    
    switch (newState) {
      case 'jumping':
        newImage = `${emotePath}jump.png`;
        break;
      case 'prone':
        newImage = `${emotePath}prone.png`;
        break;
      case 'walking':
        newImage = `${emotePath}walking.gif`;
        break;
      case 'standing':
      default:
        newImage = `${emotePath}standing.gif`;
    }
    
    setCharacterImage(newImage);
  }, []);

  // Trigger an emote
  const triggerEmote = useCallback((emoteName) => {
    // Clear any existing emote timeout
    if (emoteTimeoutRef.current) {
      clearTimeout(emoteTimeoutRef.current);
    }
    
    // Call onFirstEmote callback on first emote
    if (!hasEmotedRef.current && onFirstEmote) {
      hasEmotedRef.current = true;
      onFirstEmote();
    }
    
    // Set the emote based on current animation state
    const currentState = animationStateRef.current;
    updateAnimationState(currentState, emoteName);
    
    // Clear the emote after 3 seconds
    emoteTimeoutRef.current = setTimeout(() => {
      const state = animationStateRef.current;
      updateAnimationState(state, null);
      emoteTimeoutRef.current = null;
    }, 3000);
  }, [onFirstEmote, updateAnimationState]);

  // Handle touch interactions for mobile
  useEffect(() => {
    // Only for mobile
    const isMobile = window.innerWidth <= 600;
    if (!isMobile) return;

    const container = containerElementRef.current;
    if (!container) return;

    let isTouching = false;
    let startTouchY = 0;

    const handleTouchStart = (e) => {
      // Prevent scrolling when touching the container
      if (e.target.closest('.hero-container')) {
        e.preventDefault();
        isTouching = true;
      }

      const touch = e.touches[0];
      startTouchY = touch.clientY;
      
      const containerRect = container.getBoundingClientRect();
      const characterRect = characterImageRef.current?.getBoundingClientRect();
      
      if (!characterRect) return;

      const characterCenter = characterRect.left + characterRect.width / 2;
      const touchX = touch.clientX;

      // Determine direction
      const direction = touchX < characterCenter ? 'left' : 'right';
      
      // Initial move
      if (['w', 'a', 's', 'd'].includes(direction === 'left' ? 'a' : 'd')) {
        keysPressed.current.add(direction === 'left' ? 'a' : 'd');
        
        // Call onFirstMove callback
        if (!hasMovedRef.current && onFirstMove) {
          hasMovedRef.current = true;
          onFirstMove();
        }
      }
    };

    const handleTouchEnd = (e) => {
      e.preventDefault(); // Continue preventing default
      isTouching = false;
      // Clear movement keys
      keysPressed.current.delete('a');
      keysPressed.current.delete('d');
    };

    const handleTouchMove = (e) => {
      // Prevent scrolling
      if (isTouching) {
        e.preventDefault();
      }

      const touch = e.touches[0];
      const characterRect = characterImageRef.current?.getBoundingClientRect();
      
      if (!characterRect) return;

      // Check for upward motion (jump)
      // If current touch Y is significantly less than start touch Y (moving up)
      if (startTouchY - touch.clientY > 50 && !isJumpingRef.current) {
        isJumpingRef.current = true;
        velocityY.current = -JUMP_STRENGTH;
        updateAnimationState('jumping', currentEmoteRef.current);
        soundManager.playJump();
        // Reset start Y to prevent multiple jumps from one swipe
        startTouchY = touch.clientY; 
      }

      const characterCenter = characterRect.left + characterRect.width / 2;
      const touchX = touch.clientX;
      const direction = touchX < characterCenter ? 'left' : 'right';

      // Update keys based on new position relative to character
      keysPressed.current.delete('a');
      keysPressed.current.delete('d');
      keysPressed.current.add(direction === 'left' ? 'a' : 'd');
    };

    // Use { passive: false } to allow preventDefault for scrolling
    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('touchmove', handleTouchMove);
    };
  }, [onFirstMove, updateAnimationState]);
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      
      // Handle emote keys 1-6
      if (EMOTES[key]) {
        e.preventDefault();
        triggerEmote(EMOTES[key]);
        return;
      }
      
      if (['w', 'a', 's', 'd'].includes(key)) {
        e.preventDefault();
        keysPressed.current.add(key);

        // Call onFirstMove callback on first movement
        if (!hasMovedRef.current && onFirstMove) {
          hasMovedRef.current = true;
          onFirstMove();
        }

        // Handle jump (W key) - Use ref for immediate response
        if (key === 'w' && !isJumpingRef.current) {
          isJumpingRef.current = true;
          velocityY.current = -JUMP_STRENGTH;
          updateAnimationState('jumping', currentEmoteRef.current);
          soundManager.playJump();
        }
      }
    };

    const handleKeyUp = (e) => {
      const key = e.key.toLowerCase();
      if (['w', 'a', 's', 'd'].includes(key)) {
        keysPressed.current.delete(key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [onFirstMove, updateAnimationState, triggerEmote]);

  // High-performance game loop - updates refs and DOM directly
  useEffect(() => {
    const gameLoop = (currentTime) => {
      // Calculate delta time in seconds
      if (lastTimeRef.current === 0) {
        lastTimeRef.current = currentTime;
      }
      const deltaMs = currentTime - lastTimeRef.current;
      lastTimeRef.current = currentTime;
      
      // Convert to seconds and clamp to prevent huge jumps
      const deltaTime = Math.max(MIN_DELTA, Math.min(deltaMs / 1000, MAX_DELTA));

      // Get current position from ref
      const pos = positionRef.current;
      let newX = pos.x;
      let newY = pos.y;

      // Check key states
      const isMovingLeft = keysPressed.current.has('a');
      const isMovingRight = keysPressed.current.has('d');
      const isProne = keysPressed.current.has('s');

      // Horizontal movement - pixels per second scaled by delta
      if (isMovingLeft && !isMovingRight && !isProne) {
        newX -= MOVEMENT_SPEED * deltaTime;
        directionRef.current = 'left';
        if (!isJumpingRef.current) {
          updateAnimationState('walking', currentEmoteRef.current);
        }
      } else if (isMovingRight && !isMovingLeft && !isProne) {
        newX += MOVEMENT_SPEED * deltaTime;
        directionRef.current = 'right';
        if (!isJumpingRef.current) {
          updateAnimationState('walking', currentEmoteRef.current);
        }
      } else if (isProne && !isJumpingRef.current) {
        updateAnimationState('prone', currentEmoteRef.current);
      } else if (!isJumpingRef.current && !isProne) {
        updateAnimationState('standing', currentEmoteRef.current);
      }

      // Apply boundaries
      newX = Math.max(boundariesRef.current.left, Math.min(newX, boundariesRef.current.right));

      // Jump physics - gravity in pixels per second squared
      if (isJumpingRef.current) {
        velocityY.current += GRAVITY * deltaTime;
        newY += velocityY.current * deltaTime;

        // Land on ground
        if (newY >= GROUND_Y) {
          newY = GROUND_Y;
          velocityY.current = 0;
          isJumpingRef.current = false;
          
          // Return to appropriate state after landing
          if (isProne) {
            updateAnimationState('prone', currentEmoteRef.current);
          } else if (isMovingLeft || isMovingRight) {
            updateAnimationState('walking', currentEmoteRef.current);
          } else {
            updateAnimationState('standing', currentEmoteRef.current);
          }
        }
      }

      // Update position ref
      positionRef.current = { x: newX, y: newY };

      // Directly update DOM - separate position and direction transforms
      if (containerElementRef.current) {
        containerElementRef.current.style.transform = `translate(${newX}px, ${newY}px)`;
      }
      
      if (characterImageRef.current) {
        const scaleX = directionRef.current === 'right' ? -1 : 1;
        characterImageRef.current.style.transform = `scaleX(${scaleX})`;
      }

      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    animationFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [updateAnimationState]);

  // Ref callbacks for container and character image
  const setContainerElement = useCallback((element) => {
    containerElementRef.current = element;
  }, []);

  const setCharacterImageElement = useCallback((element) => {
    characterImageRef.current = element;
  }, []);

  // Cleanup emote timeout on unmount
  useEffect(() => {
    return () => {
      if (emoteTimeoutRef.current) {
        clearTimeout(emoteTimeoutRef.current);
      }
    };
  }, []);

  return {
    containerRef: setContainerElement,
    characterRef: setCharacterImageElement,
    characterImage,
    directionRef,
    positionRef,
    triggerEmote
  };
};

