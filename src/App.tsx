
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import Index from "@/pages/Index";
import Properties from "@/pages/Properties";
import PropertyDetail from "@/pages/PropertyDetail";
import FindProperty from "@/pages/FindProperty";
import PostProperty from "@/pages/PostProperty";
import AIRecommendations from "@/pages/AIRecommendations";
import NirmanAI from "@/pages/NirmanAI";
import TrustedDevelopers from "@/pages/TrustedDevelopers";
import LegalSupport from "@/pages/LegalSupport";
import CompareProperty from "@/pages/CompareProperty";
import BookVisit from "@/pages/BookVisit";
import EMICalculator from "@/pages/EMICalculator";
import ROICalculator from "@/pages/ROICalculator";
import AreaSnapshot from "@/pages/AreaSnapshot";
import Dashboard from "@/pages/Dashboard";
import PropertyManagement from "@/pages/PropertyManagement";
import BuyingGuide from "@/pages/BuyingGuide";
import SellerGuide from "@/pages/SellerGuide";
import RentingGuide from "@/pages/RentingGuide";
import CommunityChat from "@/pages/CommunityChat";
import Photography from "@/pages/Photography";
import Login from "@/pages/Login";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";
import Cookies from "@/pages/Cookies";
import PricingFees from "@/pages/PricingFees";
import NotFound from "@/pages/NotFound";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminLayout from "@/components/AdminLayout";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminProperties from "@/pages/AdminProperties";
import AdminUsers from "@/pages/AdminUsers";
import AdminLegal from "@/pages/AdminLegal";
import AdminAnnouncements from "@/pages/AdminAnnouncements";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-background">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/property/:id" element={<PropertyDetail />} />
            <Route path="/find-property" element={<FindProperty />} />
            <Route path="/post-property" element={<PostProperty />} />
            <Route path="/ai-recommendations" element={<AIRecommendations />} />
            <Route path="/nirman-ai" element={<NirmanAI />} />
            <Route path="/trusted-developers" element={<TrustedDevelopers />} />
            <Route path="/legal-support" element={<LegalSupport />} />
            <Route path="/compare-property" element={<CompareProperty />} />
            <Route path="/book-visit" element={<BookVisit />} />
            <Route path="/emi-calculator" element={<EMICalculator />} />
            <Route path="/roi-calculator" element={<ROICalculator />} />
            <Route path="/area-snapshot" element={<AreaSnapshot />} />
            <Route path="/buying-guide" element={<BuyingGuide />} />
            <Route path="/seller-guide" element={<SellerGuide />} />
            <Route path="/renting-guide" element={<RentingGuide />} />
            <Route path="/community-chat" element={<CommunityChat />} />
            <Route path="/photography" element={<Photography />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/pricing-fees" element={<PricingFees />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/property-management" element={
              <ProtectedRoute>
                <PropertyManagement />
              </ProtectedRoute>
            } />
            
            {/* Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute requireAdmin>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<AdminDashboard />} />
              <Route path="properties" element={<AdminProperties />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="legal" element={<AdminLegal />} />
              <Route path="announcements" element={<AdminAnnouncements />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
