import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Package, ShoppingCart, DollarSign } from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    { 
      title: 'Total Users', 
      value: '1,234', 
      icon: Users, 
      change: '+12%',
      changeType: 'positive' as const
    },
    { 
      title: 'Total Products', 
      value: '567', 
      icon: Package, 
      change: '+8%',
      changeType: 'positive' as const
    },
    { 
      title: 'Total Orders', 
      value: '890', 
      icon: ShoppingCart, 
      change: '+15%',
      changeType: 'positive' as const
    },
    { 
      title: 'Revenue', 
      value: '$12,345', 
      icon: DollarSign, 
      change: '+23%',
      changeType: 'positive' as const
    },
  ];

  const recentActivities = [
    { id: 1, action: 'New user registered', time: '5 minutes ago', type: 'user' },
    { id: 2, action: 'Product added to inventory', time: '15 minutes ago', type: 'product' },
    { id: 3, action: 'Order completed', time: '1 hour ago', type: 'order' },
    { id: 4, action: 'Payment received', time: '2 hours ago', type: 'payment' },
    { id: 5, action: 'User profile updated', time: '3 hours ago', type: 'user' },
  ];

  const getActivityBadgeVariant = (type: string) => {
    switch (type) {
      case 'user': return 'default';
      case 'product': return 'secondary';
      case 'order': return 'outline';
      case 'payment': return 'default';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-gray-600 mt-3 text-lg">
            Welcome back! Here's what's happening with your application.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="relative overflow-hidden bg-gradient-to-br from-white to-gray-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                <CardTitle className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                  {stat.title}
                </CardTitle>
                <div className="p-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 group-hover:from-blue-200 group-hover:to-purple-200 transition-all duration-300">
                  <IconComponent className="h-4 w-4 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">{stat.value}</div>
                <div className="flex items-center mt-2">
                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 hover:bg-green-200 transition-colors">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {stat.change}
                  </Badge>
                  <span className="text-xs text-gray-500 ml-2 font-medium">vs last month</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <Card className="xl:col-span-2 bg-gradient-to-br from-white to-blue-50/30 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-xl border-b">
            <CardTitle className="text-xl font-bold text-gray-800">Recent Activities</CardTitle>
            <CardDescription className="text-gray-600">Latest activities in your application</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-4">
                    <Badge variant={getActivityBadgeVariant(activity.type)}>
                      {activity.type}
                    </Badge>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-gradient-to-br from-white to-purple-50/30 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-xl border-b">
            <CardTitle className="text-xl font-bold text-gray-800">Quick Actions</CardTitle>
            <CardDescription className="text-gray-600">Commonly used actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3">
              <Button variant="outline" className="justify-start h-auto p-4">
                <Users className="w-4 h-4 mr-3" />
                <div className="text-left">
                  <div className="font-medium">Add User</div>
                  <div className="text-xs text-gray-500">Create new user account</div>
                </div>
              </Button>
              <Button variant="outline" className="justify-start h-auto p-4">
                <Package className="w-4 h-4 mr-3" />
                <div className="text-left">
                  <div className="font-medium">Add Product</div>
                  <div className="text-xs text-gray-500">Add new product to inventory</div>
                </div>
              </Button>
              <Button variant="outline" className="justify-start h-auto p-4">
                <TrendingUp className="w-4 h-4 mr-3" />
                <div className="text-left">
                  <div className="font-medium">View Reports</div>
                  <div className="text-xs text-gray-500">Generate analytics reports</div>
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