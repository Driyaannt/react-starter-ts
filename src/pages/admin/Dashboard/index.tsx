import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  Users,
  Package,
  ShoppingCart,
  DollarSign,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const Dashboard: React.FC = () => {
  const { t } = useLanguage();

  const stats = [
    {
      title: t.dashboard.totalUsers,
      value: "1,234",
      icon: Users,
      change: "+12%",
      changeType: "positive" as const,
    },
    {
      title: t.dashboard.totalProducts,
      value: "567",
      icon: Package,
      change: "+8%",
      changeType: "positive" as const,
    },
    {
      title: t.dashboard.totalOrders,
      value: "890",
      icon: ShoppingCart,
      change: "+15%",
      changeType: "positive" as const,
    },
    {
      title: t.dashboard.revenue,
      value: "$12,345",
      icon: DollarSign,
      change: "+23%",
      changeType: "positive" as const,
    },
  ];

  const recentActivities = [
    {
      id: 1,
      action: t.dashboard.newUserRegistered,
      time: `5 ${t.dashboard.minutesAgo}`,
      type: "user",
    },
    {
      id: 2,
      action: t.dashboard.productAddedToInventory,
      time: `15 ${t.dashboard.minutesAgo}`,
      type: "product",
    },
    {
      id: 3,
      action: t.dashboard.orderCompleted,
      time: `1 ${t.dashboard.hourAgo}`,
      type: "order",
    },
    {
      id: 4,
      action: t.dashboard.paymentReceived,
      time: `2 ${t.dashboard.hoursAgo}`,
      type: "payment",
    },
    {
      id: 5,
      action: t.dashboard.userProfileUpdated,
      time: `3 ${t.dashboard.hoursAgo}`,
      type: "user",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
            {t.dashboard.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-3 text-lg">
            {t.dashboard.subtitle}
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card
              key={index}
              className="relative overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-0 shadow-lg hover:shadow-xl transition-all duration-500 ease-out hover:-translate-y-1 group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 dark:from-blue-400/10 dark:to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
                  {stat.title}
                </CardTitle>
                <div className="p-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 group-hover:from-blue-200 group-hover:to-purple-200 dark:group-hover:from-blue-800/60 dark:group-hover:to-purple-800/60 transition-all duration-300">
                  <IconComponent className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="flex items-center mt-2">
                  <Badge
                    variant="secondary"
                    className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
                  >
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {stat.change}
                  </Badge>
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-2 font-medium">
                    {t.dashboard.vsLastMonth}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <Card className="xl:col-span-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-500 ease-out">
          <CardHeader className="border-b border-gray-100 dark:border-gray-700 pb-4">
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {t.dashboard.recentActivities}
            </CardTitle>
            <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
              {t.dashboard.recentActivitiesDesc}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-50/50 dark:from-gray-700/50 dark:to-gray-700/30 hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/20 dark:hover:to-indigo-900/20 transition-all duration-400 ease-out border border-gray-100 dark:border-gray-600 hover:border-blue-200 dark:hover:border-blue-700 hover:shadow-sm"
                >
                  <div className="flex-shrink-0">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center font-medium text-xs uppercase tracking-wide shadow-sm ${
                        activity.type === "user"
                          ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white"
                          : activity.type === "product"
                          ? "bg-gradient-to-br from-green-500 to-emerald-600 text-white"
                          : activity.type === "order"
                          ? "bg-gradient-to-br from-orange-500 to-amber-600 text-white"
                          : activity.type === "payment"
                          ? "bg-gradient-to-br from-purple-500 to-violet-600 text-white"
                          : "bg-gradient-to-br from-gray-500 to-gray-600 text-white"
                      }`}
                    >
                      {activity.type}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">
                      {activity.action}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                      {activity.time}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-500 ease-out">
          <CardHeader className="border-b border-gray-100 dark:border-gray-700 pb-4">
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {t.dashboard.quickActions}
            </CardTitle>
            <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
              {t.dashboard.quickActionsDesc}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start h-auto p-4 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-500 transition-all duration-200"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center mr-3">
                  <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-left flex-1">
                  <div className="font-medium text-gray-900 dark:text-gray-100">
                    {t.dashboard.addUser}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {t.dashboard.addUserDesc}
                  </div>
                </div>
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start h-auto p-4 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-500 transition-all duration-200"
              >
                <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/40 flex items-center justify-center mr-3">
                  <Package className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <div className="text-left flex-1">
                  <div className="font-medium text-gray-900 dark:text-gray-100">
                    {t.dashboard.addProduct}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {t.dashboard.addProductDesc}
                  </div>
                </div>
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start h-auto p-4 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-500 transition-all duration-200"
              >
                <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center mr-3">
                  <TrendingUp className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="text-left flex-1">
                  <div className="font-medium text-gray-900 dark:text-gray-100">
                    {t.dashboard.viewReports}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {t.dashboard.viewReportsDesc}
                  </div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;