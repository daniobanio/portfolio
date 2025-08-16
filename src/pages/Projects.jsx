import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AnimatedNavItem from '../components/AnimatedNavItem';
import AnimatedSocialIcon from '../components/AnimatedSocialIcon';
import { useNavigation } from '../hooks/useNavigation';

const Projects = () => {
  const { registerNavElement, isActive } = useNavigation();
  const [preview, setPreview] = useState(null); // { src, top, left }

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
          <li><AnimatedNavItem to="#" registerNavElement={registerNavElement} path="/workflow" isActive={isActive}>Workflow</AnimatedNavItem></li>
          <li><AnimatedNavItem to="#" registerNavElement={registerNavElement} path="/contact" isActive={isActive}>Contact</AnimatedNavItem></li>
        </ul>
      </div>
      <div className="main-content">
        <div className="project-list">
          <div className="project-item" onMouseEnter={(e)=>handleEnter(e, '/imgs/project1/home.webp')} onMouseLeave={handleLeave}>
            <div className="project-year">2025</div>
            <Link to="/project1-detail" className="project-title">myBCIT Redesign</Link>
            <div className="project-category">UI/UX Design</div>
            <div className="project-stack">
              <div className="project-stack-figma">figma</div>
            </div>
          </div>
          <div className="project-item" onMouseEnter={(e)=>handleEnter(e, '/imgs/project2/home.webp')} onMouseLeave={handleLeave}>
            <div className="project-year">2025</div>
            <Link to="/project2-detail" className="project-title">Kim Huynh Portfolio</Link>
            <div className="project-category">UI/UX Design</div>
            <div className="project-stack">
              <div className="project-stack-figma">figma</div>
            </div>
          </div>
          <div className="project-item" onMouseEnter={(e)=>handleEnter(e, '/imgs/project3/mockup.webp')} onMouseLeave={handleLeave}>
            <div className="project-year">2025</div>
            <Link to="/project3-detail" className="project-title">Jams Music App</Link>
            <div className="project-category">UI/UX Design</div>
            <div className="project-stack">
              <div className="project-stack-figma">figma</div>
            </div>
          </div>
          <div className="project-item" onMouseEnter={(e)=>handleEnter(e, '/imgs/project4/mockup.webp')} onMouseLeave={handleLeave}>
            <div className="project-year">2025</div>
            <Link to="/project4-detail" className="project-title">PlayPal Newsletter</Link>
            <div className="project-category">Design / Dev</div>
            <div className="project-stack">
              <div className="project-stack-figma">figma</div>
              <div className="project-stack-html">html</div>
            </div>
          </div>
          <div className="project-item">
            <div className="project-year">2025</div>
            <div className="project-title">My Portfolio</div>
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
                <AnimatedSocialIcon href="https://www.instagram.com/daniobanioo/" icon="mingcute:instagram-line" width="32" height="32" style={{color: '#F5F5F5'}} />
                <AnimatedSocialIcon href="https://www.youtube.com/@doobiedoesdo" icon="mingcute:youtube-line" width="32" height="32" style={{color: '#F5F5F5'}} />
                <AnimatedSocialIcon href="https://www.linkedin.com/in/daniel-trinh-855520323/" icon="mingcute:linkedin-line" width="32" height="32" style={{color: '#F5F5F5'}} />
                <AnimatedSocialIcon href="https://github.com/daniobanio" icon="mingcute:github-line" width="32" height="32" style={{color: '#F5F5F5'}} />
                <AnimatedSocialIcon href="mailto:daniel@example.com" icon="mingcute:mail-line" width="32" height="32" style={{color: '#F5F5F5'}} />
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
