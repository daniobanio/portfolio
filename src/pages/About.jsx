import React from 'react';
import AnimatedButton from '../components/AnimatedButton';
import EmailCopyNotification from '../components/EmailCopyNotification';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { useSEO } from '../hooks/useSEO';
import useEmailCopy from '../hooks/useEmailCopy';

const About = () => {
  const { showNotification, setShowNotification, handleEmailCopy } = useEmailCopy();
  useSEO({
    title: 'About | Daniel Trinh - Front-end Web Developer',
    description: 'Learn about Daniel Trinh, a front-end web developer based in Vancouver. My journey, values, and the technologies I love using to build the web.',
    keywords: ['About Daniel Trinh','Vancouver developer','front-end developer','React','UI/UX','portfolio'],
    image: '/imgs/portrait.jpg'
  });

  return (
    <main className="main-container">
      <Nav onContactClick={handleEmailCopy} />
      <div className="main-content">
        <div className="about-section">
          <h1 className="about-title">ME & MY JOURNEY</h1>
          <div className="about-photo-cards">
            <img className="photo-card" src="/imgs/cameracafe2.webp" alt="Daniel photographing food in a Vancouver cafe" />
            <img className="photo-card" src="/imgs/portrait.jpg" alt="Portrait of Daniel Trinh" />
            <img className="photo-card" src="/imgs/capstone.jpg" alt="Daniel presenting his keyboard acoustics capstone project" />
          </div>
          <div className="about-intro">
            <p>
              <span className="para-h1">Hey! I’m Daniel Trinh, a front-end developer</span> with a love for design and creating things that connect and awe people.
            </p>
            <p>
            I’ve been drawn to visual creativity since I was a kid messing around with GIMP and Photoshop on my old family laptop. That curiosity carried into high school, where I got into photography and eventually web development. The process of learning, experimenting, breaking things, and finally making something work is what fuels my drive to create.
            </p>
            <p>
            Today, I study <span className="para-h1">New Media Design & Web Development at BCIT</span>, where I’m building skills in  UI/UX design and front-end development to create meaningful user experiences. Every new thing I learn adds fuel to the drive that started years ago: turning ideas into something people can see, use, and feel inspired by.
            </p>
            <p>
            I’m excited to keep growing, take on challenging projects, and build work that blends creativity and technical craft in ways that spark that same feeling of awe that inspired me in the first place.
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
                <img className="tech-stack-char" src="/imgs/character/standing.gif" alt="Pixel art character representing Daniel" />
                <iconify-icon class="react-tech" icon="devicon:react" width="64" height="64"></iconify-icon>
                <iconify-icon class="js-tech" icon="logos:javascript" width="64" height="64"></iconify-icon>
                <iconify-icon class="html-tech" icon="devicon:html5" width="64" height="64"></iconify-icon>
                <iconify-icon class="css-tech" icon="vscode-icons:file-type-css2" width="64" height="64"></iconify-icon>
                <iconify-icon class="gsap-tech" icon="simple-icons:gsap" width="64" height="64" style={{color: 'var(--gsap-brand)'}}></iconify-icon>
                <iconify-icon icon="devicon:figma" width="64" height="64"></iconify-icon>
              </div>
            </div>
          </div>
          <div className="grid-item youtube">
            <h1>My YouTube Channel</h1>
            <p>
              I like to post my hobbies on my YouTube channel. If you enjoy photography and keyboards, check it out!
            </p>
            <AnimatedButton href="https://www.youtube.com/@doobiedoesdo" className="btn-filled">YOUTUBE →</AnimatedButton>
            <div className="youtube-icon-container">
              <iconify-icon class="youtube-icon" icon="mdi:youtube" width="425" height="425" style={{color: 'var(--main-gray)'}}></iconify-icon>
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
      <Footer />
      <EmailCopyNotification show={showNotification} onClose={() => setShowNotification(false)} />
    </main>
  );
};

export default About;
