import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedNavItem from '../components/AnimatedNavItem';
import AnimatedSocialIcon from '../components/AnimatedSocialIcon';
import { useNavigation } from '../hooks/useNavigation';

const Project1Detail = () => {
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
              <h1 className="project-title">myBCIT Redesign</h1>
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
                  <li>April 2025 / 2 weeks</li>
                  <li>Figma, FigJam</li>
                </ul>
              </div>
            </div>
            <div className="project-links">
              <a href="#">VIEW PROTOTYPE</a>
            </div>
          </div>
          <div className="project-displayImg">
            <img src="/imgs/project1/home.webp" alt="Project Home" />
          </div>
        </div>
        <hr />
        <div className="project-content">
          <div className="project-para">
            <h1>Overview</h1>
            <p>
              myBCIT is the central student portal for BCIT. It’s where students manage nearly everything: tuition, grades, schedules, emails, important messages, and resources. As a student myself, I wanted to redesign this portal from the ground up, in order to improve user experience and rethink how it helps students accomplish their goals.
            </p>
          </div>
          <div className="project-img">
            <h1>Current myBCIT Site</h1>
            <div className="project-img-carousel">
              <img src="/imgs/project1/old-bcit2.webp" alt="Old BCIT 2" />
              <img src="/imgs/project1/old-bcit1.webp" alt="Old BCIT 1" />
              <img src="/imgs/project1/old-bcit3.webp" alt="Old BCIT 3" />
            </div>
          </div>
          <div className="project-para">
            <h1 className="yellow">Problem</h1>
            <p>
              It's meant to be the one-stop hub for their academic life — but for many students, it’s the one-stop every once in awhile source of stress, confusion, and missed information. New students logging into myBCIT for the first time are met with an outdated interface, confusing navigation, and no clear guidance on what to do next. Important actions like paying tuition, checking notifications, or accessing a class schedule are buried or scattered across disconnected pages.
            </p>
          </div>
          <div className="project-para">
            <h1 className="yellow">Solution</h1>
            <p>
              The new design introduces clearer navigation, task-oriented pages, and a visual hierarchy that reduces friction, surfaces key info quickly, and guides students like me who just want to get things done.
            </p>
          </div>
          <hr />
          <div className="project-para">
            <h1>Research</h1>
            <p>
              I began with a full audit of the current myBCIT website. I identified the pages most frequently used by students and noted how difficult they were to navigate. I documented everything in my FigJam board, where it became a brain dump space to: outline common user flows, mark usability issues, and compare layouts to other educational portals.
            </p>
          </div>
          <div className="project-img">
            <h1>FigJam Audit</h1>
            <iframe
              style={{ border: '1px solid rgba(0, 0, 0, 0.1)' }}
              width="800"
              height="450"
              src="https://embed.figma.com/board/ibhSVglwauwOphUGb1BYVr/Untitled?embed-host=share"
              allowFullScreen
              title="FigJam Audit"
            ></iframe>
          </div>
          <div className="project-para">
            <h1>Survey & User Interviews</h1>
            <p>
              To ground my thoughts in real feedback, I ran a small user survey with fellow students. I received 5 responses and conducted 3 follow-up interviews to get a better understanding of user goals, pain points, and behaviour.
            </p>
            <br />
            <h2>Key Insights</h2>
            <ul>
              <li>Most students log in to check grades, class schedule, tuition, and view BCIT messages or emails</li>
              <li>Students described the current portal as "ugly," "confusing", “difficult”, and "outdated"</li>
              <li>Most students have missed important updates like emails, announcements, or messages</li>
            </ul>
          </div>
          <div className="project-para">
            <h1>Persona</h1>
            <p>
              Empathizing with users provide me with a direction for my redesign. Based from my own experience, conversations with fellow students, survey responses, and interviews, this persona was created to reflect realistic user behaviour, pain points, goals, and needs, on myBCIT.
            </p>
          </div>
          <div className="project-img">
            <img src="/imgs/project1/persona.png" alt="Persona" />
          </div>
          <hr />
          <div className="project-para">
            <h1>Design</h1>
            <p>
              Every step of user research including personas, scenarios and journey mapping, was crucial in guiding my initial wireframes. My primary goal was to simplify the common user flows and clarify the UI for easy scannability. Using <a href="#">BCIT’s public style guide</a>, I recreated their colour palette, typography, and buttons in Figma to ensure the new design was true to BCIT’s brand.
            </p>
          </div>
          <div className="project-para">
            <h1>Try it yourself!</h1>
            <ul>
              <li>Check how much you've paid towards your tuition</li>
              <li>Find which campus the federal election voting is happening on</li>
              <li>Check who is the professor for Web Scripting 1</li>
              <li>Find where your student number and PEN is</li>
            </ul>
          </div>
          <div className="project-img">
            <h1>Figma Prototype</h1>
            <iframe
              style={{ border: '1px solid rgba(0, 0, 0, 0.1)' }}
              width="800"
              height="450"
              src="https://embed.figma.com/proto/FgChcJXx79UeWupNu371Gn/myBCIT?node-id=2-105&p=f&scaling=scale-down-width&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=2%3A105&embed-host=share"
              allowFullScreen
              title="Figma Prototype"
            ></iframe>
          </div>
          <hr />
          <div className="project-para">
            <h1>Feedback</h1>
            <p>
              I tested the redesign with 4 BCIT students using 5 task-based usability tests.
            </p>
          </div>
          <div className="project-img">
            <img src="/imgs/project1/usabilitytest.png" alt="Usability Test" />
          </div>
          <div className="project-para">
            <ol>
              <li>Can you tell me how much I’ve paid so far towards my tuition? Can you also print the receipt for my latest tuition payment?</li>
              <li>Where would you go to see when and where your classes are happening NEXT week?</li>
              <li>A message just came in from BCIT announcing that Federal Election Voting is happening. Can you tell me what campus it’s happening on?</li>
              <li>Can you tell me who the professor for the Web Scripting 1 course is? I also need to know what his email and phone number is.</li>
              <li>Find where your student number and PEN is. Where would you go?</li>
            </ol>
            <br />
            <p>
              Using the Nielsen Norman Group’s metric for success rate formula the final prototype received a usability percentage of 100%. (Success rate + (Partial success x 0.5) / Number of task = Usability %)
            </p>
          </div>
          <hr />
          <div className="project-para">
            <h1>Reflection</h1>
            <p>
              Through this project, I conducted user research and did my best to understand and empathize with users. Taking the time to gather real feedback, create personas, and map out their experiences helped me design something that was grounded in how students actually think and behave. It shaped everything from the user flows to the wireframes.
            </p>
            <br />
            <p>
              If I could change one thing, I would’ve started testing much earlier. I only got feedback at the hi-fi stage, which made it harder to make meaningful changes. A lot of the insights I got could’ve helped during wireframing or even before that.
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

export default Project1Detail;
