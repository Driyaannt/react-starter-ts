import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";
import { useProfile } from "@/context/ProfileContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { handleDropdownAriaHidden } from "@/utils/dropdownAriaFix";
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
import ThemeToggle from "@/components/ui/ThemeToggle";
import LanguageSelector from "@/components/ui/LanguageSelector";
import { ROUTES } from "../../constants/routes";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const { profilePhoto } = useProfile();
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-gray-800 dark:to-gray-900 text-white shadow-lg">
      <div className="flex justify-between items-center px-6 py-4 max-w-full">
        <div className="flex items-center">
          <h1 className="text-xl font-bold">MyApp</h1>
        </div>
        <div className="flex items-center gap-4">
          {/* Language Selector */}
          <LanguageSelector variant="header" />

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Separator */}
          <div className="h-6 w-px bg-white/20 dark:bg-gray-600/40"></div>

          <DropdownMenu
            open={dropdownOpen}
            onOpenChange={(open) => {
              setDropdownOpen(open);
              // Fix aria-hidden focus conflicts
              handleDropdownAriaHidden(open);
            }}
          >
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-3 hover:bg-white/10 transition-colors duration-200"
              >
                <Avatar className="h-8 w-8">
                  {profilePhoto && (
                    <AvatarImage
                      src={profilePhoto}
                      alt="Profile photo"
                      className="object-cover"
                    />
                  )}
                  <AvatarFallback className="bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 text-sm font-medium">
                    {user?.name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("") || user?.username?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium text-white">
                    {t.common.welcome}, {user?.name || user?.username}
                  </span>
                  <span className="text-xs text-blue-100">
                    {t.common.administrator}
                  </span>
                </div>
                <ChevronDown className="h-4 w-4 text-blue-100" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-64 mr-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl rounded-lg backdrop-blur-sm z-[60]"
              align="end"
              side="bottom"
              sideOffset={12}
              avoidCollisions={false}
              sticky="always"
            >
              <DropdownMenuLabel className="font-semibold bg-gray-50 text-gray-900">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    {profilePhoto && (
                      <AvatarImage
                        src={profilePhoto}
                        alt="Profile photo"
                        className="object-cover"
                      />
                    )}
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
                onClick={() => navigate(ROUTES.PROFILE_SETTINGS)}
              >
                <User className="h-4 w-4" />
                <span>{t.nav.profileSettings}</span>
              </DropdownMenuItem>

              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                <Settings className="h-4 w-4" />
                <span>{t.common.accountSettings}</span>
              </DropdownMenuItem>

              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                <Bell className="h-4 w-4" />
                <span>{t.common.notifications}</span>
              </DropdownMenuItem>

              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                <HelpCircle className="h-4 w-4" />
                <span>{t.common.helpSupport}</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="flex items-center gap-2 cursor-pointer text-red-600 hover:bg-red-50 hover:text-red-700 focus:bg-red-50 focus:text-red-700"
                onClick={handleLogoutClick}
                onSelect={(e) => e.preventDefault()}
              >
                <LogOut className="h-4 w-4" />
                <span>{t.common.logout}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Logout Confirmation Dialog - Outside of dropdown */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent className="bg-white dark:bg-gray-800">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-900">
              {t.alerts.logoutTitle}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              {t.alerts.logoutMessage}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="text-gray-600">
              {t.common.cancel}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoggingOut ? t.common.loading : t.alerts.logoutConfirm}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </header>
  );
};

export default Header;
