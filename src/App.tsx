
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { ThemeProvider } from "next-themes";
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
import PostProperty from "./pages/PostProperty";
import BuyingGuide from "./pages/BuyingGuide";
import RentingGuide from "./pages/RentingGuide";
import SellerGuide from "./pages/SellerGuide";
import PricingFees from "./pages/PricingFees";
import TrustedDevelopers from "./pages/TrustedDevelopers";
import CommunityChat from "./pages/CommunityChat";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Define a common interface for page props to enforce type safety
interface PageProps {
  onLogoClick?: () => void;
}

// Assuming all these components accept onLogoClick as a prop
// We're using a wrapper to solve the TypeScript error
const withLogoClick = (Component: React.ComponentType<PageProps>, onLogoClickHandler: () => void) => {
  return <Component onLogoClick={onLogoClickHandler} />;
};

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
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={withLogoClick(Index, handleLogoClick)} />
            <Route path="/properties" element={withLogoClick(Properties, handleLogoClick)} />
            <Route path="/properties/:id" element={withLogoClick(PropertyDetail, handleLogoClick)} />
            <Route path="/dashboard" element={withLogoClick(Dashboard, handleLogoClick)} />
            <Route path="/legal-support" element={withLogoClick(LegalSupport, handleLogoClick)} />
            <Route path="/book-visit/:id" element={withLogoClick(BookVisit, handleLogoClick)} />
            <Route path="/area-snapshot" element={withLogoClick(AreaSnapshot, handleLogoClick)} />
            <Route path="/ai-recommendations" element={withLogoClick(AIRecommendations, handleLogoClick)} />
            <Route path="/nirman-ai" element={withLogoClick(NirmanAI, handleLogoClick)} />
            <Route path="/post-property" element={withLogoClick(PostProperty, handleLogoClick)} />
            <Route path="/buying-guide" element={withLogoClick(BuyingGuide, handleLogoClick)} />
            <Route path="/renting-guide" element={withLogoClick(RentingGuide, handleLogoClick)} />
            <Route path="/seller-guide" element={withLogoClick(SellerGuide, handleLogoClick)} />
            <Route path="/pricing-fees" element={withLogoClick(PricingFees, handleLogoClick)} />
            <Route path="/trusted-developers" element={withLogoClick(TrustedDevelopers, handleLogoClick)} />
            <Route path="/community-chat" element={withLogoClick(CommunityChat, handleLogoClick)} />
            {isAdminEnabled && <Route path="/admin" element={<Admin />} />}
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={withLogoClick(NotFound, handleLogoClick)} />
          </Routes>
          <Toaster />
          <Sonner />
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
