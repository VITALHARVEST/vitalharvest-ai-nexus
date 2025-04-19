
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import PublicLayout from "./layouts/PublicLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products";
import SocialMedia from "./pages/SocialMedia";
import Feedback from "./pages/Feedback";
import Backup from "./pages/Backup";
import AIChatbot from "./components/AIChatbot";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import AIHub from "./pages/AIHub";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/products" element={<Products />} />
            <Route path="/about" element={<h1>About Page (Coming Soon)</h1>} />
            <Route path="/contact" element={<h1>Contact Page (Coming Soon)</h1>} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/ai-hub" element={<AIHub />} />
          </Route>
          
          {/* Admin routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="content" element={<SocialMedia />} />
            <Route path="customers" element={<Feedback />} />
            <Route path="backup" element={<Backup />} />
            <Route path="settings" element={<Settings />} />
            <Route path="ai-tools" element={<AIHub />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
        <AIChatbot />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
