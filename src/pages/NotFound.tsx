
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../styles/NotFound.css";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="not-found-container">
      <Header />
      
      <div className="not-found-content">
        <div className="not-found-card">
          <h1 className="not-found-title">
            4<span className="not-found-404-accent">0</span>4
          </h1>
          <p className="not-found-message">
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
