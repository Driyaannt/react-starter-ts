import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { UserPlus, Mail, Activity } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
}

const UserManagement: React.FC = () => {
  const users: User[] = [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', lastLogin: '2024-01-15' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active', lastLogin: '2024-01-14' },
    { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'inactive', lastLogin: '2024-01-10' },
    { id: '4', name: 'Alice Brown', email: 'alice@example.com', role: 'Moderator', status: 'active', lastLogin: '2024-01-13' },
  ];

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">User Management</h1>
          <p className="text-gray-600 mt-3 text-lg">Manage your application users and their permissions</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <UserPlus className="w-5 h-5 mr-2" />
          Add New User
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-blue-700 group-hover:text-blue-800 transition-colors">Total Users</p>
                <p className="text-3xl font-bold text-blue-900">{users.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center group-hover:bg-blue-300 transition-colors group-hover:scale-110 duration-300">
                <UserPlus className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-green-700 group-hover:text-green-800 transition-colors">Active Users</p>
                <p className="text-3xl font-bold text-green-900">
                  {users.filter(u => u.status === 'active').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center group-hover:bg-green-300 transition-colors group-hover:scale-110 duration-300">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-red-700 group-hover:text-red-800 transition-colors">Admins</p>
                <p className="text-3xl font-bold text-red-900">
                  {users.filter(u => u.role === 'Admin').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-200 rounded-full flex items-center justify-center group-hover:bg-red-300 transition-colors group-hover:scale-110 duration-300">
                <div className="w-3 h-3 bg-red-600 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-purple-700 group-hover:text-purple-800 transition-colors">New This Month</p>
                <p className="text-3xl font-bold text-purple-900">+12</p>
              </div>
              <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center group-hover:bg-purple-300 transition-colors group-hover:scale-110 duration-300">
                <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced User Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <Card key={user.id} className="bg-gradient-to-br from-white via-gray-50 to-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 group overflow-hidden relative">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <CardHeader className="pb-4 relative z-10">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16 ring-4 ring-white shadow-xl group-hover:ring-blue-200 transition-all duration-300 group-hover:scale-110">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white font-bold text-xl">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors">{user.name}</CardTitle>
                    <CardDescription className="flex items-center mt-2 text-gray-600">
                      <Mail className="w-4 h-4 mr-2 text-blue-500" />
                      {user.email}
                    </CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0 relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <Badge 
                  variant={user.role === 'Admin' ? 'destructive' : user.role === 'Moderator' ? 'default' : 'secondary'}
                  className="font-medium px-3 py-1"
                >
                  {user.role}
                </Badge>
                <Badge 
                  className={`font-medium px-3 py-1 ${
                    user.status === 'active' 
                      ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {user.status}
                </Badge>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-500 mb-4">
                  Last login: <span className="text-gray-700 font-medium">{user.lastLogin}</span>
                </p>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 bg-red-50 border-red-200 text-red-700 hover:bg-red-100"
                  >
                    Delete
                  </Button>
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