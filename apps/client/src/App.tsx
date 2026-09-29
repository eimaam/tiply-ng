import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import { ToastProvider } from './components/ui/Toast';

// Public & Marketing Pages
import LandingPage from './features/landing/pages/LandingPage';
import FaqPage from './features/landing/pages/FaqPage';
import PublicTipPage from './features/tip/pages/PublicTipPage';

// Auth Pages
import LoginPage from './features/auth/pages/LoginPage';
import SignupPage from './features/auth/pages/SignupPage';
import ForgotPasswordPage from './features/auth/pages/ForgotPasswordPage';
import OnboardingPage from './features/auth/pages/OnboardingPage';

// Creator Dashboard
import { DashboardLayout } from './components/layout/DashboardLayout';
import OverviewPage from './features/dashboard/pages/OverviewPage';
import TipsPage from './features/dashboard/pages/TipsPage';
import PayoutsPage from './features/dashboard/pages/PayoutsPage';
import AnalyticsPage from './features/dashboard/pages/AnalyticsPage';
import SettingsPage from './features/dashboard/pages/SettingsPage';
import SharePage from './features/dashboard/pages/SharePage';

// Admin Console
import AdminPage from './features/admin/pages/AdminPage';
import { ScrollToTop } from './components/ui/ScrollToTop';

export default function App() {
  return (
    <AppProvider>
      <ToastProvider>
        <ScrollToTop />
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Auth & Onboarding */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />

          {/* Creator Dashboard */}
          <Route path="/app" element={<DashboardLayout />}>
            <Route index element={<Navigate to="/app/overview" replace />} />
            <Route path="overview" element={<OverviewPage />} />
            <Route path="tips" element={<TipsPage />} />
            <Route path="payouts" element={<PayoutsPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="share" element={<SharePage />} />
          </Route>

          {/* Internal Admin Console */}
          <Route path="/admin" element={<AdminPage />} />

          {/* Help & FAQ */}
          <Route path="/faq" element={<FaqPage />} />

          {/* Public Tip Page (e.g. tiply.ng/iman) */}
          <Route path="/:username" element={<PublicTipPage />} />

          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ToastProvider>
    </AppProvider>
  );
}
