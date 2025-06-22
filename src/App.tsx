
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import ComparePropertyPage from "./pages/CompareProperty";
import BookVisit from "./pages/BookVisit";
import PostProperty from "./pages/PostProperty";
import Dashboard from "./pages/Dashboard";
import FindProperty from "./pages/FindProperty";
import AIRecommendations from "./pages/AIRecommendations";
import NirmanAI from "./pages/NirmanAI";
import EMICalculator from "./pages/EMICalculator";
import ROICalculator from "./pages/ROICalculator";
import AreaSnapshot from "./pages/AreaSnapshot";
import CommunityChat from "./pages/CommunityChat";
import Admin from "./pages/Admin";
import TrustedDevelopers from "./pages/TrustedDevelopers";
import LegalSupport from "./pages/LegalSupport";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Cookies from "./pages/Cookies";
import BuyingGuide from "./pages/BuyingGuide";
import RentingGuide from "./pages/RentingGuide";
import SellerGuide from "./pages/SellerGuide";
import PropertyManagement from "./pages/PropertyManagement";
import Photography from "./pages/Photography";
import PricingFees from "./pages/PricingFees";
import NotFound from "./pages/NotFound";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/properties/:id" element={<PropertyDetail />} />
            <Route path="/compare-property" element={<ComparePropertyPage />} />
            <Route path="/book-visit/:id" element={<BookVisit />} />
            <Route path="/post-property" element={<PostProperty />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route path="/find-property" element={<FindProperty />} />
            <Route path="/ai-recommendations" element={<AIRecommendations />} />
            <Route path="/nirman-ai" element={<NirmanAI />} />
            <Route path="/emi-calculator" element={<EMICalculator />} />
            <Route path="/roi-calculator" element={<ROICalculator />} />
            <Route path="/area-snapshot" element={<AreaSnapshot />} />
            <Route path="/community-chat" element={<CommunityChat />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute requireAdmin={true}>
                  <Admin />
                </ProtectedRoute>
              } 
            />
            <Route path="/trusted-developers" element={<TrustedDevelopers />} />
            <Route path="/legal-support" element={<LegalSupport />} />
            <Route path="/services/legal-help" element={<LegalSupport />} />
            <Route path="/services/property-management" element={<PropertyManagement />} />
            <Route path="/services/photography" element={<Photography />} />
            <Route path="/guides/buying" element={<BuyingGuide />} />
            <Route path="/guides/renting" element={<RentingGuide />} />
            <Route path="/guides/selling" element={<SellerGuide />} />
            <Route path="/pricing" element={<PricingFees />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
