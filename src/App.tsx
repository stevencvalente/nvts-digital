import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import LocaleLayout from "./components/LocaleLayout";
import Index from "./pages/Index";
import Unsubscribe from "./pages/Unsubscribe";
import NotFound from "./pages/NotFound";

const SUPPORTED_LOCALES = ["en", "pt", "fr"] as const;

const detectLocale = (): string => {
  const langs = navigator.languages ?? [navigator.language];
  for (const lang of langs) {
    const code = lang.toLowerCase().split("-")[0];
    if ((SUPPORTED_LOCALES as readonly string[]).includes(code)) return code;
  }
  return "en";
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={`/${detectLocale()}`} replace />} />
          
          {/* Locale-prefixed routes */}
          <Route path="/:lang" element={<LocaleLayout />}>
            <Route index element={<Index />} />
            <Route path="unsubscribe" element={<Unsubscribe />} />
          </Route>

          {/* Legacy /unsubscribe redirect */}
          <Route path="/unsubscribe" element={<Navigate to="/en/unsubscribe" replace />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
