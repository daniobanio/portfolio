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

export const useCharacterMovement = (containerRef, onFirstMove) => {
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
  const containerElementRef = useRef(null);
  const characterImageRef = useRef(null);

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
  const updateAnimationState = useCallback((newState) => {
    if (animationStateRef.current === newState) return;
    
    animationStateRef.current = newState;
    
    let newImage;
    switch (newState) {
      case 'jumping':
        newImage = '/imgs/character/jump.png';
        break;
      case 'prone':
        newImage = '/imgs/character/prone.png';
        break;
      case 'walking':
        newImage = '/imgs/character/walking.gif';
        break;
      case 'standing':
      default:
        newImage = '/imgs/character/standing.gif';
    }
    
    setCharacterImage(newImage);
  }, []);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
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
          updateAnimationState('jumping');
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
  }, [onFirstMove, updateAnimationState]);

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
          updateAnimationState('walking');
        }
      } else if (isMovingRight && !isMovingLeft && !isProne) {
        newX += MOVEMENT_SPEED * deltaTime;
        directionRef.current = 'right';
        if (!isJumpingRef.current) {
          updateAnimationState('walking');
        }
      } else if (isProne && !isJumpingRef.current) {
        updateAnimationState('prone');
      } else if (!isJumpingRef.current && !isProne) {
        updateAnimationState('standing');
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
            updateAnimationState('prone');
          } else if (isMovingLeft || isMovingRight) {
            updateAnimationState('walking');
          } else {
            updateAnimationState('standing');
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

  return {
    containerRef: setContainerElement,
    characterRef: setCharacterImageElement,
    characterImage,
    directionRef,
    positionRef
  };
};

