import React, { useEffect, createContext, useContext, useState } from 'react';
import Lenis from 'lenis';
import { useLocation } from 'react-router-dom';

const LenisContext = createContext(null);

export const useLenis = () => {
  const context = useContext(LenisContext);
  return context;
};

const LenisSmoothScroll = ({ children }) => {
  const [lenis, setLenis] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    setLenis(lenisInstance);

    function raf(time) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenisInstance.destroy();
      setLenis(null);
    };
  }, []);

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [location.pathname, lenis]);

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
};

export default LenisSmoothScroll;
