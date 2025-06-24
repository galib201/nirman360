
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import ErrorBoundary from "@/components/ui/error-boundary";
import SkipLink from "@/components/ui/skip-link";
import { Suspense, lazy } from "react";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";

// Lazy load pages for better performance
const Index = lazy(() => import("@/pages/Index"));
const Properties = lazy(() => import("@/pages/Properties"));
const PropertyDetail = lazy(() => import("@/pages/PropertyDetail"));
const FindProperty = lazy(() => import("@/pages/FindProperty"));
const PostProperty = lazy(() => import("@/pages/PostProperty"));
const AIRecommendations = lazy(() => import("@/pages/AIRecommendations"));
const NirmanAI = lazy(() => import("@/pages/NirmanAI"));
const TrustedDevelopers = lazy(() => import("@/pages/TrustedDevelopers"));
const LegalSupport = lazy(() => import("@/pages/LegalSupport"));
const CompareProperty = lazy(() => import("@/pages/CompareProperty"));
const BookVisit = lazy(() => import("@/pages/BookVisit"));
const EMICalculator = lazy(() => import("@/pages/EMICalculator"));
const ROICalculator = lazy(() => import("@/pages/ROICalculator"));
const AreaSnapshot = lazy(() => import("@/pages/AreaSnapshot"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const PropertyManagement = lazy(() => import("@/pages/PropertyManagement"));
const BuyingGuide = lazy(() => import("@/pages/BuyingGuide"));
const SellerGuide = lazy(() => import("@/pages/SellerGuide"));
const RentingGuide = lazy(() => import("@/pages/RentingGuide"));
const CommunityChat = lazy(() => import("@/pages/CommunityChat"));
const Photography = lazy(() => import("@/pages/Photography"));
const Login = lazy(() => import("@/pages/Login"));
const Terms = lazy(() => import("@/pages/Terms"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const Cookies = lazy(() => import("@/pages/Cookies"));
const PricingFees = lazy(() => import("@/pages/PricingFees"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const ProtectedRoute = lazy(() => import("@/components/ProtectedRoute"));
const AdminLayout = lazy(() => import("@/components/AdminLayout"));
const AdminDashboard = lazy(() => import("@/pages/AdminDashboard"));
const AdminProperties = lazy(() => import("@/pages/AdminProperties"));
const AdminUsers = lazy(() => import("@/pages/AdminUsers"));
const AdminLegal = lazy(() => import("@/pages/AdminLegal"));
const AdminAnnouncements = lazy(() => import("@/pages/AdminAnnouncements"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

const PageFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <LoadingSkeleton type="card" count={1} className="w-full max-w-md" />
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="min-h-screen bg-background">
            <SkipLink />
            <Suspense fallback={<PageFallback />}>
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
            </Suspense>
            <Toaster />
          </div>
        </Router>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
