
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Building, User, Search, ShieldCheck, Building2, MapPin, Zap } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-mobile";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

interface HeaderProps {
  onLogoClick?: () => void; // Add this prop for admin access
}

const Header = ({ onLogoClick }: HeaderProps) => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  const navItems = [
    { label: "Home", path: "/", icon: Home },
    { label: "Buy", path: "/properties?category=buy", icon: Building },
    { label: "Rent", path: "/properties?category=rent", icon: Building2 },
    { label: "Area Snapshot", path: "/area-snapshot", icon: MapPin },
    { label: "Legal Support", path: "/legal-support", icon: ShieldCheck },
    { label: "Nirman AI", path: "/nirman-ai", icon: Zap, isHighlighted: true },
  ];
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link 
            to="/" 
            className="flex items-center space-x-2"
            onClick={() => onLogoClick && onLogoClick()}
          >
            <div className="bg-nirman-gold text-white font-bold rounded p-1.5">NIRMAN</div>
            <span className="font-display font-semibold text-xl">NIRMAN360</span>
          </Link>
        </div>
        
        {!isMobile ? (
          <nav className="flex items-center space-x-6 text-sm font-medium flex-1 justify-center">
            {navItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path}
                className={`flex items-center transition-colors hover:text-foreground/80 ${
                  item.isHighlighted 
                    ? "text-nirman-gold font-semibold" 
                    : "text-foreground/60"
                }`}
              >
                <item.icon className="mr-1.5 h-[1.1rem] w-[1.1rem]" />
                {item.label}
              </Link>
            ))}
          </nav>
        ) : (
          <div className="flex-1" />
        )}
        
        <div className="flex items-center justify-end space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="hidden md:flex"
            onClick={() => navigate("/ai-recommendations")}
          >
            <Search className="mr-2 h-3.5 w-3.5" />
            AI Recommendations
          </Button>

          <Button
            variant="default"
            size="sm"
            onClick={() => navigate("/post-property")}
            className="bg-nirman-gold hover:bg-nirman-gold/90"
          >
            <Building className="h-4 w-4 md:mr-2" />
            <span className="hidden md:inline">Post Your Property</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/dashboard")}
          >
            <User className="h-4 w-4 md:mr-2" />
            <span className="hidden md:inline">Account</span>
          </Button>
          
          {isMobile && (
            <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <line x1="4" x2="20" y1="12" y2="12" />
                    <line x1="4" x2="20" y1="6" y2="6" />
                    <line x1="4" x2="20" y1="18" y2="18" />
                  </svg>
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Nirman360</SheetTitle>
                  <SheetDescription>
                    Your Property Partner
                  </SheetDescription>
                </SheetHeader>
                <nav className="flex flex-col gap-4 mt-8">
                  {navItems.map((item) => (
                    <SheetClose asChild key={item.path}>
                      <Link 
                        to={item.path}
                        className={`flex items-center rounded-md px-2 py-1.5 transition-colors hover:bg-muted ${
                          item.isHighlighted ? "text-nirman-gold font-semibold" : ""
                        }`}
                        onClick={() => setShowMobileMenu(false)}
                      >
                        <item.icon className="mr-2.5 h-5 w-5" />
                        {item.label}
                      </Link>
                    </SheetClose>
                  ))}
                  <SheetClose asChild>
                    <Link 
                      to="/ai-recommendations"
                      className="flex items-center rounded-md px-2 py-1.5 transition-colors hover:bg-muted"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      <Search className="mr-2.5 h-5 w-5" />
                      AI Recommendations
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link 
                      to="/post-property"
                      className="flex items-center rounded-md px-2 py-1.5 transition-colors hover:bg-muted bg-nirman-gold/10 text-nirman-gold"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      <Building className="mr-2.5 h-5 w-5" />
                      Post Your Property
                    </Link>
                  </SheetClose>
                </nav>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
