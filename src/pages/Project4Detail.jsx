import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedNavItem from '../components/AnimatedNavItem';
import AnimatedSocialIcon from '../components/AnimatedSocialIcon';
import { useNavigation } from '../hooks/useNavigation';
import BackToTopLink from '../components/BackToTopLink';
import { useSEO } from '../hooks/useSEO';

const Project4Detail = () => {
  const { registerNavElement, isActive } = useNavigation();
  useSEO({
    title: 'PlayPal Newsletter | Daniel Trinh',
    description: 'HTML email newsletter designed and built with tables for broad email client compatibility. Weekly PlayPal game digest.',
    keywords: ['HTML email','newsletter','email development','tables','PlayPal','Daniel Trinh'],
    image: '/imgs/project4/mockup.webp'
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
          <li><AnimatedNavItem to="#" registerNavElement={registerNavElement} path="/workflow" isActive={isActive}>Workflow</AnimatedNavItem></li>
          <li><AnimatedNavItem to="#" registerNavElement={registerNavElement} path="/contact" isActive={isActive}>Contact</AnimatedNavItem></li>
        </ul>
      </div>
      <div className="main-content">
        <div className="project-info-container">
          <div className="project-detail">
            <div className="project-title-container">
              <p className="back-btn"><Link to="/projects">← BACK</Link></p>
              <h1 className="project-title">PlayPal Newsletter</h1>
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
                  <li>Yuhan Liu, Moon Nguyen, Zexi Luo, Pedro Conde</li>
                  <li>Developer / Designer</li>
                  <li>March 2025 / 2 weeks</li>
                  <li>Figma, HTML</li>
                </ul>
              </div>
            </div>
            <div className="project-links">
              <a href="#">VIEW PROTOTYPE</a>
            </div>
          </div>
          <div className="project-displayImg">
            <img src="/imgs/project4/mockup.webp" alt="Project Mockup" />
          </div>
        </div>
        <hr />
        <div className="project-content">
          <div className="project-para">
            <h1>Overview</h1>
            <p>
              As part of a team project for our Project Management course, I contributed to the development of PlayPal, a fictional social platform where gamers rate and review their favorite titles. My individual role was to design and build an HTML email newsletter. The goal was to create a clean, engaging, and on-brand newsletter that catered to gamers, something our team would actually engage with ourselves. This project followed the Waterfall methodology and emphasized structured planning, design, and execution.
            </p>
          </div>
          <hr />
          <div className="project-para">
            <h1>Research</h1>
            <p>
              Before jumping into it, I spent time researching the best practices of HTML email design and development. I focused on key requirements like capping the layout at 750px max-width, designing for simplicity, building entirely with tables and using a box-model structure for spacing. Once I understood the constraints, I aligned with my team on the purpose of the newsletter: a weekly game recommendation digest for PlayPal users.
            </p>
          </div>
          <hr />
          <div className="project-para">
            <h1>Design</h1>
            <p>
              Using Figma, I designed a layout that was centered, and easy to scan. I focused on simplicity to make it easier on myself to translate to HTML later, using auto-layout to ensure consistent spacing and responsiveness. I applied the style guide provided by our designer, incorporating the logo, colors, and gradient accents to reflect PlayPal’s visual identity.
            </p>
            <br />
            <p>
              The layout consisted of a header, featured game section, secondary recommendations, and a call-toaction button — all spaced and styled in a way that felt intuitive for desktop viewing, with mobile behavior in mind. I kept everything structured for scalability and consistency.
            </p>
            <br />
            <p>
              Once I reviewed the prototype with my group, we locked the scope to just the recommendation newsletter
            </p>
            <br />
            <div className="project-img autowidth">
              <h1>Screens</h1>
              <img src="/imgs/project4/screens.png" alt="Screens" />
            </div>
          </div>
          <hr />
          <div className="project-para">
            <h1>Development</h1>
            <p>
              This was my first time building anything with entirely tables. I am used to using Flexbox and Grid, so adapting to nested tables was a challenge at first. I quickly realized that planning the layout in advance — and thinking in table “boxes” helped me avoid confusion and gaining a headache from all these table tags.
            </p>
            <br />
            <p>
              Every style had to be written inline, which was time-consuming but necessary for compatibility across email clients. Once I finished coding the base, I ran my HTML through ChatGPT to double-check my CSS and make sure it worked across all major email clients. It suggested a few vendor-specific properties like -webkit-text-size-adjust and other tweaks to improve compatibility, which I added in. Then, I used MailChimp to inline all the CSS properly, since some email clients remove head and style tags.
            </p>
            <br />
            <p>
              To test the final result, I used PutsMail by Litmus to email it to myself. It looked just like the prototype, but it wasn’t responsive. I used media queries, but I was stumped as to why it didn’t work. After some digging, I found out that Gmail (and a few others) doesn’t support media queries. So, I had to rethink my approach. Instead of relying on media queries, I changed the table cells to display as block elements with 100% width. That way, the content stacked naturally on smaller screens — no media queries needed.
            </p>
            <br />
            <p>
              After confirming everything worked properly in both desktop and mobile formats, I delivered the final HTML file to the team, and mock-ups of the final email.
            </p>
            <br />
            <div className="project-img autowidth">
              <h1>Final Mockup</h1>
              <img src="/imgs/project4/mockup.webp" alt="Final Mockup" />
            </div>
          </div>
          <hr />
          <div className="project-para">
            <h1>Reflection</h1>
            <p>
              This project pushed me to work outside of my usual front-end comfort zone and adapt to the strict limitations of HTML emails. I learned how important it is to plan out the table structure early, and how even small styling choices can affect compatibility across email clients. If I did it again, I’d spend more time upfront prepping the layout and researching how to make it responsive without relying on media queries.
            </p>
          </div>
        </div>
        <div className="project-navigation">
          <div className="project-prev">
            <Link to="/projects">← PREV</Link>
            <p>myBCIT Redesign</p>
          </div>
          <div className="project-all">
            <Link to="/projects">VIEW ALL PROJECTS</Link>
          </div>
          <div className="project-next">
            <a href="#">NEXT →</a>
            <p>Jams App</p>
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
    <BackToTopLink />
    </>
  );
};

export default Project4Detail;


