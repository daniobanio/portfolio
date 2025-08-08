import React from 'react';
import './Footer.scss';

const Footer = () => (
  <div className="footer">
    <div className="footer-container">
      <div className="footer-online">
        <div className="online-circle"></div>
        <p>Online at</p>
        <div className="footer-icons">
          <div className="footer-icons-flex">
            <a href="#"><span className="iconify" data-icon="mingcute:instagram-line"></span></a>
            <a href="#"><span className="iconify" data-icon="mingcute:youtube-line"></span></a>
            <a href="#"><span className="iconify" data-icon="mingcute:linkedin-line"></span></a>
            <a href="#"><span className="iconify" data-icon="mingcute:github-line"></span></a>
            <a href="#"><span className="iconify" data-icon="mingcute:mail-line"></span></a>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <p>2025 Daniel Trinh. All Rights Reserved.</p>
      </div>
    </div>
  </div>
);

export default Footer;
