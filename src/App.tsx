import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import { ProfileProvider } from "./context/ProfileContext";
import Login from "./pages/Login";
import Layout from "./components/layout/Layout";
import AppRoutes from "./routes/AppRoutes";
import AlertNotification from "./components/common/AlertNotification";
import { ROUTES } from "./constants/routes";
import "./App.css";

const AppContent: React.FC = () => {
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
      {/* Public route - Login */}
      <Route
        path={ROUTES.LOGIN}
        element={
          !isAuthenticated ? (
            <>
              <Login />
              <AlertNotification />
            </>
          ) : (
            <Navigate to={ROUTES.DASHBOARD} replace />
          )
        }
      />

      {/* Protected routes - wrapped in Layout */}
      <Route
        path="/*"
        element={
          isAuthenticated ? (
            <>
              <Layout>
                <AppRoutes />
              </Layout>
              <AlertNotification />
            </>
          ) : (
            <Navigate to={ROUTES.LOGIN} replace />
          )
        }
      />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <LanguageProvider>
        <ThemeProvider>
          <AuthProvider>
            <ProfileProvider>
              <AppContent />
            </ProfileProvider>
          </AuthProvider>
        </ThemeProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App;
