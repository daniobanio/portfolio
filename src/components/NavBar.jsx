import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.scss';

const NavBar = () => (
  <div className="nav-container">
    <ul className="nav-left">
      <li className="nav-home"><Link to="/">Home</Link></li>
    </ul>
    <ul className="nav-right">
      <li><Link to="/about">About</Link></li>
      <li><Link to="/projects">Projects</Link></li>
      <li><a href="#">Workflow</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
  </div>
);

export default NavBar;
