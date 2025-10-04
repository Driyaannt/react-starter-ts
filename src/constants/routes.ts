// Route constants for type safety and consistency
export const ROUTES = {
  // Auth routes
  LOGIN: '/login',
  
  // Main app routes
  ROOT: '/',
  DASHBOARD: '/dashboard',
  
  // User management
  USERS: '/users',
  USERS_PAGE: '/users-page',
  
  // Business
  PRODUCTS: '/products',
  ORDERS: '/orders',
  ANALYTICS: '/analytics',
  TRANSACTIONS: '/transactions',
  
  // Settings
  SETTINGS: '/settings',
  PROFILE_SETTINGS: '/profile-settings',
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
    label: 'Dashboard',
    icon: 'dashboard',
    requiresAuth: true,
    showInNav: true,
  },
  [ROUTES.USERS]: {
    path: ROUTES.USERS,
    label: 'Users',
    icon: 'users',
    requiresAuth: true,
    showInNav: true,
  },
  [ROUTES.USERS_PAGE]: {
    path: ROUTES.USERS_PAGE,
    label: 'Users Page',
    icon: 'users',
    requiresAuth: true,
    showInNav: true,
  },
  [ROUTES.PRODUCTS]: {
    path: ROUTES.PRODUCTS,
    label: 'Products',
    icon: 'products',
    requiresAuth: true,
    showInNav: true,
  },
  [ROUTES.ORDERS]: {
    path: ROUTES.ORDERS,
    label: 'Orders',
    icon: 'orders',
    requiresAuth: true,
    showInNav: true,
  },
  [ROUTES.ANALYTICS]: {
    path: ROUTES.ANALYTICS,
    label: 'Analytics',
    icon: 'analytics',
    requiresAuth: true,
    showInNav: true,
  },
  [ROUTES.TRANSACTIONS]: {
    path: ROUTES.TRANSACTIONS,
    label: 'Transactions',
    icon: 'transactions',
    requiresAuth: true,
    showInNav: true,
  },
  [ROUTES.SETTINGS]: {
    path: ROUTES.SETTINGS,
    label: 'Settings',
    icon: 'settings',
    requiresAuth: true,
    showInNav: true,
  },
  [ROUTES.PROFILE_SETTINGS]: {
    path: ROUTES.PROFILE_SETTINGS,
    label: 'Profile Settings',
    icon: 'profile',
    requiresAuth: true,
    showInNav: true,
  },
};

// Helper function to get route path from page ID (for backward compatibility)
export const getRouteFromPageId = (pageId: string): string => {
  const routeMap: Record<string, string> = {
    'dashboard': ROUTES.DASHBOARD,
    'users': ROUTES.USERS,
    'users-page': ROUTES.USERS_PAGE,
    'products': ROUTES.PRODUCTS,
    'orders': ROUTES.ORDERS,
    'analytics': ROUTES.ANALYTICS,
    'settings': ROUTES.SETTINGS,
    'profile-settings': ROUTES.PROFILE_SETTINGS,
    'transactions': ROUTES.TRANSACTIONS,
  };
  
  return routeMap[pageId] || ROUTES.DASHBOARD;
};

// Helper function to get page ID from route path (for backward compatibility)
export const getPageIdFromRoute = (path: string): string => {
  const pageMap: Record<string, string> = {
    [ROUTES.DASHBOARD]: 'dashboard',
    [ROUTES.USERS]: 'users',
    [ROUTES.USERS_PAGE]: 'users-page',
    [ROUTES.PRODUCTS]: 'products',
    [ROUTES.ORDERS]: 'orders',
    [ROUTES.ANALYTICS]: 'analytics',
    [ROUTES.SETTINGS]: 'settings',
    [ROUTES.PROFILE_SETTINGS]: 'profile-settings',
    [ROUTES.TRANSACTIONS]: 'transactions',
  };
  
  return pageMap[path] || 'dashboard';
};