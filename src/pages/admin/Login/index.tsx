import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, showAlert } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      showAlert("error", "Empty Fields", "Please fill in all fields");
      return;
    }

    await login(username, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 transition-all duration-500 ease-out">
      <div className="w-full max-w-md shadow-2xl border-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm hover:shadow-3xl transition-all duration-500 ease-out hover:scale-[1.02] rounded-xl">
        <div className="space-y-3 text-center relative p-6">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700/20 dark:to-purple-900/20 rounded-t-xl opacity-50 transition-colors duration-500 ease-out"></div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent relative z-10 transition-all duration-400 ease-out">
            Admin Login
          </h1>
          <p className="text-gray-600 dark:text-gray-300 relative z-10 text-lg transition-colors duration-400 ease-out">
            Welcome back! Please sign in to continue.
          </p>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-3">
              <label
                htmlFor="username"
                className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-400 ease-out block"
              >
                Username
              </label>
              <div className="relative">
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setUsername(e.target.value)
                  }
                  placeholder="Enter your username"
                  disabled={loading}
                  className="w-full h-12 px-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/20 transition-all duration-400 ease-out bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-900 dark:text-gray-100 font-medium"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <div className="w-2 h-2 bg-blue-500 rounded-full opacity-0 transition-opacity duration-300 group-focus-within:opacity-100"></div>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-400 ease-out block"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                  placeholder="Enter your password"
                  disabled={loading}
                  className="w-full h-12 px-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/20 transition-all duration-400 ease-out bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-900 dark:text-gray-100 font-medium"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <div className="w-2 h-2 bg-blue-500 rounded-full opacity-0 transition-opacity duration-300 group-focus-within:opacity-100"></div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-600 dark:hover:to-purple-600 text-white font-semibold rounded-xl transition-all duration-400 ease-out hover:shadow-lg hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Logging in...
                </div>
              ) : (
                "Login"
              )}
            </button>
          </form>
          <div className="mt-6 p-4 bg-blue-50 dark:bg-gray-700/50 rounded-md border border-blue-200 dark:border-gray-600 transition-all duration-400 ease-out">
            <p className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2 transition-colors duration-400 ease-out">
              Demo Credentials
            </p>
            <p className="text-sm text-blue-700 dark:text-blue-400 transition-colors duration-400 ease-out">
              Username: admin
            </p>
            <p className="text-sm text-blue-700 dark:text-blue-400 transition-colors duration-400 ease-out">
              Password: admin123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
