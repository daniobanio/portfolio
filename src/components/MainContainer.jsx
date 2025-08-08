import React from 'react';
import TopBar from './TopBar';
import NavBar from './NavBar';
import Footer from './Footer';
import './MainContainer.scss';

const MainContainer = ({ children }) => (
  <main className="main-container">
    <TopBar />
    <NavBar />
    <div className="main-content">
      {children}
    </div>
    <Footer />
  </main>
);

export default MainContainer;
