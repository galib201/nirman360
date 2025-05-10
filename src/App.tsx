
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import LegalSupport from "./pages/LegalSupport";
import BookVisit from "./pages/BookVisit";
import AreaSnapshot from "./pages/AreaSnapshot";
import AIRecommendations from "./pages/AIRecommendations";
import NirmanAI from "./pages/NirmanAI";
import Admin from "./pages/Admin";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  const [logoClickCount, setLogoClickCount] = useState(0);
  const [isAdminEnabled, setIsAdminEnabled] = useState(false);
  
  // Effect to reset logo click count after a timeout
  useEffect(() => {
    if (logoClickCount > 0) {
      const timeout = setTimeout(() => {
        setLogoClickCount(0);
      }, 3000); // Reset after 3 seconds of inactivity
      
      return () => clearTimeout(timeout);
    }
  }, [logoClickCount]);
  
  // Monitor logo clicks to enable admin page
  useEffect(() => {
    if (logoClickCount >= 5 && !isAdminEnabled) {
      setIsAdminEnabled(true);
    }
  }, [logoClickCount, isAdminEnabled]);
  
  // Function to increment logo click count (this will be passed to the Header component)
  const handleLogoClick = () => {
    setLogoClickCount(prevCount => prevCount + 1);
  };
  
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index onLogoClick={handleLogoClick} />} />
          <Route path="/properties" element={<Properties onLogoClick={handleLogoClick} />} />
          <Route path="/properties/:id" element={<PropertyDetail onLogoClick={handleLogoClick} />} />
          <Route path="/dashboard" element={<Dashboard onLogoClick={handleLogoClick} />} />
          <Route path="/legal-support" element={<LegalSupport onLogoClick={handleLogoClick} />} />
          <Route path="/book-visit/:id" element={<BookVisit onLogoClick={handleLogoClick} />} />
          <Route path="/area-snapshot" element={<AreaSnapshot onLogoClick={handleLogoClick} />} />
          <Route path="/ai-recommendations" element={<AIRecommendations onLogoClick={handleLogoClick} />} />
          <Route path="/nirman-ai" element={<NirmanAI onLogoClick={handleLogoClick} />} />
          {isAdminEnabled && <Route path="/admin" element={<Admin />} />}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound onLogoClick={handleLogoClick} />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
