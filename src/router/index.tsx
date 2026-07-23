import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAnalysis } from '../context/AnalysisContext';

import { HomePage } from '../pages/HomePage';
import { SearchPage } from '../pages/SearchPage';
import { DashboardPage } from '../pages/DashboardPage';
import { SignInPage } from '../pages/SignInPage';
import { SignUpPage } from '../pages/SignUpPage';
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage';
import { ProfilePage } from '../pages/ProfilePage';
import { SettingsPage } from '../pages/SettingsPage';
import { NotFound } from '../pages/NotFound';

// ProtectedRoute component: Ensures user has a valid authentication token
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isMockSignedIn } = useAnalysis();
  if (!isMockSignedIn) {
    return <Navigate to="/signin" replace />;
  }
  return <>{children}</>;
};

// PublicOnlyRoute component: Prevents authenticated users from viewing signin/signup
const PublicOnlyRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isMockSignedIn } = useAnalysis();
  if (isMockSignedIn) {
    return <Navigate to="/dashboard" replace />;
  }
  return <>{children}</>;
};

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<HomePage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      {/* Guest Only Auth Pages */}
      <Route
        path="/signin"
        element={
          <PublicOnlyRoute>
            <SignInPage />
          </PublicOnlyRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicOnlyRoute>
            <SignUpPage />
          </PublicOnlyRoute>
        }
      />

      {/* Protected Authenticated Routes */}
      <Route
        path="/search"
        element={
          <ProtectedRoute>
            <SearchPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
