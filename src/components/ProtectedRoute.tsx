
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute = ({ children, requireAdmin = false }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const userRole = localStorage.getItem("userRole");
    
    if (!isLoggedIn) {
      toast.error("Please login to access this page");
      navigate("/login");
      return;
    }
    
    if (requireAdmin && userRole !== "admin") {
      toast.error("Admin access required");
      navigate("/");
      return;
    }
  }, [navigate, requireAdmin]);
  
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userRole = localStorage.getItem("userRole");
  
  if (!isLoggedIn) {
    return null;
  }
  
  if (requireAdmin && userRole !== "admin") {
    return null;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
