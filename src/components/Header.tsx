
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Building, User, ShieldCheck, Building2, MapPin, Zap, Users, ArrowLeft, Calculator, Plus, MessageCircle, CreditCard } from "lucide-react";
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
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onLogoClick?: () => void;
}

const Header = ({ onLogoClick }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  const isHomePage = location.pathname === "/";
  
  const mainNavItems = [
    { label: "Buy", path: "/properties?category=buy", icon: Building },
    { label: "Rent", path: "/properties?category=rent", icon: Building2 },
    { label: "Trusted Developers", path: "/trusted-developers", icon: Users },
  ];

  const featureItems = [
    { label: "Area Snapshot", path: "/area-snapshot", icon: MapPin },
    { label: "Legal Support", path: "/legal-support", icon: ShieldCheck },
    { label: "EMI Calculator", path: "/emi-calculator", icon: CreditCard },
    { label: "Compare Property", path: "/compare-property", icon: Building2 },
  ];
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        {!isHomePage && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="mr-2"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        
        <div className={cn("mr-4 flex", isHomePage ? "" : "ml-0")}>
          <Link 
            to="/" 
            className="flex items-center space-x-2"
            onClick={() => onLogoClick && onLogoClick()}
          >
            <div className="bg-nirman-gold text-white font-bold rounded p-1.5">
              <Building className="h-5 w-5" />
            </div>
            <span className="font-display font-semibold text-xl">NIRMAN360</span>
          </Link>
        </div>
        
        {!isMobile ? (
          <nav className="flex items-center space-x-6 text-sm font-medium flex-1 justify-center">
            {mainNavItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path}
                className="flex items-center transition-colors hover:text-foreground/80 text-foreground/60"
              >
                <item.icon className="mr-1.5 h-[1.1rem] w-[1.1rem]" />
                {item.label}
              </Link>
            ))}
            
            {/* Post Your Property button */}
            <Button
              variant="default"
              size="sm"
              onClick={() => navigate("/post-property")}
              className="bg-nirman-gold hover:bg-nirman-gold/90 text-nirman-navy"
            >
              <Plus className="h-4 w-4 mr-2" />
              <span>Post Your Property</span>
            </Button>
            
            {/* Nirman AI button */}
            <Button
              variant="default"
              size="sm"
              onClick={() => navigate("/nirman-ai")}
              className="bg-nirman-gold hover:bg-nirman-gold/90 text-nirman-navy"
            >
              <Zap className="h-4 w-4 mr-2" />
              <span>Nirman AI</span>
            </Button>

            {/* ROI Calculator button */}
            <Button
              variant="default"
              size="sm"
              onClick={() => navigate("/roi-calculator")}
              className="bg-nirman-gold hover:bg-nirman-gold/90 text-nirman-navy"
            >
              <Calculator className="h-4 w-4 mr-2" />
              <span>ROI Calculator</span>
            </Button>

            {/* Community button */}
            <Button
              variant="default"
              size="sm"
              onClick={() => navigate("/community-chat")}
              className="bg-nirman-gold hover:bg-nirman-gold/90 text-nirman-navy"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              <span>Community</span>
            </Button>

            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Our Features</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {featureItems.map((item) => (
                        <li key={item.path}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={item.path}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="flex items-center">
                                <item.icon className="h-4 w-4 mr-2" />
                                <div className="text-sm font-medium leading-none">
                                  {item.label}
                                </div>
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
        ) : (
          <div className="flex-1" />
        )}
        
        <div className="flex items-center justify-end space-x-2 ml-auto">
          {/* Account button */}
          <Button
            variant="outline"
            size="sm"
            className="hidden md:flex"
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
                  {mainNavItems.map((item) => (
                    <SheetClose asChild key={item.path}>
                      <Link 
                        to={item.path}
                        className="flex items-center rounded-md px-2 py-1.5 transition-colors hover:bg-muted"
                        onClick={() => setShowMobileMenu(false)}
                      >
                        <item.icon className="mr-2.5 h-5 w-5" />
                        {item.label}
                      </Link>
                    </SheetClose>
                  ))}
                  
                  {/* Post Your Property button in mobile menu */}
                  <SheetClose asChild>
                    <Link 
                      to="/post-property"
                      className="flex items-center rounded-md px-2 py-1.5 bg-nirman-gold/20 text-nirman-gold font-semibold"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      <Plus className="mr-2.5 h-5 w-5" />
                      Post Your Property
                    </Link>
                  </SheetClose>
                  
                  {/* Nirman AI button in mobile menu */}
                  <SheetClose asChild>
                    <Link 
                      to="/nirman-ai"
                      className="flex items-center rounded-md px-2 py-1.5 bg-nirman-gold/20 text-nirman-gold font-semibold"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      <Zap className="mr-2.5 h-5 w-5" />
                      Nirman AI
                    </Link>
                  </SheetClose>
                  
                  {/* ROI Calculator button in mobile menu */}
                  <SheetClose asChild>
                    <Link 
                      to="/roi-calculator"
                      className="flex items-center rounded-md px-2 py-1.5 bg-nirman-gold/20 text-nirman-gold font-semibold"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      <Calculator className="mr-2.5 h-5 w-5" />
                      ROI Calculator
                    </Link>
                  </SheetClose>

                  {/* Community button in mobile menu */}
                  <SheetClose asChild>
                    <Link 
                      to="/community-chat"
                      className="flex items-center rounded-md px-2 py-1.5 bg-nirman-gold/20 text-nirman-gold font-semibold"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      <MessageCircle className="mr-2.5 h-5 w-5" />
                      Community
                    </Link>
                  </SheetClose>
                  
                  <div className="px-2 py-1.5 text-sm font-semibold">Our Features</div>
                  {featureItems.map((item) => (
                    <SheetClose asChild key={item.path}>
                      <Link 
                        to={item.path}
                        className="flex items-center rounded-md px-2 py-1.5 transition-colors hover:bg-muted"
                        onClick={() => setShowMobileMenu(false)}
                      >
                        <item.icon className="mr-2.5 h-5 w-5" />
                        {item.label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
      <div className="container text-center py-1 bg-nirman-cream">
        <p className="text-sm font-medium text-nirman-navy">
          Want to Build Your Dream Property? <Link to="/nirman-ai" className="text-nirman-gold underline">Use Nirman AI</Link>
        </p>
      </div>
    </header>
  );
};

export default Header;
