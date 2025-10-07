// Import auto-generated paths to ensure consistency
import { GENERATED_PATHS } from "@/routes/generated-routes";

// Route constants for type safety and consistency
// Now using auto-generated paths from generated-routes.tsx
export const ROUTES = {
  // Auth routes
  LOGIN: GENERATED_PATHS.LOGIN,

  // Main app routes
  ROOT: "/admin",
  DASHBOARD: GENERATED_PATHS.DASHBOARD,

  // User management
  USERS: GENERATED_PATHS.USER_MANAGEMENT, // Points to UserManagement component
  USERS_PAGE: GENERATED_PATHS.USERS_PAGE, // Points to UsersPage component

  // Business
  PRODUCTS: GENERATED_PATHS.PRODUCTS_PAGE,
  ORDERS: GENERATED_PATHS.ORDERS_PAGE,
  ANALYTICS: GENERATED_PATHS.ANALYTICS_PAGE,
  TRANSACTIONS: GENERATED_PATHS.TRANSACTIONS_PAGE,

  // Settings
  SETTINGS: GENERATED_PATHS.SETTINGS_PAGE,
  PROFILE_SETTINGS: GENERATED_PATHS.PROFILE_SETTINGS,

  // Additional auto-generated routes
  CUSTOMERS: GENERATED_PATHS.CUSTOMERS,
  INVENTORY: GENERATED_PATHS.INVENTORY,
  REPORTS: GENERATED_PATHS.REPORTS_PAGE,
} as const;

// Route metadata for navigation
export interface RouteMetadata {
  path: string;
  label: string;
  icon?: string;
  requiresAuth: boolean;
  showInNav: boolean;
}

export const ROUTE_METADATA: Record<string, RouteMetadata> = {
  [ROUTES.DASHBOARD]: {
    path: ROUTES.DASHBOARD,
    label: "Dashboard",
    icon: "dashboard",
    requiresAuth: true,
    showInNav: true,
  },
  [ROUTES.USERS]: {
    path: ROUTES.USERS,
    label: "Users",
    icon: "users",
    requiresAuth: true,
    showInNav: true,
  },
  [ROUTES.USERS_PAGE]: {
    path: ROUTES.USERS_PAGE,
    label: "Users Page",
    icon: "users",
    requiresAuth: true,
    showInNav: true,
  },
  [ROUTES.PRODUCTS]: {
    path: ROUTES.PRODUCTS,
    label: "Products",
    icon: "products",
    requiresAuth: true,
    showInNav: true,
  },
  [ROUTES.ORDERS]: {
    path: ROUTES.ORDERS,
    label: "Orders",
    icon: "orders",
    requiresAuth: true,
    showInNav: true,
  },
  [ROUTES.ANALYTICS]: {
    path: ROUTES.ANALYTICS,
    label: "Analytics",
    icon: "analytics",
    requiresAuth: true,
    showInNav: true,
  },
  [ROUTES.TRANSACTIONS]: {
    path: ROUTES.TRANSACTIONS,
    label: "Transactions",
    icon: "transactions",
    requiresAuth: true,
    showInNav: true,
  },
  [ROUTES.SETTINGS]: {
    path: ROUTES.SETTINGS,
    label: "Settings",
    icon: "settings",
    requiresAuth: true,
    showInNav: true,
  },
  [ROUTES.PROFILE_SETTINGS]: {
    path: ROUTES.PROFILE_SETTINGS,
    label: "Profile Settings",
    icon: "profile",
    requiresAuth: true,
    showInNav: true,
  },
};

// Helper function to get route path from page ID (for backward compatibility)
export const getRouteFromPageId = (pageId: string): string => {
  const routeMap: Record<string, string> = {
    dashboard: ROUTES.DASHBOARD,
    users: ROUTES.USERS, // Points to /admin/user-management
    "users-page": ROUTES.USERS_PAGE, // Points to /admin/users
    "user-management": ROUTES.USERS, // Alias for user-management
    products: ROUTES.PRODUCTS,
    orders: ROUTES.ORDERS,
    analytics: ROUTES.ANALYTICS,
    settings: ROUTES.SETTINGS,
    "profile-settings": ROUTES.PROFILE_SETTINGS,
    transactions: ROUTES.TRANSACTIONS,
  };

  return routeMap[pageId] || ROUTES.DASHBOARD;
};

// Helper function to get page ID from route path (for backward compatibility)
export const getPageIdFromRoute = (path: string): string => {
  const pageMap: Record<string, string> = {
    [ROUTES.DASHBOARD]: "dashboard",
    [ROUTES.USERS]: "users", // /admin/user-management → users
    [ROUTES.USERS_PAGE]: "users-page", // /admin/users → users-page
    [ROUTES.PRODUCTS]: "products",
    [ROUTES.ORDERS]: "orders",
    [ROUTES.ANALYTICS]: "analytics",
    [ROUTES.SETTINGS]: "settings",
    [ROUTES.PROFILE_SETTINGS]: "profile-settings",
    [ROUTES.TRANSACTIONS]: "transactions",
  };

  return pageMap[path] || "dashboard";
};
