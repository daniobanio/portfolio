import React from 'react';
import { Link } from 'react-router-dom';

const projects = [
  { slug: '/projects/mybcit-redesign', title: 'myBCIT Redesign' },
  { slug: '/projects/kim-huynh-portfolio', title: "Kim Huynh's Portfolio" },
  { slug: '/projects/jam-music-app', title: 'Jam Music App' },
  { slug: '/projects/playpal-newsletter', title: 'PlayPal Newsletter' }
];

const ProjectNavigation = ({ currentSlug }) => {
  const currentIndex = projects.findIndex(p => p.slug === currentSlug);
  if (currentIndex === -1) return null;

  const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
  const nextIndex = (currentIndex + 1) % projects.length;

  const prev = projects[prevIndex];
  const next = projects[nextIndex];

  return (
    <div className="project-navigation">
      <div className="project-prev">
        <Link to={prev.slug}>← PREV</Link>
        <p>{prev.title}</p>
      </div>
      <div className="project-all">
        <Link to="/projects">VIEW ALL PROJECTS</Link>
      </div>
      <div className="project-next">
        <Link to={next.slug}>NEXT →</Link>
        <p>{next.title}</p>
      </div>
    </div>
  );
};

export default ProjectNavigation;


