
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Menu, X, User } from 'lucide-react';
import '../styles/components/header.css';

const Header = ({ onLogoClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <header className="header">
      <div className="header-container container">
        <div className="header-logo">
          <Link to="/" onClick={onLogoClick}>
            <span>Nirman360</span>
          </Link>
        </div>
        
        <nav className="header-nav">
          <Link 
            to="/properties?category=buy" 
            className={`header-nav-item ${isActive('/properties') && !location.search.includes('category=rent') ? 'active' : ''}`}
          >
            Buy
          </Link>
          <Link 
            to="/properties?category=rent" 
            className={`header-nav-item ${location.search.includes('category=rent') ? 'active' : ''}`}
          >
            Rent
          </Link>
          <Link 
            to="/buying-guide" 
            className={`header-nav-item ${isActive('/buying-guide') ? 'active' : ''}`}
          >
            Buying Guide
          </Link>
          <Link 
            to="/renting-guide" 
            className={`header-nav-item ${isActive('/renting-guide') ? 'active' : ''}`}
          >
            Renting Guide
          </Link>
        </nav>
        
        <div className="header-actions">
          <Button asChild variant="outline">
            <Link to="/dashboard">
              <User className="h-4 w-4 mr-2" />
              My Account
            </Link>
          </Button>
          
          <button className="header-menu-button" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      
      {mobileMenuOpen && (
        <div className="header-nav-mobile">
          <Link 
            to="/properties?category=buy" 
            className={`header-nav-item ${isActive('/properties') && !location.search.includes('category=rent') ? 'active' : ''}`}
            onClick={toggleMobileMenu}
          >
            Buy
          </Link>
          <Link 
            to="/properties?category=rent" 
            className={`header-nav-item ${location.search.includes('category=rent') ? 'active' : ''}`}
            onClick={toggleMobileMenu}
          >
            Rent
          </Link>
          <Link 
            to="/buying-guide" 
            className={`header-nav-item ${isActive('/buying-guide') ? 'active' : ''}`}
            onClick={toggleMobileMenu}
          >
            Buying Guide
          </Link>
          <Link 
            to="/renting-guide" 
            className={`header-nav-item ${isActive('/renting-guide') ? 'active' : ''}`}
            onClick={toggleMobileMenu}
          >
            Renting Guide
          </Link>
          <Link 
            to="/dashboard" 
            className={`header-nav-item ${isActive('/dashboard') ? 'active' : ''}`}
            onClick={toggleMobileMenu}
          >
            My Account
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
