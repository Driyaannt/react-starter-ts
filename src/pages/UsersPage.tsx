import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

import CustomButton from "@/components/ui/CustomButton";
import { useButtonLoading } from "@/hooks/useButtonLoading";
import { useLanguage } from "@/context/LanguageContext";
import {
  UserPlus,
  Search,
  Filter,
  MoreHorizontal,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
  Users,
  Activity,
  Clock,
  ChevronDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: "active" | "inactive" | "pending";
  location: string;
  joinDate: string;
  lastLogin: string;
  avatar?: string;
  projects: number;
  department: string;
}

const UsersPage: React.FC = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // Button loading states
  const exportLoading = useButtonLoading();
  const importLoading = useButtonLoading();
  const addUserLoading = useButtonLoading();

  // Example async functions
  const handleExport = async () => {
    await exportLoading.withLoading(async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Export completed");
    });
  };

  const handleImport = async () => {
    await importLoading.withLoading(async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Import completed");
    });
  };

  const handleAddUser = async () => {
    await addUserLoading.withLoading(async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("User added");
    });
  };

  const users: User[] = [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@company.com",
      phone: "+1 (555) 123-4567",
      role: "Admin",
      status: "active",
      location: "New York, USA",
      joinDate: "2023-01-15",
      lastLogin: "2024-10-03",
      projects: 12,
      department: "Engineering",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@company.com",
      phone: "+1 (555) 234-5678",
      role: "Manager",
      status: "active",
      location: "San Francisco, USA",
      joinDate: "2023-03-20",
      lastLogin: "2024-10-02",
      projects: 8,
      department: "Marketing",
    },
    {
      id: "3",
      name: "Bob Johnson",
      email: "bob.johnson@company.com",
      phone: "+1 (555) 345-6789",
      role: "Developer",
      status: "inactive",
      location: "Austin, USA",
      joinDate: "2023-06-10",
      lastLogin: "2024-09-28",
      projects: 15,
      department: "Engineering",
    },
    {
      id: "4",
      name: "Alice Brown",
      email: "alice.brown@company.com",
      phone: "+1 (555) 456-7890",
      role: "Designer",
      status: "active",
      location: "Los Angeles, USA",
      joinDate: "2023-08-05",
      lastLogin: "2024-10-03",
      projects: 6,
      department: "Design",
    },
    {
      id: "5",
      name: "Charlie Wilson",
      email: "charlie.wilson@company.com",
      phone: "+1 (555) 567-8901",
      role: "Analyst",
      status: "pending",
      location: "Chicago, USA",
      joinDate: "2024-09-15",
      lastLogin: "2024-10-01",
      projects: 2,
      department: "Analytics",
    },
    {
      id: "6",
      name: "Diana Prince",
      email: "diana.prince@company.com",
      phone: "+1 (555) 678-9012",
      role: "Manager",
      status: "active",
      location: "Seattle, USA",
      joinDate: "2022-11-30",
      lastLogin: "2024-10-03",
      projects: 20,
      department: "Operations",
    },
  ];

  const getRoleBadgeVariant = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "destructive";
      case "manager":
        return "default";
      case "developer":
        return "secondary";
      case "designer":
        return "outline";
      case "analyst":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700 hover:bg-green-200";
      case "inactive":
        return "bg-gray-100 text-gray-700 hover:bg-gray-200";
      case "pending":
        return "bg-yellow-100 text-yellow-700 hover:bg-yellow-200";
      default:
        return "bg-gray-100 text-gray-700 hover:bg-gray-200";
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole =
      filterRole === "all" || user.role.toLowerCase() === filterRole;
    const matchesStatus =
      filterStatus === "all" || user.status === filterStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const stats = [
    {
      title: t.users.totalUsers,
      value: users.length.toString(),
      icon: Users,
      color: "blue",
      change: "+5%",
    },
    {
      title: t.users.activeUsers,
      value: users.filter((u) => u.status === "active").length.toString(),
      icon: Activity,
      color: "green",
      change: "+12%",
    },
    {
      title: "New This Month",
      value: users
        .filter((u) => new Date(u.joinDate).getMonth() === 8)
        .length.toString(), // September
      icon: UserPlus,
      color: "purple",
      change: "+20%",
    },
    {
      title: "Pending Review",
      value: users.filter((u) => u.status === "pending").length.toString(),
      icon: Clock,
      color: "yellow",
      change: "-2%",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            {t.users.title}
          </h1>
          <p className="text-gray-600 mt-3 text-lg">{t.users.subtitle}</p>
        </div>
        <div className="flex gap-3">
          <CustomButton
            variant="outline"
            icon={Download}
            loading={exportLoading.loading}
            onClick={handleExport}
          >
            {t.common.export}
          </CustomButton>
          <CustomButton
            variant="outline"
            icon={Upload}
            loading={importLoading.loading}
            onClick={handleImport}
          >
            {t.common.import}
          </CustomButton>
          <CustomButton
            variant="primary"
            icon={UserPlus}
            loading={addUserLoading.loading}
            onClick={handleAddUser}
          >
            {t.users.addUser}
          </CustomButton>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          const colorClasses = {
            blue: "from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 bg-blue-200 dark:bg-blue-800/50",
            green:
              "from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 bg-green-200 dark:bg-green-800/50",
            purple:
              "from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 bg-purple-200 dark:bg-purple-800/50",
            yellow:
              "from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-yellow-200 dark:border-yellow-800 text-yellow-700 dark:text-yellow-300 bg-yellow-200 dark:bg-yellow-800/50",
          };

          return (
            <Card
              key={index}
              className={`relative overflow-hidden bg-gradient-to-br ${colorClasses[
                stat.color as keyof typeof colorClasses
              ]
                .split(" ")
                .slice(0, 6)
                .join(
                  " "
                )} shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group`}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p
                      className={`text-sm font-medium ${
                        colorClasses[
                          stat.color as keyof typeof colorClasses
                        ].split(" ")[3] +
                        " " +
                        colorClasses[
                          stat.color as keyof typeof colorClasses
                        ].split(" ")[4]
                      } group-hover:opacity-80 transition-opacity`}
                    >
                      {stat.title}
                    </p>
                    <p
                      className={`text-3xl font-bold ${
                        stat.color === "blue"
                          ? "text-blue-900 dark:text-blue-100"
                          : stat.color === "green"
                          ? "text-green-900 dark:text-green-100"
                          : stat.color === "purple"
                          ? "text-purple-900 dark:text-purple-100"
                          : "text-yellow-900 dark:text-yellow-100"
                      }`}
                    >
                      {stat.value}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {stat.change} from last month
                    </p>
                  </div>
                  <div
                    className={`w-12 h-12 ${
                      colorClasses[
                        stat.color as keyof typeof colorClasses
                      ].split(" ")[5] +
                      " " +
                      colorClasses[
                        stat.color as keyof typeof colorClasses
                      ].split(" ")[6]
                    } rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent
                      className={`w-6 h-6 ${
                        stat.color === "blue"
                          ? "text-blue-600 dark:text-blue-300"
                          : stat.color === "green"
                          ? "text-green-600 dark:text-green-300"
                          : stat.color === "purple"
                          ? "text-purple-600 dark:text-purple-300"
                          : "text-yellow-600 dark:text-yellow-300"
                      }`}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Search and Filters */}
      <Card className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-xl">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-6 items-end">
            <div className="flex-1 space-y-2">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder={t.users.searchUsers}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-12 pl-12 pr-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/20 transition-all duration-300 bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 font-medium"
                />
              </div>
            </div>

            <div className="flex gap-4 items-end">
              {/* Role Filter Dropdown */}
              <div className="space-y-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="min-w-[140px] h-12 justify-between border-2 border-gray-200 dark:border-gray-600 rounded-xl hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-300 font-medium bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-900 dark:text-gray-100"
                    >
                      <div className="flex items-center">
                        <Filter className="w-4 h-4 mr-3 text-gray-400" />
                        <span>
                          {filterRole === "all"
                            ? t.users.allRoles
                            : filterRole.charAt(0).toUpperCase() +
                              filterRole.slice(1)}
                        </span>
                      </div>
                      <ChevronDown className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-[140px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl rounded-lg"
                    align="start"
                  >
                    <DropdownMenuItem
                      className="cursor-pointer text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                      onClick={() => setFilterRole("all")}
                    >
                      {t.users.allRoles}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                      onClick={() => setFilterRole("admin")}
                    >
                      {t.users.admin}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      onClick={() => setFilterRole("manager")}
                    >
                      Manager
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      onClick={() => setFilterRole("developer")}
                    >
                      Developer
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      onClick={() => setFilterRole("designer")}
                    >
                      Designer
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      onClick={() => setFilterRole("analyst")}
                    >
                      Analyst
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Status Filter Dropdown */}
              <div className="space-y-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="min-w-[140px] h-12 justify-between border-2 border-gray-200 dark:border-gray-600 rounded-xl hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-300 font-medium bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-900 dark:text-gray-100"
                    >
                      <div className="flex items-center">
                        <Activity className="w-4 h-4 mr-3 text-gray-400" />
                        <span>
                          {filterStatus === "all"
                            ? "All Status"
                            : filterStatus === "active"
                            ? t.users.active
                            : filterStatus === "inactive"
                            ? t.users.inactive
                            : filterStatus.charAt(0).toUpperCase() +
                              filterStatus.slice(1)}
                        </span>
                      </div>
                      <ChevronDown className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-[140px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl rounded-lg"
                    align="start"
                  >
                    <DropdownMenuItem
                      className="cursor-pointer text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                      onClick={() => setFilterStatus("all")}
                    >
                      All Status
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      onClick={() => setFilterStatus("active")}
                    >
                      {t.users.active}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      onClick={() => setFilterStatus("inactive")}
                    >
                      {t.users.inactive}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      onClick={() => setFilterStatus("pending")}
                    >
                      Pending
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <Card
            key={user.id}
            className="bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-800 dark:via-gray-800/50 dark:to-gray-900 border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group overflow-hidden relative"
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 dark:from-blue-400/10 dark:via-purple-400/10 dark:to-pink-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <CardHeader className="pb-4 relative z-10">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Avatar className="h-16 w-16 ring-4 ring-white dark:ring-gray-700 shadow-xl group-hover:ring-blue-200 dark:group-hover:ring-blue-700 transition-all duration-300 group-hover:scale-105">
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white font-bold text-xl">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {/* Status indicator */}
                    <div
                      className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white dark:border-gray-700 transition-transform duration-300 group-hover:scale-125 ${
                        user.status === "active"
                          ? "bg-green-400"
                          : user.status === "pending"
                          ? "bg-yellow-400"
                          : "bg-gray-400"
                      } ${user.status === "active" ? "animate-pulse" : ""}`}
                    ></div>
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-100 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                      {user.name}
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300 mt-1">
                      {user.department}
                    </CardDescription>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge
                        variant={getRoleBadgeVariant(user.role)}
                        className="text-xs font-medium"
                      >
                        {user.role}
                      </Badge>
                      <Badge
                        className={`text-xs font-medium ${getStatusColor(
                          user.status
                        )}`}
                      >
                        {user.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 group-hover:bg-gray-100 dark:group-hover:bg-gray-700 transition-colors"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="pt-0 relative z-10">
              {/* Contact Info */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <Mail className="w-4 h-4 mr-3 text-blue-500 dark:text-blue-400" />
                  <span className="truncate">{user.email}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <Phone className="w-4 h-4 mr-3 text-green-500 dark:text-green-400" />
                  <span>{user.phone}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <MapPin className="w-4 h-4 mr-3 text-red-500 dark:text-red-400" />
                  <span className="truncate">{user.location}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg group-hover:bg-gray-100 dark:group-hover:bg-gray-700/50 transition-colors">
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    {user.projects}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Projects
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    {Math.floor(
                      (new Date().getTime() -
                        new Date(user.joinDate).getTime()) /
                        (1000 * 60 * 60 * 24)
                    )}
                    d
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Days Active
                  </p>
                </div>
              </div>

              {/* Join Date & Last Login */}
              <div className="text-xs text-gray-500 mb-4 space-y-1">
                <div className="flex items-center">
                  <Calendar className="w-3 h-3 mr-2" />
                  <span>
                    Joined: {new Date(user.joinDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-3 h-3 mr-2" />
                  <span>
                    Last login: {new Date(user.lastLogin).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t border-gray-100 dark:border-gray-700 group-hover:border-gray-200 dark:group-hover:border-gray-600 transition-colors">
                <CustomButton
                  variant="outline-primary"
                  size="sm"
                  icon={Eye}
                  className="flex-1"
                >
                  {t.users.viewProfile}
                </CustomButton>
                <CustomButton
                  variant="success"
                  size="sm"
                  icon={Edit}
                  className="flex-1"
                >
                  {t.users.editUser}
                </CustomButton>
                <CustomButton variant="danger" size="sm" icon={Trash2}>
                  {t.common.delete}
                </CustomButton>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Results Info */}
      {filteredUsers.length === 0 ? (
        <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
          <CardContent className="p-12 text-center">
            <Users className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              No users found
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Try adjusting your search criteria or filters to find users.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="text-center text-sm text-gray-500">
          Showing {filteredUsers.length} of {users.length} users
        </div>
      )}
    </div>
  );
};

export default UsersPage;
