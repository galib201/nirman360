
import React, { useState } from 'react';
import { Menu, X, Home, Building, User, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useNavigate } from 'react-router-dom';

const MobileNavigation = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const navigationItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Building, label: 'Properties', href: '/properties' },
    { icon: User, label: 'Dashboard', href: '/dashboard' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ];

  const handleNavigation = (href: string) => {
    navigate(href);
    setOpen(false);
  };

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="sm" className="p-2">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold text-nirman-navy">Menu</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setOpen(false)}
                className="p-1"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <nav className="flex-1 px-4 py-6">
              <ul className="space-y-2">
                {navigationItems.map((item) => (
                  <li key={item.href}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-3 h-12"
                      onClick={() => handleNavigation(item.href)}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </Button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavigation;
