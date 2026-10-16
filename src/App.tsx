
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
const Evaluation = lazy(() => import("./pages/Evaluation"));
const HowItWorks = lazy(() => import("./pages/HowItWorks"));
const Reviews = lazy(() => import("./pages/Reviews"));
const Komsomolsk = lazy(() => import("./pages/cities/Komsomolsk"));
const Amursk = lazy(() => import("./pages/cities/Amursk"));
const SovetskayaGavan = lazy(() => import("./pages/cities/SovetskayaGavan"));
const Bikin = lazy(() => import("./pages/cities/Bikin"));
const DamagedCars = lazy(() => import("./pages/articles/DamagedCars"));
const CreditCars = lazy(() => import("./pages/articles/CreditCars"));
const UrgentBuyout = lazy(() => import("./pages/articles/UrgentBuyout"));
const SeoSettings = lazy(() => import("./pages/SeoSettings"));
const ThankYou = lazy(() => import("./pages/ThankYou"));
const AdminLeads = lazy(() => import("./pages/AdminLeads"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={null}>
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
          <Route path="/seo-settings" element={<SeoSettings />} />
          <Route path="/spasibo" element={<ThankYou />} />
          <Route path="/admin-leads" element={<AdminLeads />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;