import React, { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Layout from "./components/layout/Layout";
import SimpleRouter from "./utils/SimpleRouter";
import AlertNotification from "./components/common/AlertNotification";
import "./App.css";

type PageType = 'dashboard' | 'users' | 'users-page' | 'products' | 'orders' | 'analytics' | 'settings' | 'profile-settings';

const AppContent: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();
  const [activePage, setActivePage] = useState<PageType>('dashboard');

  const handlePageChange = (pageId: string) => {
    setActivePage(pageId as PageType);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg font-medium text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <Login />
        <AlertNotification />
      </>
    );
  }

  return (
    <>
      <Layout activePage={activePage} onPageChange={handlePageChange}>
        <SimpleRouter activePage={activePage} />
      </Layout>
      <AlertNotification />
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
