import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Auto-generated routes
import { adminRoutes } from "./generated-routes";

// Common Pages
import { NotFoundPage } from "@/pages";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Root redirect - since we're already inside /admin/* */}
      <Route path="/" element={<Navigate to="dashboard" replace />} />

      {/* Auto-generated admin routes */}
      {adminRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}

      {/* 404 Not Found */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
