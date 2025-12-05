import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import AnimatedNavItem from '../components/AnimatedNavItem';
import AnimatedSocialIcon from '../components/AnimatedSocialIcon';
import { useNavigation } from '../hooks/useNavigation';
import BackToTopLink from '../components/BackToTopLink';
import ProjectNavigation from '../components/ProjectNavigation';
import EmailCopyNotification from '../components/EmailCopyNotification';
import { useSEO } from '../hooks/useSEO';
import soundManager from '../utils/soundManager';
import { gsap } from 'gsap';

const Project3Detail = () => {
  const resumeLinkRef = useRef(null);
  const contactLinkRef = useRef(null);
  const [showNotification, setShowNotification] = useState(false);
  const { registerNavElement, isActive } = useNavigation();

  const handleEmailCopy = async () => {
    try {
      await navigator.clipboard.writeText('hello@danieltrinh.ca');
      setShowNotification(true);
    } catch (err) {
      const textArea = document.createElement('textarea');
      textArea.value = 'hello@danieltrinh.ca';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setShowNotification(true);
    }
  };
  useSEO({
    title: 'Jam Music App | Daniel Trinh',
    description: 'Jam is a social music app concept that unifies listening, sharing, and stats with a community-first experience.',
    keywords: ['music app','social app','UI/UX','Figma prototype','Daniel Trinh'],
    image: '/imgs/project3/mockup.webp'
  });

  return (
    <>
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
          <li>
            <a 
              ref={resumeLinkRef}
              href="/DanielTrinhResume.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              onMouseEnter={() => {
                soundManager.playHover();
                if (resumeLinkRef.current) {
                  gsap.to(resumeLinkRef.current, {
                    opacity: 1,
                    color: 'var(--yellow)',
                    duration: 0.15,
                    ease: 'power2.out',
                    overwrite: 'auto',
                  });
                }
              }}
              onMouseLeave={() => {
                if (resumeLinkRef.current) {
                  gsap.to(resumeLinkRef.current, {
                    opacity: 0.6,
                    color: 'var(--white)',
                    duration: 0.2,
                    ease: 'power2.out',
                    overwrite: 'auto',
                  });
                }
              }}
              onClick={() => soundManager.playClick()}
              style={{ 
                opacity: 0.6,
                color: 'var(--white)',
                textDecoration: 'none'
              }}
            >
              Resume
            </a>
          </li>
          <li>
            <a 
              ref={contactLinkRef}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                soundManager.playUpvote();
                handleEmailCopy();
              }}
              onMouseEnter={() => {
                soundManager.playHover();
                if (contactLinkRef.current) {
                  gsap.to(contactLinkRef.current, {
                    opacity: 1,
                    color: 'var(--yellow)',
                    duration: 0.15,
                    ease: 'power2.out',
                    overwrite: 'auto',
                  });
                }
              }}
              onMouseLeave={() => {
                if (contactLinkRef.current) {
                  gsap.to(contactLinkRef.current, {
                    opacity: 0.6,
                    color: 'var(--white)',
                    duration: 0.2,
                    ease: 'power2.out',
                    overwrite: 'auto',
                  });
                }
              }}
              style={{ 
                opacity: 0.6,
                color: 'var(--white)',
                textDecoration: 'none',
                cursor: 'pointer'
              }}
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
      <div className="main-content">
        <div className="project-info-container">
          <div className="project-detail">
            <div className="project-title-container">
              <p className="back-btn"><Link to="/projects" onClick={() => soundManager.playClick()} onMouseEnter={() => soundManager.playHover()}>← BACK</Link></p>
              <h1 className="project-title">Jam Music App</h1>
            </div>
            <div className="project-info">
              <div className="project-info-key">
                <ul>
                  <li>Team</li>
                  <li>Role</li>
                  <li>Timeline</li>
                  <li>Tools</li>
                </ul>
              </div>
              <div className="project-info-value">
                <ul>
                  <li>Individual</li>
                  <li>UI/UX Designer</li>
                  <li>Feb 2025 / 2 weeks</li>
                  <li>Figma</li>
                </ul>
              </div>
            </div>
            <div className="project-links">
              <a href="#" onClick={() => soundManager.playClick()} onMouseEnter={() => soundManager.playHover()}>VIEW PROTOTYPE</a>
            </div>
          </div>
          <div className="project-displayImg">
            <img src="/imgs/project3/mockup.webp" alt="Project Mockup" />
          </div>
        </div>
        <hr />
        <div className="project-content">
          <div className="project-para">
            <h1>Overview</h1>
            <p>
              Music has always been a part of my life and daily routine. I noticed I've gotten pretty frustrated with how most music streaming apps work. You have to jump between a bunch of different apps just to listen, share with friends, or view your own stats. I thought there had to be a better way.
            </p>
            <br />
            <p>
              My goal for this project was to design a mobile app that was about more than just playing music. I wanted to create an experience that would foster connection and community through music, whilst addressing the pain points of current music apps.
            </p>
          </div>
          <hr />
          <div className="project-para">
            <h1>Research</h1>
            <p>
              I created a survey to learn about other users' behaviors, frustrations, needs, and wants. I received 27 responses and did two follow-up interviews to gain deeper insights.
            </p>
            <br />
            <div className="project-img autowidth">
              <h1>Survey</h1>
              <img src="/imgs/project3/survey.webp" alt="Survey" />
            </div>
            <h2>Key Insights</h2>
            <p>
              A few things became clear: users felt their apps lacked social features, easy organization, and customization. This research guided my entire process. It was super encouraging to see that my initial vision for a social music app aligned so well with what other people wanted. It helped me feel confident in my design decisions.
            </p>
            <br />
            <h2>User Persona & Empathy Map</h2>
            <p>
              To further synthesize my research and empathize with users, I created a user persona and empathy map. I came up with the quote "Music is better when shared! I wish everything was in one cozy place." This statement encapsulates user's feelings and it became the core insight for the project.
            </p>
            <br />
            <div className="project-img">
              <h1>Persona</h1>
              <img src="/imgs/project3/persona.png" alt="Persona" />
            </div>
            <h2>User Journey Map</h2>
            <p>
              I mapped out a user journey to understand the user's flow, thoughts, feelings, and opportunities within the current music streaming landscape. This helped me pinpoint exactly where my app, "Jam," could solve their problems by offering a more social experience from awareness to loyalty.
            </p>
            <br />
            <div className="project-img">
              <img src="/imgs/project3/journeymap.webp" alt="Journey Map" />
            </div>
          </div>
          <hr />
          <div className="project-para">
            <h1>Design</h1>
            <p>
              With the research and user empathy complete, I began sketching wireframes on paper and created the final 10 key screens. The goal was to capture the app’s core features and user experience. I then digitized the wireframes in Figma, using a consistent auto-layout grid to make sure everything was aligned and scalable.
            </p>
            <br />
            <div className="project-img autowidth">
              <h1>Wireframes</h1>
              <img src="/imgs/project3/wireframes.webp" alt="Wireframes" />
            </div>
            <p>
              When I moved on to prototyping, I wanted the app to feel fun and social, so I chose a hot-pink and red gradient as a key visual element, and I made all the design elements have rounded corners to make the app feel more approachable. I used Figma's interactive features to create button states and simple animations, like the record spinning when a song is playing.
            </p>
            <br />
            <div className="project-img autowidth">
              <h1>Screens</h1>
              <img src="/imgs/project3/screens.webp" alt="Screens" />
            </div>
          </div>
          <div className="project-para">
            <h1>Try it out yourself!</h1>
            <ul>
              <li>Check your messages from Ronny J</li>
              <li>Join the "Chill Vibes" room and listen!</li>
              <li>View your profile</li>
              <li>Filter through "Liked Songs"</li>
            </ul>
            <br />
            <div className="project-img">
              <iframe
                style={{ border: '1px solid rgba(0, 0, 0, 0.1)' }}
                width="800"
                height="450"
                src="https://embed.figma.com/proto/ahZqIQ8NCUhJCuk13pJTl3/Jam-Music-App?node-id=1-464&starting-point-node-id=1%3A464&embed-host=share"
                allowFullScreen
                title="Figma Prototype"
              ></iframe>
            </div>
          </div>
          <hr />
          <div className="project-para">
            <h1>Reflection</h1>
            <p>
              This project was a great lesson in how much research and real insights can shape a product's direction. My initial idea was validated by users, and their feedback helped me prioritize features like a social feed and playlist sharing.
            </p>
            <br />
            <p>
              Looking back, I learned that a good design isn't just about making something look nice; it’s about solving real problems for real people. Taking the time to gather real feedback, create user personas, and map out their experiences helped me design something that was grounded in how users actually think and behave. My next step is to conduct more usability testing and get further feedback to refine the prototype and make it even better.
            </p>
          </div>
        </div>
      </div>
      <ProjectNavigation currentSlug="/projects/jam-music-app" />
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
                <AnimatedSocialIcon label="Email" href="mailto:hello@danieltrinh.ca" icon="mingcute:mail-line" width="32" height="32" style={{color: 'var(--white)'}} />
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            <p>2025 Daniel Trinh. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </main>
    <BackToTopLink />
    <EmailCopyNotification show={showNotification} onClose={() => setShowNotification(false)} />
    </>
  );
};

export default Project3Detail;


