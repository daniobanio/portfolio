import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedNavItem from '../components/AnimatedNavItem';
import AnimatedButton from '../components/AnimatedButton';
import AnimatedSocialIcon from '../components/AnimatedSocialIcon';
import { useNavigation } from '../hooks/useNavigation';

const About = () => {
  const { registerNavElement, isActive } = useNavigation();

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
          <li className="nav-home">
            <AnimatedNavItem to="/" registerNavElement={registerNavElement} path="/" isActive={isActive}>Home</AnimatedNavItem>
          </li>
        </ul>
        <ul className="nav-right">
          <li><AnimatedNavItem to="/about" registerNavElement={registerNavElement} path="/about" isActive={isActive}>About</AnimatedNavItem></li>
          <li><AnimatedNavItem to="/projects" registerNavElement={registerNavElement} path="/projects" isActive={isActive}>Projects</AnimatedNavItem></li>
          <li><AnimatedNavItem to="#" registerNavElement={registerNavElement} path="/workflow" isActive={isActive}>Workflow</AnimatedNavItem></li>
          <li><AnimatedNavItem to="#" registerNavElement={registerNavElement} path="/contact" isActive={isActive}>Contact</AnimatedNavItem></li>
        </ul>
      </div>
      <div className="main-content">
        <div className="about-section">
          <h1 className="about-title">ME & MY JOURNEY</h1>
          <div className="about-photo-cards">
            <img className="photo-card" src="/imgs/cameracafe2.webp" alt="Cafe" />
            <img className="photo-card" src="/imgs/portrait.jpg" alt="Portrait" />
            <img className="photo-card" src="/imgs/capstone.jpg" alt="Capstone" />
          </div>
          <div className="about-intro">
            <p>
              <span className="para-h1">Hey! I’m Daniel Trinh, a front-end web developer.</span>
            </p>
            <p>
              When I was a kid, I'd mess around with GIMP and Photoshop on the old laptop my parents gave me, creating random designs for myself. I was making things just for the fun of it, but looking back, I realized my creative passion has always been more than that. In high school, I got into photography and web development.
            </p>
            <p>
              Those years of trying new things, failing, learning, and finally figuring things out, were some of my most valuable experiences and memories from high school. They made me realize that what really drives me is that feeling of <span className="para-h1">awe</span> and <span className="para-h1">wonder.</span> Whenever I see something super cool or creative, I can’t help but want to figure out how it was made, works, and try creating something like it. Whether it was photography or websites, that process of going from an idea in your head to an actual working result is so fulfilling. That feeling is what I’ve been chasing all along, and it’s that feeling that I want to create for other people that makes them stop and go, “Woah, how did they do that?”
            </p>
            <p>
              Now I’m studying <span className="para-h1">New Media Design & Web Development at BCIT</span>, and every time I learn something new, it just adds fuel to that drive to create. I’m still figuring things out, but I know this is the direction I want to keep going.
            </p>
          </div>
        </div>
        <div className="grid-section">
          <div className="grid-item tech-stack">
            <div className="tech-stack-center">
              <div className="tech-stack-char">
                <div className="chat-bubble">
                  <p className="tech-bubble-text">my tech stack!</p>
                  <img className="tech-bubble" src="/imgs/chatbubble.png" alt="Chat Bubble" />
                </div>
                <img className="tech-stack-char" src="/imgs/character.png" alt="Character" />
                <iconify-icon class="react-tech" icon="devicon:react" width="64" height="64"></iconify-icon>
                <iconify-icon class="js-tech" icon="logos:javascript" width="64" height="64"></iconify-icon>
                <iconify-icon class="threejs-tech" icon="devicon:threejs-wordmark" width="64" height="64"></iconify-icon>
                <iconify-icon class="html-tech" icon="devicon:html5" width="64" height="64"></iconify-icon>
                <iconify-icon class="css-tech" icon="vscode-icons:file-type-css2" width="64" height="64"></iconify-icon>
                <iconify-icon class="gsap-tech" icon="simple-icons:gsap" width="64" height="64" style={{color: '#93d400'}}></iconify-icon>
                <iconify-icon icon="devicon:figma" width="64" height="64"></iconify-icon>
              </div>
            </div>
          </div>
          <div className="grid-item youtube">
            <h1>My YouTube Channel</h1>
            <p>
              I like to post my hobbies and coding journey on my YouTube channel. If you enjoy photography and keyboards, check it out!
            </p>
            <AnimatedButton href="https://www.youtube.com/@doobiedoesdo" className="btn-filled">YOUTUBE →</AnimatedButton>
            <div className="youtube-icon-container">
              <iconify-icon class="youtube-icon" icon="mdi:youtube" width="425" height="425" style={{color: '#1f1f1f'}}></iconify-icon>
            </div>
          </div>
          <div className="grid-item photography">
            <h1>My Photography</h1>
            <p>
              What started as a random course I picked in high school turned into one of my favourite hobbies. I enjoy going on walks with my camera to take my mind off of things and to appreciate the beauty of Vancouver.
            </p>
            <AnimatedButton href="http://instagram.com/doobiedoesdo" className="btn-filled">VIEW PHOTOS →</AnimatedButton>
            <div className="photo-display">
              <img src="/imgs/photo1.webp" alt="Photo 1" />
              <img src="/imgs/photo2.webp" alt="Photo 2" />
              <img src="/imgs/photo3.webp" alt="Photo 3" />
              <img src="/imgs/photo4.webp" alt="Photo 4" />
              <img src="/imgs/photo5.webp" alt="Photo 5" />
            </div>
          </div>
        </div>
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
                <AnimatedSocialIcon href="mailto:danieltrinh.dt@gmail.com" icon="mingcute:mail-line" width="32" height="32" style={{color: '#F5F5F5'}} />
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

export default About;
