
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import "../styles/NotFound.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface NotFoundProps {
  onLogoClick?: () => void;
}

const NotFound = ({ onLogoClick }: NotFoundProps) => {
  return (
    <div className="not-found-container">
      <Header onLogoClick={onLogoClick} />
      <div className="not-found-content">
        <div className="not-found-card">
          <h1 className="not-found-title">
            <span className="not-found-404-accent">404</span> Not Found
          </h1>
          <p className="not-found-message">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <Button asChild>
            <Link to="/" className="not-found-home-button">
              <Home className="not-found-home-icon" />
              <span>Go Back Home</span>
            </Link>
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
