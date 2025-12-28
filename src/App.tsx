import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { FitAdaptProvider, useFitAdapt } from "./context/FitAdaptContext";
import { Onboarding } from "./pages/Onboarding";
import { Dashboard } from "./pages/Dashboard";
import { GenerateWorkout } from "./pages/GenerateWorkout";
import { WorkoutSession } from "./pages/WorkoutSession";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppRoutes() {
  const { state } = useFitAdapt();

  if (!state.isOnboarded) {
    return (
      <Routes>
        <Route path="*" element={<Onboarding />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/generate" element={<GenerateWorkout />} />
      <Route path="/workout-session" element={<WorkoutSession />} />
      <Route path="/library" element={<Dashboard />} />
      <Route path="/schedule" element={<Dashboard />} />
      <Route path="/progress" element={<Dashboard />} />
      <Route path="/settings" element={<Dashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <FitAdaptProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </FitAdaptProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
