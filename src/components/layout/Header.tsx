import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LogOut,
  Settings,
  User,
  Bell,
  HelpCircle,
  ChevronDown,
} from "lucide-react";

interface HeaderProps {
  onPageChange?: (pageId: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onPageChange }) => {
  const { user, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    setShowLogoutDialog(false); // Close dialog
    setDropdownOpen(false); // Close dropdown
    try {
      await logout();
    } catch (error) {
      setIsLoggingOut(false);
    }
  };

  const handleLogoutClick = () => {
    setDropdownOpen(false); // Close dropdown immediately
    setShowLogoutDialog(true); // Show dialog
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="flex justify-between items-center px-6 py-4 max-w-full">
        <div className="flex items-center">
          <h1 className="text-xl font-bold">MyApp</h1>
        </div>
        <div className="flex items-center">
          <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-3 hover:bg-white/10 transition-colors duration-200"
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-white text-blue-600 text-sm font-medium">
                    {user?.name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("") || user?.username?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium text-white">
                    Welcome, {user?.name || user?.username}
                  </span>
                  <span className="text-xs text-blue-100">Administrator</span>
                </div>
                <ChevronDown className="h-4 w-4 text-blue-100" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-64 mr-4 bg-white border border-gray-200 shadow-xl rounded-lg backdrop-blur-sm z-[60]"
              align="end"
              sideOffset={8}
            >
              <DropdownMenuLabel className="font-semibold bg-gray-50 text-gray-900">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">
                      {user?.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("") || user?.username?.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">
                      {user?.name || user?.username}
                    </div>
                    <div className="text-xs text-gray-500">{user?.email}</div>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="flex items-center gap-2 cursor-pointer text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                onClick={() => onPageChange?.("profile-settings")}
              >
                <User className="h-4 w-4" />
                <span>Profile Settings</span>
              </DropdownMenuItem>

              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                <Settings className="h-4 w-4" />
                <span>Account Settings</span>
              </DropdownMenuItem>

              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                <Bell className="h-4 w-4" />
                <span>Notifications</span>
              </DropdownMenuItem>

              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                <HelpCircle className="h-4 w-4" />
                <span>Help & Support</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="flex items-center gap-2 cursor-pointer text-red-600 hover:bg-red-50 hover:text-red-700 focus:bg-red-50 focus:text-red-700"
                onClick={handleLogoutClick}
                onSelect={(e) => e.preventDefault()}
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Logout Confirmation Dialog - Outside of dropdown */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-900">
              Konfirmasi Logout
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              Apakah Anda yakin ingin keluar dari sistem? Anda akan diarahkan ke
              halaman login.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="text-gray-600">
              Batal
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoggingOut ? "Logging out..." : "Ya, Logout"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </header>
  );
};

export default Header;
