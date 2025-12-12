import React from 'react';
import { Link } from 'react-router-dom';
import EmailCopyNotification from '../components/EmailCopyNotification';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { useSEO } from '../hooks/useSEO';
import useEmailCopy from '../hooks/useEmailCopy';
import soundManager from '../utils/soundManager';

const Projects = () => {
  const { showNotification, setShowNotification, handleEmailCopy } = useEmailCopy();
  useSEO({
    title: 'Projects | Daniel Trinh - Front-end Web Developer',
    description: 'Selected projects by Daniel Trinh: case studies in UI/UX, React, and front-end development including myBCIT redesign, portfolio design, Jam music app, and PlayPal newsletter.',
    keywords: ['Daniel Trinh projects','UI/UX case study','front-end projects','React','Vancouver developer'],
    image: '/imgs/dt-logo.png',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, url: '/projects/wordly', name: 'Wordly' },
        { '@type': 'ListItem', position: 2, url: '/projects/mybcit-redesign', name: 'myBCIT Redesign' }
      ]
    }
  });

  return (
    <main className="main-container">
      <Nav onContactClick={handleEmailCopy} />
      <div className="main-content">
        <div className="project-list">
          <div className="project-item" onMouseEnter={() => soundManager.playHover()}>
            <div className="project-year">2025</div>
            <Link to="/projects/wordly" className="project-title" onClick={() => soundManager.playClick()}>Wordly</Link>
            <div className="project-category">Design / Dev</div>
            <div className="project-stack">
              <div className="project-stack-react">react</div>
              <div className="project-stack-tailwind">tailwind</div>
              <div className="project-stack-figma">figma</div>
            </div>
          </div>
          <div className="project-item" onMouseEnter={() => soundManager.playHover()}>
            <div className="project-year">2025</div>
            <Link to="/projects/architecture-portfolio" className="project-title" onClick={() => soundManager.playClick()}>Architecture Portfolio</Link>
            <div className="project-category">Design / Dev</div>
            <div className="project-stack">
              <div className="project-stack-next">next</div>
              <div className="project-stack-tailwind">tailwind</div>
              <div className="project-stack-framer">motion</div>
              <div className="project-stack-figma">figma</div>
            </div>  
          </div>
          <div className="project-item" onMouseEnter={() => soundManager.playHover()}>
            <div className="project-year">2025</div>
            <Link to="/projects/mybcit-redesign" className="project-title" onClick={() => soundManager.playClick()}>myBCIT Redesign</Link>
            <div className="project-category">UI/UX Design</div>
            <div className="project-stack">
              <div className="project-stack-figma">figma</div>
            </div>
          </div>
          {/* <div className="project-item disabled" aria-disabled="true" style={{opacity: 0.5}}>
            <div className="project-year">2025</div>
            <div className="project-title" style={{pointerEvents: 'none'}}>Jams Music App</div>
            <div className="project-category">UI/UX Design</div>
            <div className="project-stack">
              <div className="project-stack-figma">figma</div>
            </div>
          </div> */}
          {/* <div className="project-item disabled" aria-disabled="true" style={{opacity: 0.5}}>
            <div className="project-year">2025</div>
            <div className="project-title" style={{pointerEvents: 'none'}}>PlayPal Newsletter</div>
            <div className="project-category">Design / Dev</div>
            <div className="project-stack">
              <div className="project-stack-html">html</div>
              <div className="project-stack-figma">figma</div>
            </div>
          </div> */}
          <div className="project-item disabled" aria-disabled="true" style={{opacity: 0.5}}>
            <div className="project-year">2025</div>
            <div className="project-title" style={{pointerEvents: 'none'}}>My Portfolio</div>
            <div className="project-category">Design / Dev</div>
            <div className="project-stack">
              <div className="project-stack-react">react</div>
              <div className="project-stack-scss">scss</div>
              <div className="project-stack-gsap">gsap</div>
              <div className="project-stack-figma">figma</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <EmailCopyNotification show={showNotification} onClose={() => setShowNotification(false)} />
    </main>
  );
};

export default Projects;
