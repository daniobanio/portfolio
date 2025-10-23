import { useState, useEffect, useRef, useCallback } from 'react';
import soundManager from '../utils/soundManager';

const MOVEMENT_SPEED = 2;
const JUMP_STRENGTH = 10;
const GRAVITY = 0.2;
const GROUND_Y = 0;

export const useCharacterMovement = (containerRef, onFirstMove) => {
  const [position, setPosition] = useState({ x: 0, y: GROUND_Y });
  const [direction, setDirection] = useState('left'); // 'left' or 'right'
  const [animationState, setAnimationState] = useState('standing'); // 'standing', 'walking', 'jumping', 'prone'
  const [isJumping, setIsJumping] = useState(false);
  
  const keysPressed = useRef(new Set());
  const velocityY = useRef(0);
  const animationFrameRef = useRef(null);
  const boundariesRef = useRef({ left: 0, right: 0 });
  const hasMovedRef = useRef(false);

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

  // Get current character image based on state
  const getCharacterImage = useCallback(() => {
    switch (animationState) {
      case 'jumping':
        return '/imgs/character/jump.png';
      case 'prone':
        return '/imgs/character/prone.png';
      case 'walking':
        return '/imgs/character/walking.gif';
      case 'standing':
      default:
        return '/imgs/character/standing.gif';
    }
  }, [animationState]);

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

        // Handle jump (W key)
        if (key === 'w' && !isJumping) {
          setIsJumping(true);
          velocityY.current = -JUMP_STRENGTH;
          setAnimationState('jumping');
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
  }, [isJumping, onFirstMove]);

  // Game loop for movement and physics
  useEffect(() => {
    const gameLoop = () => {
      setPosition((prev) => {
        let newX = prev.x;
        let newY = prev.y;
        let newDirection = direction;
        let newAnimationState = animationState;

        // Horizontal movement (A and D keys)
        const isMovingLeft = keysPressed.current.has('a');
        const isMovingRight = keysPressed.current.has('d');
        const isProne = keysPressed.current.has('s');

        if (isMovingLeft && !isMovingRight && !isProne) {
          newX -= MOVEMENT_SPEED;
          newDirection = 'left';
          if (!isJumping) {
            newAnimationState = 'walking';
          }
        } else if (isMovingRight && !isMovingLeft && !isProne) {
          newX += MOVEMENT_SPEED;
          newDirection = 'right';
          if (!isJumping) {
            newAnimationState = 'walking';
          }
        } else if (isProne && !isJumping) {
          // Prone state (holding S)
          newAnimationState = 'prone';
        } else if (!isJumping && !isProne) {
          // Standing still
          newAnimationState = 'standing';
        }

        // Apply boundaries
        newX = Math.max(boundariesRef.current.left, Math.min(newX, boundariesRef.current.right));

        // Jump physics
        if (isJumping) {
          velocityY.current += GRAVITY;
          newY += velocityY.current;

          // Land on ground
          if (newY >= GROUND_Y) {
            newY = GROUND_Y;
            velocityY.current = 0;
            setIsJumping(false);
            
            // Return to appropriate state after landing
            if (keysPressed.current.has('s')) {
              newAnimationState = 'prone';
            } else if (keysPressed.current.has('a') || keysPressed.current.has('d')) {
              newAnimationState = 'walking';
            } else {
              newAnimationState = 'standing';
            }
          }
        }

        // Update direction if changed
        if (newDirection !== direction) {
          setDirection(newDirection);
        }

        // Update animation state if changed
        if (newAnimationState !== animationState) {
          setAnimationState(newAnimationState);
        }

        return { x: newX, y: newY };
      });

      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    animationFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [direction, animationState, isJumping]);

  return {
    position,
    direction,
    characterImage: getCharacterImage(),
    animationState
  };
};

