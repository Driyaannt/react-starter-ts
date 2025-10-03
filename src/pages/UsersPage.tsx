import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  Clock
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  location: string;
  joinDate: string;
  lastLogin: string;
  avatar?: string;
  projects: number;
  department: string;
}

const UsersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const users: User[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@company.com',
      phone: '+1 (555) 123-4567',
      role: 'Admin',
      status: 'active',
      location: 'New York, USA',
      joinDate: '2023-01-15',
      lastLogin: '2024-10-03',
      projects: 12,
      department: 'Engineering'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@company.com',
      phone: '+1 (555) 234-5678',
      role: 'Manager',
      status: 'active',
      location: 'San Francisco, USA',
      joinDate: '2023-03-20',
      lastLogin: '2024-10-02',
      projects: 8,
      department: 'Marketing'
    },
    {
      id: '3',
      name: 'Bob Johnson',
      email: 'bob.johnson@company.com',
      phone: '+1 (555) 345-6789',
      role: 'Developer',
      status: 'inactive',
      location: 'Austin, USA',
      joinDate: '2023-06-10',
      lastLogin: '2024-09-28',
      projects: 15,
      department: 'Engineering'
    },
    {
      id: '4',
      name: 'Alice Brown',
      email: 'alice.brown@company.com',
      phone: '+1 (555) 456-7890',
      role: 'Designer',
      status: 'active',
      location: 'Los Angeles, USA',
      joinDate: '2023-08-05',
      lastLogin: '2024-10-03',
      projects: 6,
      department: 'Design'
    },
    {
      id: '5',
      name: 'Charlie Wilson',
      email: 'charlie.wilson@company.com',
      phone: '+1 (555) 567-8901',
      role: 'Analyst',
      status: 'pending',
      location: 'Chicago, USA',
      joinDate: '2024-09-15',
      lastLogin: '2024-10-01',
      projects: 2,
      department: 'Analytics'
    },
    {
      id: '6',
      name: 'Diana Prince',
      email: 'diana.prince@company.com',
      phone: '+1 (555) 678-9012',
      role: 'Manager',
      status: 'active',
      location: 'Seattle, USA',
      joinDate: '2022-11-30',
      lastLogin: '2024-10-03',
      projects: 20,
      department: 'Operations'
    }
  ];

  const getRoleBadgeVariant = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin': return 'destructive';
      case 'manager': return 'default';
      case 'developer': return 'secondary';
      case 'designer': return 'outline';
      case 'analyst': return 'secondary';
      default: return 'outline';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700 hover:bg-green-200';
      case 'inactive': return 'bg-gray-100 text-gray-700 hover:bg-gray-200';
      case 'pending': return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200';
      default: return 'bg-gray-100 text-gray-700 hover:bg-gray-200';
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role.toLowerCase() === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const stats = [
    {
      title: 'Total Users',
      value: users.length.toString(),
      icon: Users,
      color: 'blue',
      change: '+5%'
    },
    {
      title: 'Active Users',
      value: users.filter(u => u.status === 'active').length.toString(),
      icon: Activity,
      color: 'green',
      change: '+12%'
    },
    {
      title: 'New This Month',
      value: users.filter(u => new Date(u.joinDate).getMonth() === 8).length.toString(), // September
      icon: UserPlus,
      color: 'purple',
      change: '+20%'
    },
    {
      title: 'Pending Review',
      value: users.filter(u => u.status === 'pending').length.toString(),
      icon: Clock,
      color: 'yellow',
      change: '-2%'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Users
          </h1>
          <p className="text-gray-600 mt-3 text-lg">
            Manage and view all users in your organization
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="bg-white">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" className="bg-white">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <UserPlus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          const colorClasses = {
            blue: 'from-blue-50 to-blue-100 border-blue-200 text-blue-700 bg-blue-200',
            green: 'from-green-50 to-green-100 border-green-200 text-green-700 bg-green-200',
            purple: 'from-purple-50 to-purple-100 border-purple-200 text-purple-700 bg-purple-200',
            yellow: 'from-yellow-50 to-yellow-100 border-yellow-200 text-yellow-700 bg-yellow-200'
          };
          
          return (
            <Card key={index} className={`bg-gradient-to-br ${colorClasses[stat.color as keyof typeof colorClasses].split(' ').slice(0, 3).join(' ')} shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium ${colorClasses[stat.color as keyof typeof colorClasses].split(' ')[3]} group-hover:opacity-80 transition-opacity`}>
                      {stat.title}
                    </p>
                    <p className={`text-3xl font-bold ${colorClasses[stat.color as keyof typeof colorClasses].split(' ')[3].replace('text-', 'text-').replace('-700', '-900')}`}>
                      {stat.value}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className={`w-12 h-12 ${colorClasses[stat.color as keyof typeof colorClasses].split(' ')[4]} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-6 h-6 ${colorClasses[stat.color as keyof typeof colorClasses].split(' ')[3].replace('-700', '-600')}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Search and Filters */}
      <Card className="bg-white shadow-lg border-0">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search users by name, email, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-3">
              <div className="min-w-[150px]">
                <Label className="text-sm font-medium text-gray-700">Role</Label>
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Roles</option>
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="developer">Developer</option>
                  <option value="designer">Designer</option>
                  <option value="analyst">Analyst</option>
                </select>
              </div>
              <div className="min-w-[150px]">
                <Label className="text-sm font-medium text-gray-700">Status</Label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
              <div className="flex items-end">
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="bg-gradient-to-br from-white via-gray-50 to-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group overflow-hidden relative">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <CardHeader className="pb-4 relative z-10">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Avatar className="h-16 w-16 ring-4 ring-white shadow-xl group-hover:ring-blue-200 transition-all duration-300 group-hover:scale-105">
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white font-bold text-xl">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {/* Status indicator */}
                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white transition-transform duration-300 group-hover:scale-125 ${
                      user.status === 'active' ? 'bg-green-400' :
                      user.status === 'pending' ? 'bg-yellow-400' : 'bg-gray-400'
                    } ${user.status === 'active' ? 'animate-pulse' : ''}`}></div>
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors">
                      {user.name}
                    </CardTitle>
                    <CardDescription className="text-gray-600 mt-1">
                      {user.department}
                    </CardDescription>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant={getRoleBadgeVariant(user.role)} className="text-xs font-medium">
                        {user.role}
                      </Badge>
                      <Badge className={`text-xs font-medium ${getStatusColor(user.status)}`}>
                        {user.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 group-hover:bg-gray-100 transition-colors">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="pt-0 relative z-10">
              {/* Contact Info */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="w-4 h-4 mr-3 text-blue-500" />
                  <span className="truncate">{user.email}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-3 text-green-500" />
                  <span>{user.phone}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-3 text-red-500" />
                  <span className="truncate">{user.location}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-gray-50 rounded-lg group-hover:bg-gray-100 transition-colors">
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900">{user.projects}</p>
                  <p className="text-xs text-gray-500">Projects</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900">
                    {Math.floor((new Date().getTime() - new Date(user.joinDate).getTime()) / (1000 * 60 * 60 * 24))}d
                  </p>
                  <p className="text-xs text-gray-500">Days Active</p>
                </div>
              </div>

              {/* Join Date & Last Login */}
              <div className="text-xs text-gray-500 mb-4 space-y-1">
                <div className="flex items-center">
                  <Calendar className="w-3 h-3 mr-2" />
                  <span>Joined: {new Date(user.joinDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-3 h-3 mr-2" />
                  <span>Last login: {new Date(user.lastLogin).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t border-gray-100 group-hover:border-gray-200 transition-colors">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 hover:border-blue-300 transition-all duration-300"
                >
                  <Eye className="w-3 h-3 mr-1" />
                  View
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 bg-green-50 border-green-200 text-green-700 hover:bg-green-100 hover:border-green-300 transition-all duration-300"
                >
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100 hover:border-red-300 transition-all duration-300"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Results Info */}
      {filteredUsers.length === 0 ? (
        <Card className="bg-white shadow-lg border-0">
          <CardContent className="p-12 text-center">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No users found</h3>
            <p className="text-gray-600">
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