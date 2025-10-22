import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AnimatedNavItem from '../components/AnimatedNavItem';
import AnimatedSocialIcon from '../components/AnimatedSocialIcon';
import { useNavigation } from '../hooks/useNavigation';
import { useSEO } from '../hooks/useSEO';
import soundManager from '../utils/soundManager';

const Projects = () => {
  const { registerNavElement, isActive } = useNavigation();
  const [preview, setPreview] = useState(null); // { src, top, left }
  useSEO({
    title: 'Projects | Daniel Trinh - Front-end Web Developer',
    description: 'Selected projects by Daniel Trinh: case studies in UI/UX, React, and front-end development including myBCIT redesign, portfolio design, Jam music app, and PlayPal newsletter.',
    keywords: ['Daniel Trinh projects','UI/UX case study','front-end projects','React','Vancouver developer'],
    image: '/imgs/dt-logo.png',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, url: '/projects/mybcit-redesign', name: 'myBCIT Redesign' },
        { '@type': 'ListItem', position: 2, url: '/projects/kim-huynh-portfolio', name: "Kim Huynh's Portfolio" },
        { '@type': 'ListItem', position: 3, url: '/projects/jam-music-app', name: 'Jam Music App' },
        { '@type': 'ListItem', position: 4, url: '/projects/playpal-newsletter', name: 'PlayPal Newsletter' }
      ]
    }
  });

  const handleEnter = (e, src) => {
    const row = e.currentTarget.getBoundingClientRect();
    setPreview({ src, top: row.top + window.scrollY - 20, left: row.right - 300 });
  };
  const handleLeave = () => setPreview(null);

  return (
    <main className="main-container">
      <div className="top-bar">
        <div className="top-bar-title">
          <img className="dt-logo" src="/imgs/dt-logo.png" alt="DT Logo" />
          <p>DANIELT'S CHAT</p>
        </div>
        <p>X</p>
      </div>
      <div className="nav-container">
        <ul className="nav-left">
          <li className="nav-home"><AnimatedNavItem to="/" registerNavElement={registerNavElement} path="/" isActive={isActive}>Home</AnimatedNavItem></li>
        </ul>
        <ul className="nav-right">
          <li><AnimatedNavItem to="/about" registerNavElement={registerNavElement} path="/about" isActive={isActive}>About</AnimatedNavItem></li>
          <li><AnimatedNavItem to="/projects" registerNavElement={registerNavElement} path="/projects" isActive={isActive}>Projects</AnimatedNavItem></li>
          <li><AnimatedNavItem to="#" registerNavElement={registerNavElement} path="/workflow" isActive={isActive} disabled={true}>Workflow</AnimatedNavItem></li>
          <li><AnimatedNavItem to="#" registerNavElement={registerNavElement} path="/contact" isActive={isActive} disabled={true}>Contact</AnimatedNavItem></li>
        </ul>
      </div>
      <div className="main-content">
        <div className="project-list">
          <div className="project-item" onMouseEnter={(e)=>{handleEnter(e, '/imgs/project1/home.webp'); soundManager.playHover();}} onMouseLeave={handleLeave}>
            <div className="project-year">2025</div>
            <Link to="/projects/mybcit-redesign" className="project-title" onClick={() => soundManager.playClick()}>myBCIT Redesign</Link>
            <div className="project-category">UI/UX Design</div>
            <div className="project-stack">
              <div className="project-stack-figma">figma</div>
            </div>
          </div>
          <div className="project-item disabled" aria-disabled="true" style={{opacity: 0.5}}>
            <div className="project-year">2025</div>
            <div className="project-title" style={{pointerEvents: 'none'}}>Kim Huynh Portfolio</div>
            <div className="project-category">UI/UX Design</div>
            <div className="project-stack">
              <div className="project-stack-figma">figma</div>
            </div>  
          </div>
          <div className="project-item disabled" aria-disabled="true" style={{opacity: 0.5}}>
            <div className="project-year">2025</div>
            <div className="project-title" style={{pointerEvents: 'none'}}>Jams Music App</div>
            <div className="project-category">UI/UX Design</div>
            <div className="project-stack">
              <div className="project-stack-figma">figma</div>
            </div>
          </div>
          <div className="project-item disabled" aria-disabled="true" style={{opacity: 0.5}}>
            <div className="project-year">2025</div>
            <div className="project-title" style={{pointerEvents: 'none'}}>PlayPal Newsletter</div>
            <div className="project-category">Design / Dev</div>
            <div className="project-stack">
              <div className="project-stack-figma">figma</div>
              <div className="project-stack-html">html</div>
            </div>
          </div>
          <div className="project-item disabled" aria-disabled="true" style={{opacity: 0.5}}>
            <div className="project-year">2025</div>
            <div className="project-title" style={{pointerEvents: 'none'}}>My Portfolio</div>
            <div className="project-category">Design / Dev</div>
            <div className="project-stack">
              <div className="project-stack-figma">figma</div>
              <div className="project-stack-react">react.js</div>
              <div className="project-stack-scss">scss</div>
              <div className="project-stack-gsap">gsap</div>
            </div>
          </div>
        </div>
        {preview && (
          <div className="project-preview" style={{ top: preview.top, left: preview.left }}>
            <img src={preview.src} alt="preview" />
          </div>
        )}
      </div>
      <div className="footer">
        <div className="footer-container">
          <div className="footer-online">
            <div className="online-circle"></div>
            <p>Online at</p>
            <div className="footer-icons">
              <div className="footer-icons-flex">
                <AnimatedSocialIcon label="Instagram" href="https://www.instagram.com/daniobanioo/" icon="mingcute:instagram-line" width="32" height="32" style={{color: 'var(--white)'}} />
                <AnimatedSocialIcon label="YouTube" href="https://www.youtube.com/@doobiedoesdo" icon="mingcute:youtube-line" width="32" height="32" style={{color: 'var(--white)'}} />
                <AnimatedSocialIcon label="LinkedIn" href="https://www.linkedin.com/in/daniel-trinh-855520323/" icon="mingcute:linkedin-line" width="32" height="32" style={{color: 'var(--white)'}} />
                <AnimatedSocialIcon label="GitHub" href="https://github.com/daniobanio" icon="mingcute:github-line" width="32" height="32" style={{color: 'var(--white)'}} />
                <AnimatedSocialIcon label="Email" href="mailto:danieltrinh.dt@gmail.com" icon="mingcute:mail-line" width="32" height="32" style={{color: 'var(--white)'}} />
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            <p>2025 Daniel Trinh. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Projects;
