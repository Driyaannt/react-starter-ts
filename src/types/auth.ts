export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
}

export interface AlertType {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  loading: boolean;
  alert: AlertType | null;
  showAlert: (type: AlertType["type"], title: string, message: string) => void;
  clearAlert: () => void;
}
