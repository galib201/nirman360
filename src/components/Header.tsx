
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Home, Menu, User, X, Building, Search, MapPin, Calendar, Book } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  // Helper function to determine if a link is active
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-nirman-navy text-white rounded flex items-center justify-center">
              <Home size={18} />
            </div>
            <span className="font-display text-xl font-semibold text-nirman-navy">
              Nirman<span className="text-nirman-gold">360</span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            to="/properties" 
            className={`text-sm font-medium transition-colors ${
              isActive('/properties') && !location.search.includes('category=') 
                ? 'text-nirman-gold' 
                : 'hover:text-nirman-gold'
            }`}
          >
            <div className="flex items-center gap-1">
              <Building size={16} />
              <span>Browse Properties</span>
            </div>
          </Link>
          <Link 
            to="/properties?category=buy" 
            className={`text-sm font-medium transition-colors ${
              location.search.includes('category=buy') 
                ? 'text-nirman-gold' 
                : 'hover:text-nirman-gold'
            }`}
          >
            <div className="flex items-center gap-1">
              <Search size={16} />
              <span>Buy</span>
            </div>
          </Link>
          <Link 
            to="/properties?category=rent" 
            className={`text-sm font-medium transition-colors ${
              location.search.includes('category=rent') 
                ? 'text-nirman-gold' 
                : 'hover:text-nirman-gold'
            }`}
          >
            <div className="flex items-center gap-1">
              <MapPin size={16} />
              <span>Rent</span>
            </div>
          </Link>
          <Link 
            to="/dashboard" 
            className={`text-sm font-medium transition-colors ${
              isActive('/dashboard') 
                ? 'text-nirman-gold' 
                : 'hover:text-nirman-gold'
            }`}
          >
            <div className="flex items-center gap-1">
              <User size={16} />
              <span>My Nirman</span>
            </div>
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="outline" asChild>
            <Link to="/login">
              <User size={16} className="mr-2" />
              Sign In
            </Link>
          </Button>
          <Button>
            <Link to="/post-property">Post Property</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-b">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link 
              to="/properties" 
              className={`text-sm font-medium py-2 flex items-center gap-2 ${
                isActive('/properties') && !location.search.includes('category=')
                  ? 'text-nirman-gold' 
                  : 'hover:text-nirman-gold'
              } transition-colors`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Building size={16} />
              Browse Properties
            </Link>
            <Link 
              to="/properties?category=buy" 
              className={`text-sm font-medium py-2 flex items-center gap-2 ${
                location.search.includes('category=buy')
                  ? 'text-nirman-gold' 
                  : 'hover:text-nirman-gold'
              } transition-colors`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Search size={16} />
              Buy
            </Link>
            <Link 
              to="/properties?category=rent" 
              className={`text-sm font-medium py-2 flex items-center gap-2 ${
                location.search.includes('category=rent')
                  ? 'text-nirman-gold' 
                  : 'hover:text-nirman-gold'
              } transition-colors`}
              onClick={() => setIsMenuOpen(false)}
            >
              <MapPin size={16} />
              Rent
            </Link>
            <Link 
              to="/dashboard" 
              className={`text-sm font-medium py-2 flex items-center gap-2 ${
                isActive('/dashboard')
                  ? 'text-nirman-gold' 
                  : 'hover:text-nirman-gold'
              } transition-colors`}
              onClick={() => setIsMenuOpen(false)}
            >
              <User size={16} />
              My Nirman
            </Link>
            <div className="flex flex-col gap-2 pt-2 border-t">
              <Button variant="outline" asChild className="justify-start">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <User size={16} className="mr-2" />
                  Sign In
                </Link>
              </Button>
              <Button asChild className="justify-start">
                <Link to="/post-property" onClick={() => setIsMenuOpen(false)}>
                  Post Property
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
