
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import '../styles/components/footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container container">
        <div className="footer-grid">
          <div className="footer-column">
            <h3>Nirman360</h3>
            <p className="text-sm text-muted-foreground mb-4">
              The most trusted real estate platform in Bangladesh, helping you find your dream property with ease.
            </p>
            
            <div className="footer-social">
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                <Facebook size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">
                <Twitter size={18} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                <Instagram size={18} />
              </a>
            </div>
          </div>
          
          <div className="footer-column">
            <h3>Quick Links</h3>
            <div className="footer-links">
              <Link to="/properties?category=buy" className="footer-link">Buy Properties</Link>
              <Link to="/properties?category=rent" className="footer-link">Rent Properties</Link>
              <Link to="/buying-guide" className="footer-link">Buying Guide</Link>
              <Link to="/renting-guide" className="footer-link">Renting Guide</Link>
              <Link to="/area-snapshot" className="footer-link">Area Snapshot</Link>
              <Link to="/nirman-ai" className="footer-link">Nirman AI</Link>
            </div>
          </div>
          
          <div className="footer-column">
            <h3>Resources</h3>
            <div className="footer-links">
              <Link to="/legal-support" className="footer-link">Legal Support</Link>
              <Link to="/faq" className="footer-link">FAQ</Link>
              <Link to="/blog" className="footer-link">Blog</Link>
              <Link to="/about" className="footer-link">About Us</Link>
              <Link to="/contact" className="footer-link">Contact Us</Link>
              <Link to="/careers" className="footer-link">Careers</Link>
            </div>
          </div>
          
          <div className="footer-column">
            <h3>Contact Us</h3>
            <div className="footer-links">
              <a href="mailto:info@nirman360.com" className="footer-link flex items-center gap-2">
                <Mail size={16} />
                <span>info@nirman360.com</span>
              </a>
              <a href="tel:+8801712345678" className="footer-link flex items-center gap-2">
                <Phone size={16} />
                <span>+880 1712 345678</span>
              </a>
              <div className="footer-link flex items-start gap-2">
                <MapPin size={16} className="mt-1 shrink-0" />
                <span>House 12, Road 5, Banani, Dhaka 1213, Bangladesh</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} Nirman360. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
