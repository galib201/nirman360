
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Home, Menu, User, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          <Link to="/properties" className="text-sm font-medium hover:text-nirman-gold transition-colors">
            Browse Properties
          </Link>
          <Link to="/properties?category=buy" className="text-sm font-medium hover:text-nirman-gold transition-colors">
            Buy
          </Link>
          <Link to="/properties?category=rent" className="text-sm font-medium hover:text-nirman-gold transition-colors">
            Rent
          </Link>
          <Link to="/dashboard" className="text-sm font-medium hover:text-nirman-gold transition-colors">
            My Nirman
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
              className="text-sm font-medium py-2 hover:text-nirman-gold transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Browse Properties
            </Link>
            <Link 
              to="/properties?category=buy" 
              className="text-sm font-medium py-2 hover:text-nirman-gold transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Buy
            </Link>
            <Link 
              to="/properties?category=rent" 
              className="text-sm font-medium py-2 hover:text-nirman-gold transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Rent
            </Link>
            <Link 
              to="/dashboard" 
              className="text-sm font-medium py-2 hover:text-nirman-gold transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
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
