import React from 'react';
import type { ReactNode } from 'react';
import Dashboard from '../pages/Dashboard';
import UserManagement from '../pages/UserManagement';
import UsersPage from '../pages/UsersPage';
import ProfileSettings from '../pages/ProfileSettings';

type PageType = 'dashboard' | 'users' | 'users-page' | 'products' | 'orders' | 'analytics' | 'settings' | 'profile-settings';

interface SimpleRouterProps {
  activePage: PageType;
}

const SimpleRouter: React.FC<SimpleRouterProps> = ({ activePage }) => {
  const renderPage = (): ReactNode => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <UserManagement />;
      case 'users-page':
        return <UsersPage />;
      case 'products':
        return (
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h1>Products Page</h1>
            <p>This is where you would manage your products.</p>
            <p>Add your Products component here!</p>
          </div>
        );
      case 'orders':
        return (
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h1>Orders Page</h1>
            <p>This is where you would manage orders.</p>
            <p>Add your Orders component here!</p>
          </div>
        );
      case 'analytics':
        return (
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h1>Analytics Page</h1>
            <p>This is where you would view analytics and reports.</p>
            <p>Add your Analytics component here!</p>
          </div>
        );
      case 'settings':
        return (
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h1>Settings Page</h1>
            <p>This is where you would manage application settings.</p>
            <p>Add your Settings component here!</p>
          </div>
        );
      case 'profile-settings':
        return <ProfileSettings />;
      default:
        return <Dashboard />;
    }
  };

  return <>{renderPage()}</>;
};

export default SimpleRouter;