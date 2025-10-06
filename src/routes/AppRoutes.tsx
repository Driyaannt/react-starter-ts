import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Admin Pages
import {
  Dashboard,
  UserManagement,
  UsersPage,
  ProfileSettings,
  TransactionsPage,
  ProductsPage,
  OrdersPage,
  AnalyticsPage,
  SettingsPage,
} from "@/pages/admin";

// Common Pages
import { NotFoundPage } from "@/pages";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Root redirect - since we're already inside /admin/* */}
      <Route path="/" element={<Navigate to="dashboard" replace />} />

      {/* Main application routes - relative paths since we're inside /admin/* */}
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="users" element={<UserManagement />} />
      <Route path="users-page" element={<UsersPage />} />
      <Route path="products" element={<ProductsPage />} />
      <Route path="orders" element={<OrdersPage />} />
      <Route path="analytics" element={<AnalyticsPage />} />
      <Route path="transactions" element={<TransactionsPage />} />
      <Route path="settings" element={<SettingsPage />} />
      <Route path="profile-settings" element={<ProfileSettings />} />

      {/* 404 Not Found */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
