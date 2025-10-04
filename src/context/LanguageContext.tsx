import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

// Supported languages
export type Language = "en" | "id" | "es" | "fr" | "ja" | "zh";

// Translation interface
export interface Translations {
  // Common
  common: {
    loading: string;
    save: string;
    cancel: string;
    edit: string;
    delete: string;
    confirm: string;
    yes: string;
    no: string;
    search: string;
    filter: string;
    export: string;
    import: string;
    settings: string;
    profile: string;
    logout: string;
    login: string;
    email: string;
    password: string;
    username: string;
    name: string;
    phone: string;
    address: string;
    status: string;
    actions: string;
    welcome: string;
    administrator: string;
    accountSettings: string;
    notifications: string;
    helpSupport: string;
  };

  // Navigation
  nav: {
    dashboard: string;
    users: string;
    userManagement: string;
    usersPage: string;
    products: string;
    orders: string;
    analytics: string;
    settings: string;
    profileSettings: string;
    transactions: string;
  };

  // Login
  login: {
    title: string;
    subtitle: string;
    username: string;
    password: string;
    usernamePlaceholder: string;
    passwordPlaceholder: string;
    loginButton: string;
    loggingIn: string;
    demoCredentials: string;
    emptyFields: string;
    fillAllFields: string;
    forgotPassword: string;
    createAccount: string;
    orContinueWith: string;
    googleLogin: string;
    githubLogin: string;
    welcomeBack: string;
    loginSuccess: string;
    loginError: string;
    invalidCredentials: string;
  };

  // Dashboard
  dashboard: {
    title: string;
    subtitle: string;
    totalUsers: string;
    totalProducts: string;
    totalOrders: string;
    revenue: string;
    recentActivities: string;
    recentActivitiesDesc: string;
    quickActions: string;
    quickActionsDesc: string;
    addUser: string;
    addUserDesc: string;
    addProduct: string;
    addProductDesc: string;
    viewReports: string;
    viewReportsDesc: string;
    vsLastMonth: string;
    newUserRegistered: string;
    productAddedToInventory: string;
    orderCompleted: string;
    paymentReceived: string;
    userProfileUpdated: string;
    minutesAgo: string;
    hourAgo: string;
    hoursAgo: string;
  };

  // Profile Settings
  profile: {
    title: string;
    subtitle: string;
    personalInfo: string;
    personalInfoDesc: string;
    fullName: string;
    emailAddress: string;
    phoneNumber: string;
    passwordSettings: string;
    passwordSettingsDesc: string;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
    changePassword: string;
    preferences: string;
    preferencesDesc: string;
    notifications: string;
    emailNotifications: string;
    emailNotificationsDesc: string;
    pushNotifications: string;
    pushNotificationsDesc: string;
    marketingEmails: string;
    marketingEmailsDesc: string;
    appearance: string;
    theme: string;
    themeDesc: string;
    language: string;
    languageDesc: string;
    profileUpdated: string;
    profileUpdatedDesc: string;
    passwordChanged: string;
    passwordChangedDesc: string;
    passwordMismatch: string;
    passwordTooShort: string;
    editProfile: string;
    saveChanges: string;
    joinedDate: string;
  };

  // User Management
  userManagement: {
    title: string;
    subtitle: string;
    addNewUser: string;
    totalUsers: string;
    activeUsers: string;
    pendingInvitations: string;
    name: string;
    email: string;
    role: string;
    status: string;
    lastLogin: string;
    actions: string;
    active: string;
    inactive: string;
    admin: string;
    user: string;
    edit: string;
    delete: string;
  };

  // Users Management
  users: {
    title: string;
    subtitle: string;
    addUser: string;
    totalUsers: string;
    activeUsers: string;
    searchUsers: string;
    filterBy: string;
    allRoles: string;
    admin: string;
    user: string;
    moderator: string;
    active: string;
    inactive: string;
    role: string;
    lastActive: string;
    userAdded: string;
    userDeleted: string;
    userUpdated: string;
    deleteConfirm: string;
    deleteUserTitle: string;
    deleteUserDesc: string;
    editUser: string;
    viewProfile: string;
  };

