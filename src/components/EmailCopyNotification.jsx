import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const EmailCopyNotification = ({ show, onClose }) => {
  const notificationRef = useRef(null);
  const hasAnimatedRef = useRef(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (show && notificationRef.current && !hasAnimatedRef.current) {
      hasAnimatedRef.current = true;
      
      // Animate in - use overwrite to prevent interruption
      gsap.fromTo(notificationRef.current, 
        { opacity: 0, y: -10 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.3, 
          ease: 'power2.out',
          overwrite: true
        }
      );

      // Auto-dismiss after 2 seconds
      timerRef.current = setTimeout(() => {
        if (notificationRef.current) {
          gsap.to(notificationRef.current, {
            opacity: 0,
            y: -10,
            duration: 0.3,
            ease: 'power2.in',
            overwrite: true,
            onComplete: () => {
              hasAnimatedRef.current = false;
              onClose();
            }
          });
        }
      }, 2000);
    } else if (!show) {
      // Reset when hidden so it can animate again next time
      hasAnimatedRef.current = false;
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [show]);

  if (!show) return null;

  return (
    <div
      ref={notificationRef}
      className="email-copy-notification"
    >
      Copied email!
    </div>
  );
};

export default EmailCopyNotification;

