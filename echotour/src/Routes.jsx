import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import MoodBasedMusicExperience from './pages/mood-based-music-experience';
import CulturalStorytelling from './pages/cultural-storytelling';
import LandingPage from './pages/landing-page';
import AuthenticationModal from './pages/authentication-modal';
import SmartTravelPlanner from './pages/smart-travel-planner';
import VoiceMemoriesStudio from './pages/voice-memories-studio';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AuthenticationModal />} />
        <Route path="/mood-based-music-experience" element={<MoodBasedMusicExperience />} />
        <Route path="/cultural-storytelling" element={<CulturalStorytelling />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/authentication-modal" element={<AuthenticationModal />} />
        <Route path="/smart-travel-planner" element={<SmartTravelPlanner />} />
        <Route path="/voice-memories-studio" element={<VoiceMemoriesStudio />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
