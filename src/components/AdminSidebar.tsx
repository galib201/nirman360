
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Building, 
  Users, 
  Scale, 
  Megaphone, 
  BarChart3,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const AdminSidebar = ({ isCollapsed, onToggle }: AdminSidebarProps) => {
  const location = useLocation();

  const menuItems = [
    {
      label: "Dashboard",
      path: "/admin",
      icon: BarChart3
    },
    {
      label: "Properties",
      path: "/admin/properties",
      icon: Building
    },
    {
      label: "Users",
      path: "/admin/users",
      icon: Users
    },
    {
      label: "Legal Partners",
      path: "/admin/legal",
      icon: Scale
    },
    {
      label: "Announcements",
      path: "/admin/announcements",
      icon: Megaphone
    }
  ];

  return (
    <div className={cn(
      "bg-nirman-navy text-white transition-all duration-300 flex flex-col",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-nirman-gold/20">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h2 className="text-lg font-bold text-nirman-gold">Admin Panel</h2>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="text-nirman-gold hover:bg-nirman-gold/10"
          >
            {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center p-3 rounded-lg transition-colors",
                    isActive 
                      ? "bg-nirman-gold text-nirman-navy" 
                      : "text-white hover:bg-nirman-gold/10 hover:text-nirman-gold",
                    isCollapsed && "justify-center"
                  )}
                >
                  <item.icon className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;