  // Transactions
  transactions: {
    title: string;
    subtitle: string;
    addTransaction: string;
    totalTransactions: string;
    totalAmount: string;
    pendingTransactions: string;
    completedTransactions: string;
    searchTransactions: string;
    filterByStatus: string;
    filterByType: string;
    filterByDate: string;
    allStatuses: string;
    allTypes: string;
    pending: string;
    completed: string;
    failed: string;
    income: string;
    expense: string;
    transfer: string;
    transactionId: string;
    description: string;
    amount: string;
    type: string;
    date: string;
    customer: string;
    method: string;
    viewDetails: string;
    editTransaction: string;
    deleteTransaction: string;
    exportTransactions: string;
    importTransactions: string;
    dateRange: string;
    from: string;
    to: string;
    apply: string;
    reset: string;
    noTransactions: string;
    loadingTransactions: string;
    transactionAdded: string;
    transactionUpdated: string;
    transactionDeleted: string;
    tableTitle: string;
    noResults: string;
    paymentMethod: {
      cash: string;
      creditCard: string;
      debitCard: string;
      bankTransfer: string;
      paypal: string;
      crypto: string;
    };
    paymentMethods: {
      cash: string;
      creditCard: string;
      debitCard: string;
      bankTransfer: string;
      paypal: string;
      crypto: string;
    };
    types: {
      income: string;
      expense: string;
      transfer: string;
    };
    statuses: {
      pending: string;
      completed: string;
      failed: string;
    };
    actions: {
      title: string;
      view: string;
      edit: string;
      delete: string;
      copyId: string;
      import: string;
      export: string;
      add: string;
    };
    stats: {
      totalTransactions: string;
      totalIncome: string;
      totalExpenses: string;
      pendingAmount: string;
      allTimeTotal: string;
      completedOnly: string;
      awaitingProcessing: string;
    };
    filters: {
      searchPlaceholder: string;
      clearAll: string;
      columns: string;
    };
  };

  // Theme
  theme: {
    light: string;
    dark: string;
    auto: string;
    toggleTheme: string;
  };

  // Languages
  languages: {
    english: string;
    indonesian: string;
    spanish: string;
    french: string;
    japanese: string;
    chinese: string;
  };

  // Footer
  footer: {
    product: string;
    support: string;
    company: string;
    dashboard: string;
    users: string;
    products: string;
    orders: string;
    helpCenter: string;
    contactUs: string;
    privacyPolicy: string;
    termsOfService: string;
    aboutUs: string;
    about: string;
    careers: string;
    blog: string;
    press: string;
    partners: string;
    allRightsReserved: string;
    madeWith: string;
    builtWith: string;
    and: string;
  };

  // Alerts
  alerts: {
    logoutTitle: string;
    logoutMessage: string;
    logoutSuccess: string;
    logoutConfirm: string;
    error: string;
    success: string;
    warning: string;
    info: string;
  };
}

// Language context interface
interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  t: Translations;
  isLoading: boolean;
}

// Language context
const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

// Available languages with metadata
export const availableLanguages: Array<{
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
}> = [
  { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
  {
    code: "id",
    name: "Indonesian",
    nativeName: "Bahasa Indonesia",
    flag: "🇮🇩",
  },
  { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸" },
  { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷" },
  { code: "ja", name: "Japanese", nativeName: "日本語", flag: "🇯🇵" },
  { code: "zh", name: "Chinese", nativeName: "中文", flag: "🇨🇳" },
];

// Default language
const DEFAULT_LANGUAGE: Language = "en";

// Language provider component
interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const [currentLanguage, setCurrentLanguage] =
    useState<Language>(DEFAULT_LANGUAGE);
  const [translations, setTranslations] = useState<Translations | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load translations
  const loadTranslations = async (
    language: Language
  ): Promise<Translations> => {
    try {
      const module = await import(`../translations/${language}.ts`);
      return module.default;
    } catch (error) {
      console.warn(
        `Failed to load translations for ${language}, falling back to English`
      );
      const fallback = await import("../translations/en");
      return fallback.default;
    }
  };

  // Initialize language from localStorage or browser preference
  useEffect(() => {
    const initializeLanguage = async () => {
      setIsLoading(true);

      // Get saved language or detect browser language
      const savedLanguage = localStorage.getItem(
        "preferred-language"
      ) as Language;
      const browserLanguage = navigator.language.split("-")[0] as Language;

      const initialLanguage =
        savedLanguage &&
        availableLanguages.some((lang) => lang.code === savedLanguage)
          ? savedLanguage
          : availableLanguages.some((lang) => lang.code === browserLanguage)
          ? browserLanguage
          : DEFAULT_LANGUAGE;

      setCurrentLanguage(initialLanguage);
      const translations = await loadTranslations(initialLanguage);
      setTranslations(translations);
      setIsLoading(false);
    };

    initializeLanguage();
  }, []);

  // Change language
  const setLanguage = async (language: Language) => {
    if (language === currentLanguage) return;

    setIsLoading(true);
    try {
      const newTranslations = await loadTranslations(language);
      setCurrentLanguage(language);
      setTranslations(newTranslations);
      localStorage.setItem("preferred-language", language);
    } catch (error) {
      console.error("Failed to change language:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const contextValue: LanguageContextType = {
    currentLanguage,
    setLanguage,
    t: translations!,
    isLoading,
  };

  // Don't render children until translations are loaded
  if (isLoading || !translations) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg font-medium text-gray-600 dark:text-gray-400">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook to use language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export default LanguageContext;
