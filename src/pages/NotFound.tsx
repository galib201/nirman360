
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-grow flex items-center justify-center bg-nirman-lightblue">
        <div className="text-center px-4">
          <h1 className="text-6xl md:text-8xl font-display font-bold mb-6 text-nirman-navy">
            4<span className="text-nirman-gold">0</span>4
          </h1>
          <p className="text-xl mb-8 max-w-md">
            Oops! We couldn't find the property or page you were looking for.
          </p>
          <Button asChild size="lg">
            <a href="/">
              <Home className="mr-2 h-4 w-4" />
              Return to Home
            </a>
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
