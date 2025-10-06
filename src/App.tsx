import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ProfileProvider } from "./context/ProfileContext";
import { BookingProvider } from "./context/BookingContext";

// User-facing components
import { UserLandingPage, BookingPage } from "./pages/user";

// Admin components
import { Login } from "./pages/admin";
import Layout from "./components/layout/Layout";
import AppRoutes from "./routes/AppRoutes";
import AlertNotification from "./components/common/AlertNotification";

import "./App.css";

import "./App.css";

// User App Component
const UserApp: React.FC = () => {
  const [showBooking, setShowBooking] = useState(false);

  const handleBookingClick = () => {
    setShowBooking(true);
  };

  const handleBackToLanding = () => {
    setShowBooking(false);
  };

  if (showBooking) {
    return (
      <BookingProvider>
        <BookingPage onBack={handleBackToLanding} />
      </BookingProvider>
    );
  }

  return <UserLandingPage onBookingClick={handleBookingClick} />;
};

// Admin App Component
const AdminAppContent: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-500 ease-out">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 dark:border-blue-400 mx-auto transition-colors duration-300"></div>
          <p className="mt-4 text-lg font-medium text-gray-600 dark:text-gray-400 transition-colors duration-300">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public route - Login (relative path since we're inside /admin/*) */}
      <Route
        path="login"
        element={
          !isAuthenticated ? (
            <>
              <Login />
              <AlertNotification />
            </>
          ) : (
            <Navigate to="/admin/dashboard" replace />
          )
        }
      />

      {/* Protected routes - wrapped in Layout */}
      <Route
        path="*"
        element={
          isAuthenticated ? (
            <>
              <Layout>
                <AppRoutes />
              </Layout>
              <AlertNotification />
            </>
          ) : (
            <Navigate to="/admin/login" replace />
          )
        }
      />
    </Routes>
  );
};

const AdminApp: React.FC = () => {
  return (
    <AuthProvider>
      <ProfileProvider>
        <AdminAppContent />
      </ProfileProvider>
    </AuthProvider>
  );
};

// Main App Component
const AppContent: React.FC = () => {
  return (
    <Routes>
      {/* User-facing routes */}
      <Route path="/" element={<UserApp />} />
      <Route
        path="/booking"
        element={
          <BookingProvider>
            <BookingPage onBack={() => (window.location.href = "/")} />
          </BookingProvider>
        }
      />

      {/* Admin routes */}
      <Route path="/admin/*" element={<AdminApp />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <LanguageProvider>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App;
