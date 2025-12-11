import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BackToTopLink from '../components/BackToTopLink';
import ProjectNavigation from '../components/ProjectNavigation';
import EmailCopyNotification from '../components/EmailCopyNotification';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { useSEO } from '../hooks/useSEO';
import useEmailCopy from '../hooks/useEmailCopy';
import soundManager from '../utils/soundManager';

const Project2Detail = () => {
  const { showNotification, setShowNotification, handleEmailCopy } = useEmailCopy();
  useSEO({
    title: "Architecture Portfolio Design | Daniel Trinh",
    description: "Portfolio design for an architecture student: minimal, modern layout with a flexible hero and reusable components.",
    keywords: ['portfolio design','architecture portfolio','UI/UX','Figma','Daniel Trinh'],
    image: '/imgs/project2/home.webp'
  });

  return (
    <>
    <main className="main-container">
      <Nav onContactClick={handleEmailCopy} />
      <div className="main-content">
        <div className="project-info-container">
          <div className="project-detail">
            <div className="project-title-container">
              <p className="back-btn"><Link to="/projects" onClick={() => soundManager.playClick()} onMouseEnter={() => soundManager.playHover()}>← BACK</Link></p>
              <h1 className="project-title">Architecture Portfolio</h1>
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
                  <li>Web Developer & Designer</li>
                  <li>June 2025 / 2 weeks</li>
                  <li>Next.js, TailwindCSS, <br />Framer Motion, Figma </li>
                </ul>
              </div>
            </div>
            <div className="project-links">
            </div>
          </div>
          <div className="project-displayImg">
            <img src="/imgs/project2/home.webp" alt="Project Home" />
          </div>
        </div>
        <hr />
        <div className="project-content">
          <div className="project-para">
          <h1 className="separator-header yellow">Overview</h1>
            <p>
              This project involved designing a portfolio website for my client and friend, Kim, an architecture student seeking to grow her digital presence. Her portfolio needs to showcase her academic projects, reflect her design personality, and be flexible enough to use for school applications, job opportunities, and professional networking (such as LinkedIn).
            </p>
          </div>
          <div className="project-para">
          <h1 className="separator-header yellow">Research</h1>
            <p>
              I began by studying different types of architecture portfolios, both academic and professional. During this process I looked at many websites featured on Awwwards.com, which gave me lots of inspiration for how I could make the design feel professional and engaging. From this research, I created a mood board that I could refer to for visual direction.
            </p>
          </div>
          <div className="project-img autowidth">
            <h1>Mood board</h1>
            <img src="/imgs/project2/moodboard.png" alt="Moodboard" />
          </div>
          <div className="project-para">
          <h1 className="separator-header yellow">Challenge</h1>
            <p>
              In our initial meeting, I worked with Kim to establish the portfolio’s purpose, target audience, and intended tone. We discussed visual preferences, site structure, and the types of content she wanted to showcase.
            </p><br />
            <p>She gave me a list of goals and requirements she had.</p><br />
            <ol>
              <li>Her academic projects needs to be the fore-front of the site</li>
              <li>The site needs to be able to be used for professional applications</li>
              <li>Wants a minimal, modern aesthetic</li>
              <li>Should have lots of imagery</li>
              <li>Home page and project pages should be flexible for her to change</li>
            </ol>
          </div>
          <div className="project-para">
          <h1 className="separator-header yellow">Solution</h1>
            <p>
              One of my key design decisions was creating a carousel interaction for the homepage. This dynamic hero section allows the client to choose how she wants to introduce herself — either by showcasing featured projects, offering a personal intro, or having both. She expressed the want for flexibility in how she could showcase herself, and I believe this approach allows her to make those decisions.
            </p>
            <br />
            <p>
            Throughout the design, I emphasized components and a consistent design system to simplify the handoff for development. After receiving feedback from a previous architecture student, I made small adjustments and finalized the wireframes.
            </p>
          </div>
          <div className="project-img">
            <h1>Figma Screens</h1>
            <iframe
              style={{ border: '1px solid rgba(0, 0, 0, 0.1)' }}
              width="800"
              height="450"
              src="https://embed.figma.com/design/OMOLdpFkBNDgdH1tpDbb5o/Kim-Hyunh-Portfolio?node-id=0-1&embed-host=share"
              allowFullScreen
              title="Figma Screens"
            ></iframe>
          </div>
          <div className="project-para">
          <h1 className="separator-header yellow">Development</h1>
          <h2>Tech Stack</h2>
            <p>
            Next.js: Familiar React development. SEO and page load performance. Allows content to be pre-rendered on the server. Features like image optimization and lazy loading are beneficial for this image heavy portfolio. Easy integration with Payload, a headless CMS.
            </p>
            <p>TailwindCSS: Utility-first styling and responsiveness. My preferred CSS framework</p>
            <p>Framer Motion: Easy to implement animation library for smooth transitions and interactions</p><br />
            <div className="project-img">
              <h1>Demo</h1>
              <video src="/imgs/project2/website.webm" autoPlay loop muted playsInline style={{ width: '100%', maxWidth: '800px' }} />
            </div>
          </div>
          <div className="project-para">
          <h1 className="separator-header yellow">Reflection</h1>
            <p>
              This freelance project taught me valuable lessons about client communication and project management. Fortunately my client was happy with the design but I realized sharing the full wireframe update all at once, rather than in stages, could've backfired if she had requested major changes. In future projects, I'll aim to share earlier WIP updates to gather feedback earlier in the process.
            </p>
            <br />
            <p>
              Working with a real client helped me understand the importance of balancing their specific needs with design best practices. I learned to ask clarifying questions upfront to avoid assumptions, and how to present design decisions in a way that helps clients understand the reasoning behind choices. The iterative feedback process also reinforced the value of creating a flexible design system early on, which made adjustments much smoother throughout the project.
            </p>
            <br />
            <p>
              Managing timelines and expectations as a freelancer was another key takeaway. Setting clear milestones and communication touchpoints from the start helped keep the project on track, and I discovered that being transparent about the design process builds trust with clients. This experience has shaped how I approach client relationships and project workflows in all my subsequent work.
            </p>
          </div>
        </div>
        <ProjectNavigation currentSlug="/projects/architecture-portfolio" />
      </div>
      <Footer />
    </main>
    <BackToTopLink />
    <EmailCopyNotification show={showNotification} onClose={() => setShowNotification(false)} />
    </>
  );
};

export default Project2Detail;
