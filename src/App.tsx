
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "@/components/ui/sonner";
import Index from '@/pages/Index';
import Properties from '@/pages/Properties';
import PropertyDetail from '@/pages/PropertyDetail';
import BookVisit from '@/pages/BookVisit';
import PostProperty from '@/pages/PostProperty';
import Dashboard from '@/pages/Dashboard';
import TrustedDevelopers from '@/pages/TrustedDevelopers';
import AreaSnapshot from '@/pages/AreaSnapshot';
import LegalSupport from '@/pages/LegalSupport';
import NirmanAI from '@/pages/NirmanAI';
import ROICalculator from '@/pages/ROICalculator';
import EMICalculator from '@/pages/EMICalculator';
import CommunityChat from '@/pages/CommunityChat';
import Admin from '@/pages/Admin';
import NotFound from '@/pages/NotFound';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/properties/:id" element={<PropertyDetail />} />
            <Route path="/book-visit/:id" element={<BookVisit />} />
            <Route path="/post-property" element={<PostProperty />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/trusted-developers" element={<TrustedDevelopers />} />
            <Route path="/area-snapshot" element={<AreaSnapshot />} />
            <Route path="/legal-support" element={<LegalSupport />} />
            <Route path="/nirman-ai" element={<NirmanAI />} />
            <Route path="/roi-calculator" element={<ROICalculator />} />
            <Route path="/emi-calculator" element={<EMICalculator />} />
            <Route path="/community-chat" element={<CommunityChat />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
