
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import PublicLayout from "./layouts/PublicLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

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
            <Route path="/products" element={<h1>Products Page (Coming Soon)</h1>} />
            <Route path="/about" element={<h1>About Page (Coming Soon)</h1>} />
            <Route path="/contact" element={<h1>Contact Page (Coming Soon)</h1>} />
          </Route>
          
          {/* Admin routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<h1>Admin Dashboard (Coming Soon)</h1>} />
            <Route path="dashboard" element={<h1>Dashboard Details (Coming Soon)</h1>} />
            <Route path="content" element={<h1>Content Management (Coming Soon)</h1>} />
            <Route path="customers" element={<h1>Customer Management (Coming Soon)</h1>} />
            <Route path="settings" element={<h1>Settings (Coming Soon)</h1>} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
