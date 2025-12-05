import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLenis } from './LenisSmoothScroll';

const ScrollToTop = () => {
  const { pathname, search, hash } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (!hash) {
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      }
    }
  }, [pathname, search, hash, lenis]);

  return null;
};

export default ScrollToTop;


