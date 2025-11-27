
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import IndexAlternative from "./pages/IndexAlternative";
import Evaluation from "./pages/Evaluation";
import NotFound from "./pages/NotFound";
import TimeBasedRouter from "./components/TimeBasedRouter";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element={
              <TimeBasedRouter 
                startHour={9} 
                endHour={18}
                alternativeContent={<IndexAlternative />}
              >
                <Index />
              </TimeBasedRouter>
            } 
          />
          <Route path="/evaluation" element={<Evaluation />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;