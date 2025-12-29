
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Evaluation from "./pages/Evaluation";
import HowItWorks from "./pages/HowItWorks";
import Reviews from "./pages/Reviews";
import Komsomolsk from "./pages/cities/Komsomolsk";
import Amursk from "./pages/cities/Amursk";
import SovetskayaGavan from "./pages/cities/SovetskayaGavan";
import Bikin from "./pages/cities/Bikin";
import DamagedCars from "./pages/articles/DamagedCars";
import CreditCars from "./pages/articles/CreditCars";
import UrgentBuyout from "./pages/articles/UrgentBuyout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/evaluation" element={<Evaluation />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/komsomolsk" element={<Komsomolsk />} />
          <Route path="/amursk" element={<Amursk />} />
          <Route path="/sovetskaya-gavan" element={<SovetskayaGavan />} />
          <Route path="/bikin" element={<Bikin />} />
          <Route path="/vykup-bityh-avto" element={<DamagedCars />} />
          <Route path="/vykup-kreditnyh-avto" element={<CreditCars />} />
          <Route path="/srochnyj-vykup-avto" element={<UrgentBuyout />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;