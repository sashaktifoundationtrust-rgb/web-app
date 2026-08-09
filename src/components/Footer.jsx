import React from 'react';
import { ArrowUp, Mail, Heart } from 'lucide-react';
import './Footer.css';

export default function Footer({ footerData, brand }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand-col">
            <h3 className="footer-logo">{brand}</h3>
            <p className="footer-tagline">{footerData.tagline}</p>

            <a href={`mailto:${footerData.email}`} className="footer-email">
              <Mail size={16} /> {footerData.email}
            </a>
          </div>

          <div className="footer-links-col">
            <h5 className="footer-links-title">Quick Links</h5>
            <ul className="footer-links-list">
              {footerData.links.map((link, idx) => (
                <li key={idx}>
                  <a href="#work">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-back-top-col">
            <button className="back-top-btn" onClick={scrollToTop} title="Back to top">
              <ArrowUp size={20} />
            </button>
            <span className="back-top-label">Back to Top</span>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">{footerData.copyright}</p>
          <p className="credit">
            Designed with <Heart size={12} className="heart-icon" /> for SaShakti Foundation
          </p>
        </div>
      </div>
    </footer>
  );
}
