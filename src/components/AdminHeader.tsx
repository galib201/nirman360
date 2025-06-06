
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, User, Bell } from "lucide-react";
import { toast } from "sonner";

const AdminHeader = () => {
  const navigate = useNavigate();
  const adminEmail = localStorage.getItem("userEmail") || "admin@nirman360.com";

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-nirman-navy">Nirman360 Admin</h1>
          <p className="text-sm text-gray-600">Real Estate Management Dashboard</p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
          </Button>
          
          {/* Admin Info */}
          <div className="flex items-center space-x-2">
            <div className="bg-nirman-gold text-nirman-navy rounded-full p-2">
              <User className="h-4 w-4" />
            </div>
            <div className="text-sm">
              <p className="font-medium text-nirman-navy">Admin</p>
              <p className="text-gray-500">{adminEmail}</p>
            </div>
          </div>
          
          {/* Logout */}
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="border-red-200 text-red-600 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
