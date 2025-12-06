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
    title: "Client Portfolio Design | Daniel Trinh",
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
              <h1 className="project-title">Kim Huynh's Portfolio</h1>
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
                  <li>June 2025 / 2 weeks</li>
                  <li>Figma</li>
                </ul>
              </div>
            </div>
            <div className="project-links">
              <a href="#" onClick={() => soundManager.playClick()} onMouseEnter={() => soundManager.playHover()}>VIEW PROTOTYPE</a>
            </div>
          </div>
          <div className="project-displayImg">
            <img src="/imgs/project2/home.webp" alt="Project Home" />
          </div>
        </div>
        <hr />
        <div className="project-content">
          <div className="project-para">
            <h1>Overview</h1>
            <p>
              This project involved designing a portfolio website for my client and friend, Kim, an architecture student seeking to grow her digital presence. Her portfolio needs to showcase her academic projects, reflect her design personality, and be flexible enough to use for school applications, job opportunities, and professional networking (such as LinkedIn).
            </p>
          </div>
          <hr />
          <div className="project-para">
            <h1>Research</h1>
            <p>
              I began by studying different types of architecture portfolios, both academic and professional. During this process I looked at many websites featured on Awwwards.com, which gave me lots of inspiration for how I could make the design feel professional and engaging. From this research, I created a mood board that I could refer to for visual direction.
            </p>
          </div>
          <div className="project-img autowidth">
            <h1>Mood board</h1>
            <img src="/imgs/project2/moodboard.png" alt="Moodboard" />
          </div>
          <div className="project-para">
            <p>
              In our initial meeting, I worked with Kim to establish the portfolio’s purpose, target audience, and intended tone. We discussed visual preferences, site structure, and the types of content she wanted to showcase. She gave me a list of goals and requirements she had.
            </p>
            <ol>
              <li>Her academic projects needs to be the fore-front of the site</li>
              <li>The site needs to be able to be used for professional applications</li>
              <li>Wants a minimal, modern aesthetic</li>
              <li>Should have lots of imagery</li>
              <li>Home page and project pages should be flexible for her to change</li>
            </ol>
            <p>
              She liked the mood board I created and we agreed to continue with that visual direction!
            </p>
          </div>
          <hr />
          <div className="project-para">
            <h1>Design</h1>
            <p>
              Since the client's requirements weren’t very strict, it gave me lots of creative freedom! One of my key design decisions was creating a carousel interaction for the homepage. This dynamic hero section allows the client to choose how she wants to introduce herself — either by showcasing featured projects, offering a personal intro, or blending both approaches. The client expressed she wanted lots of flexibility in how she could showcase herself, and I believe this approach allows her to make those decisions.
            </p>
            <br />
            <p>
              Throughout the design, I emphasized reusable components and consistent design language to simplify the handoff and prepare for development. After receiving feedback from a previous architecture student, I made small adjustments and finalized the wireframes.
            </p>
            <br />
            <p>
              Once approved by the client, I moved on to high-fidelity prototyping. Since the wireframes were already well-structured, it was easy to adapt them by integrating images, copy, and interactivity.
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
          <hr />
          <div className="project-para">
            <h1>Reflection</h1>
            <p>
              Overall, I’m happy with how the wireframes and vision turned out — and fortunately, so was my client. However, I realized that sharing the full wireframe update all at once, rather than in stages, could’ve backfired if she had requested major changes. In future projects, I’ll aim to share earlier WIP updates to gather feedback earlier in the process.
            </p>
            <br />
            <p>
              Next, I plan to move into development. I hope to use this project to improve my coding skills, especially in areas like responsive layout, animation, and component-based architecture. I’m also interested in exploring whether a headless CMS could or should be integrated later.
            </p>
          </div>
        </div>
        <ProjectNavigation currentSlug="/projects/kim-huynh-portfolio" />
      </div>
      <Footer />
    </main>
    <BackToTopLink />
    <EmailCopyNotification show={showNotification} onClose={() => setShowNotification(false)} />
    </>
  );
};

export default Project2Detail;
