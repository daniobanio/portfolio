import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

export const useNavigation = () => {
  const location = useLocation();
  const navRefs = useRef({});

  const getActiveKeyForPath = (pathname) => {
    if (pathname.startsWith('/project')) {
      return '/projects';
    }
    return pathname || '/';
  };

  const isActive = (path) => getActiveKeyForPath(location.pathname) === path;

  // Register navigation elements and set initial state
  const registerNavElement = (path, element) => {
    if (!element) return;
    navRefs.current[path] = element;
    const activeKey = getActiveKeyForPath(location.pathname);
    const active = path === activeKey;
    gsap.set(element, { opacity: active ? 1 : 0.6 });
  };

  // Update navigation state based on current path
  useEffect(() => {
    const activeKey = getActiveKeyForPath(location.pathname);

    Object.keys(navRefs.current).forEach(path => {
      const element = navRefs.current[path];
      if (!element) return;

      const active = path === activeKey;
      gsap.to(element, {
        opacity: active ? 1 : 0.6,
        duration: 0.25,
        ease: 'power2.out',
      });
    });
  }, [location.pathname]);

  return { registerNavElement, isActive };
};
