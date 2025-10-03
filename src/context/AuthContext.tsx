import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { User, AuthContextType, AlertType } from "../types/auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState<AlertType | null>(null);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    setLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock authentication - replace with real API call
    if (username === "admin" && password === "password") {
      const userData: User = {
        id: "1",
        username: "admin",
        email: "admin@example.com",
        name: "Administrator",
      };

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      showAlert("success", "Login Berhasil", "Selamat datang kembali!");
      setLoading(false);
      return true;
    }

    showAlert("error", "Login Gagal", "Username atau password salah!");
    setLoading(false);
    return false;
  };

  const logout = async (): Promise<void> => {
    // Simulate logout API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setUser(null);
    localStorage.removeItem("user");
    showAlert(
      "success",
      "Logout Berhasil",
      "Anda telah berhasil keluar dari sistem."
    );
  };

  const showAlert = (
    type: AlertType["type"],
    title: string,
    message: string
  ) => {
    const alertId = Date.now().toString();
    setAlert({ id: alertId, type, title, message });

    // Auto clear alert after 5 seconds
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };

  const clearAlert = () => {
    setAlert(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    loading,
    alert,
    showAlert,
    clearAlert,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
