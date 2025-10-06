import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user";
}

interface UserAuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const UserAuthContext = createContext<UserAuthContextType | undefined>(
  undefined
);

export const useUserAuth = (): UserAuthContextType => {
  const context = useContext(UserAuthContext);
  if (context === undefined) {
    throw new Error("useUserAuth must be used within a UserAuthProvider");
  }
  return context;
};

interface UserAuthProviderProps {
  children: React.ReactNode;
}

export const UserAuthProvider: React.FC<UserAuthProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored authentication on mount
    const checkAuth = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        } catch (error) {
          console.error("Error parsing stored user:", error);
          localStorage.removeItem("user");
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Demo credentials - in real app, this would be an API call
    const demoCredentials = [
      {
        email: "admin@clinic.com",
        password: "admin123",
        role: "admin" as const,
      },
      { email: "user@example.com", password: "user123", role: "user" as const },
    ];

    const credential = demoCredentials.find(
      (cred) => cred.email === email && cred.password === password
    );

    if (credential) {
      const userData: User = {
        id: credential.role === "admin" ? "admin-1" : "user-1",
        email: credential.email,
        name: credential.role === "admin" ? "Admin User" : "John Doe",
        role: credential.role,
      };

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      setLoading(false);
      return true;
    }

    setLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const value: UserAuthContextType = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    loading,
    login,
    logout,
  };

  return (
    <UserAuthContext.Provider value={value}>
      {children}
    </UserAuthContext.Provider>
  );
};
