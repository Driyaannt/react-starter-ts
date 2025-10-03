# Advanced Routing dengan React Router

Jika Anda ingin menggunakan routing yang lebih advanced, Anda bisa menginstall React Router:

## Installation

```bash
npm install react-router-dom
npm install -D @types/react-router-dom
```

## Contoh Implementasi

### 1. Setup Router di main.tsx

```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
```

### 2. Update App.tsx dengan Routes

```typescript
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import UserManagement from './components/UserManagement';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} 
      />
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Layout>
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/users" element={<UserManagement />} />
                {/* Add more routes here */}
              </Routes>
            </Layout>
          </ProtectedRoute>
        } 
      />
    </Routes>
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
```

### 3. Update Sidebar dengan Navigation

```typescript
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';

// ... existing code ...

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const getActiveItem = () => {
    const path = location.pathname;
    const activeItem = menuItems.find(item => item.path === path);
    return activeItem?.id || 'dashboard';
  };

  const handleItemClick = (itemId: string) => {
    const menuItem = menuItems.find(item => item.id === itemId);
    if (menuItem) {
      navigate(menuItem.path);
    }
  };

  const activeItem = getActiveItem();

  // ... rest of component
};
```

## Keuntungan React Router

- **URL Support**: Browser URL akan berubah sesuai halaman
- **Back/Forward Button**: Tombol browser berfungsi normal
- **Bookmarkable**: User bisa bookmark halaman tertentu
- **Deep Linking**: Bisa langsung akses halaman tertentu via URL
- **Nested Routing**: Support routing bertingkat