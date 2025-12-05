import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Project1Detail from './pages/Project1Detail';
import Project2Detail from './pages/Project2Detail';
import Project3Detail from './pages/Project3Detail';
import Project4Detail from './pages/Project4Detail';
import Project5Detail from './pages/Project5Detail';
import ScrollToTop from './components/ScrollToTop';
import LenisSmoothScroll from './components/LenisSmoothScroll';
import { gsap } from 'gsap';

// GSAP context for managing animations
gsap.registerPlugin();

function App() {
  return (
    <Router>
      <LenisSmoothScroll>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/mybcit-redesign" element={<Project1Detail />} />
          <Route path="/projects/kim-huynh-portfolio" element={<Project2Detail />} />
          <Route path="/projects/jam-music-app" element={<Project3Detail />} />
          <Route path="/projects/playpal-newsletter" element={<Project4Detail />} />
          <Route path="/projects/wordly" element={<Project5Detail />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </LenisSmoothScroll>
    </Router>
  );
}

export default App;
