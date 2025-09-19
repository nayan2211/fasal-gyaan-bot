import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { FarmerProfile } from "./components/FarmerProfile";
import { MarketPrices } from "./components/MarketPrices";
import { DiseaseDetection } from "./components/DiseaseDetection";
import { GovernmentSchemes } from "./components/GovernmentSchemes";
import { CropRecommendation } from "./components/CropRecommendation";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<FarmerProfile />} />
            <Route path="/market-prices" element={<MarketPrices />} />
            <Route path="/disease-detection" element={<DiseaseDetection />} />
            <Route path="/government-schemes" element={<GovernmentSchemes />} />
            <Route path="/crop-recommendation" element={<CropRecommendation />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
