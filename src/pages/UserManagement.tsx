import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UserPlus, Activity, Edit, Trash2 } from "lucide-react";
import CustomButton from "@/components/ui/CustomButton";
import { useButtonLoading } from "@/hooks/useButtonLoading";
import { useLanguage } from "@/context/LanguageContext";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  lastLogin: string;
}

const UserManagement: React.FC = () => {
  const { t } = useLanguage();
  const addUserLoading = useButtonLoading();

  const users: User[] = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      status: "active",
      lastLogin: "2024-01-15",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "User",
      status: "active",
      lastLogin: "2024-01-14",
    },
    {
      id: "3",
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "User",
      status: "inactive",
      lastLogin: "2024-01-10",
    },
    {
      id: "4",
      name: "Alice Brown",
      email: "alice@example.com",
      role: "Moderator",
      status: "active",
      lastLogin: "2024-01-13",
    },
    {
      id: "5",
      name: "Charlie Wilson",
      email: "charlie@example.com",
      role: "User",
      status: "active",
      lastLogin: "2024-01-12",
    },
  ];

  const handleAddUser = () => {
    addUserLoading.startLoading();
    setTimeout(() => {
      addUserLoading.stopLoading();
      alert("Add User functionality to be implemented");
    }, 2000);
  };

  const handleEditUser = (userId: string) => {
    alert(`Edit user ${userId} functionality to be implemented`);
  };

  const handleDeleteUser = (userId: string) => {
    alert(`Delete user ${userId} functionality to be implemented`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
            {t.userManagement.title}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2 transition-colors duration-300">
            {t.userManagement.subtitle}
          </p>
        </div>
        <CustomButton
          variant="primary"
          icon={UserPlus}
          loading={addUserLoading.loading}
          onClick={handleAddUser}
        >
          {t.userManagement.addNewUser}
        </CustomButton>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-blue-700 dark:text-blue-300 group-hover:text-blue-800 dark:group-hover:text-blue-200 transition-colors">
                  {t.userManagement.totalUsers}
                </p>
                <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">
                  {users.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-200 dark:bg-blue-800/50 rounded-full flex items-center justify-center group-hover:bg-blue-300 dark:group-hover:bg-blue-700/50 transition-colors group-hover:scale-110 duration-300">
                <UserPlus className="w-6 h-6 text-blue-600 dark:text-blue-300" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-green-700 dark:text-green-300 group-hover:text-green-800 dark:group-hover:text-green-200 transition-colors">
                  {t.userManagement.activeUsers}
                </p>
                <p className="text-3xl font-bold text-green-900 dark:text-green-100">
                  {users.filter((u) => u.status === "active").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-200 dark:bg-green-800/50 rounded-full flex items-center justify-center group-hover:bg-green-300 dark:group-hover:bg-green-700/50 transition-colors group-hover:scale-110 duration-300">
                <Activity className="w-6 h-6 text-green-600 dark:text-green-300" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-red-200 dark:border-red-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-red-700 dark:text-red-300 group-hover:text-red-800 dark:group-hover:text-red-200 transition-colors">
                  {t.userManagement.admin}s
                </p>
                <p className="text-3xl font-bold text-red-900 dark:text-red-100">
                  {users.filter((u) => u.role === "Admin").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-200 dark:bg-red-800/50 rounded-full flex items-center justify-center group-hover:bg-red-300 dark:group-hover:bg-red-700/50 transition-colors group-hover:scale-110 duration-300">
                <div className="w-3 h-3 bg-red-600 dark:bg-red-300 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-purple-700 dark:text-purple-300 group-hover:text-purple-800 dark:group-hover:text-purple-200 transition-colors">
                  {t.userManagement.pendingInvitations}
                </p>
                <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">
                  +12
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-200 dark:bg-purple-800/50 rounded-full flex items-center justify-center group-hover:bg-purple-300 dark:group-hover:bg-purple-700/50 transition-colors group-hover:scale-110 duration-300">
                <div className="w-2 h-2 bg-purple-600 dark:bg-purple-300 rounded-full animate-pulse"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced User Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <Card
            key={user.id}
            className="bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-800 dark:via-gray-800/50 dark:to-gray-900 border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 group overflow-hidden relative"
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 dark:from-blue-400/10 dark:via-purple-400/10 dark:to-pink-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <CardHeader className="pb-4 relative z-10">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16 ring-4 ring-white dark:ring-gray-700 shadow-xl group-hover:ring-blue-200 dark:group-hover:ring-blue-700 transition-all duration-300 group-hover:scale-110">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white font-bold text-xl">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-100 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                      {user.name}
                    </CardTitle>
                    <CardDescription className="flex items-center mt-2 text-gray-600 dark:text-gray-300">
                      {user.email}
                    </CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0 relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <Badge
                  variant={
                    user.role === "Admin"
                      ? "destructive"
                      : user.role === "Moderator"
                      ? "default"
                      : "secondary"
                  }
                  className="font-medium px-3 py-1"
                >
                  {user.role}
                </Badge>
                <Badge
                  className={`font-medium px-3 py-1 ${
                    user.status === "active"
                      ? "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800/50"
                      : "bg-gray-100 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700/50"
                  }`}
                >
                  {user.status}
                </Badge>
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Last login:{" "}
                  <span className="text-gray-700 dark:text-gray-200 font-medium">
                    {user.lastLogin}
                  </span>
                </p>
                <div className="flex gap-2">
                  <CustomButton
                    variant="outline-primary"
                    size="sm"
                    icon={Edit}
                    className="flex-1"
                    onClick={() => handleEditUser(user.id)}
                  >
                    {t.userManagement.edit}
                  </CustomButton>
                  <CustomButton
                    variant="danger"
                    size="sm"
                    icon={Trash2}
                    className="flex-1"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    {t.userManagement.delete}
                  </CustomButton>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserManagement;
