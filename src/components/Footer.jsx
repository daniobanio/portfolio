import React from 'react';
import AnimatedSocialIcon from './AnimatedSocialIcon';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-online">
          <div className="online-label-wrapper">
            <div className="online-circle"></div>
            <p>Online at</p>
          </div>
          <div className="footer-icons">
            <div className="footer-icons-flex">
              <AnimatedSocialIcon 
                label="Instagram" 
                href="http://instagram.com/doobiedoesdo" 
                icon="mingcute:instagram-line" 
                width="32" 
                height="32" 
                style={{color: 'var(--white)'}} 
              />
              <AnimatedSocialIcon 
                label="YouTube" 
                href="https://www.youtube.com/@doobiedoesdo" 
                icon="mingcute:youtube-line" 
                width="32" 
                height="32" 
                style={{color: 'var(--white)'}} 
              />
              <AnimatedSocialIcon 
                label="LinkedIn" 
                href="https://www.linkedin.com/in/daniel-trinh-855520323/" 
                icon="mingcute:linkedin-line" 
                width="32" 
                height="32" 
                style={{color: 'var(--white)'}} 
              />
              <AnimatedSocialIcon 
                label="GitHub" 
                href="https://github.com/daniobanio" 
                icon="mingcute:github-line" 
                width="32" 
                height="32" 
                style={{color: 'var(--white)'}} 
              />
              <AnimatedSocialIcon 
                label="Email" 
                href="mailto:hello@danieltrinh.ca" 
                icon="mingcute:mail-line" 
                width="32" 
                height="32" 
                style={{color: 'var(--white)'}} 
              />
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <p>2025 Daniel Trinh. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;

