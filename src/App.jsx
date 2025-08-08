import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Project1Detail from './pages/Project1Detail';
import Project2Detail from './pages/Project2Detail';
import { gsap } from 'gsap';

// GSAP context for managing animations
gsap.registerPlugin();

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/project1-detail" element={<Project1Detail />} />
        <Route path="/project2-detail" element={<Project2Detail />} />
      </Routes>
    </Router>
  );
}

export default App;
