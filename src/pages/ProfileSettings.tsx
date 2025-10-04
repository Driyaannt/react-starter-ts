import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import CustomButton from "@/components/ui/CustomButton";
import { useButtonLoading } from "@/hooks/useButtonLoading";
import LanguageSelector from "@/components/ui/LanguageSelector";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Save,
  Eye,
  EyeOff,
  Shield,
  Bell,
  Palette,
  Globe,
  Camera,
} from "lucide-react";

const ProfileSettings: React.FC = () => {
  const { user, showAlert } = useAuth();
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Button loading states
  const saveLoading = useButtonLoading();
  const changePasswordLoading = useButtonLoading();

  // Form states
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    username: user?.username || "",
    phone: "+62 812-3456-7890",
    location: "Jakarta, Indonesia",
    bio: "Administrator of the system",
    website: "https://mywebsite.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    theme: "light",
    language: "en",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePreferenceChange = (field: string, value: boolean | string) => {
    setPreferences((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    await saveLoading.withLoading(async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      showAlert(
        "success",
        t.profile.profileUpdated,
        t.profile.profileUpdatedDesc
      );
      setIsEditing(false);
    });
  };

  const handlePasswordChange = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      showAlert(
        "error",
        t.profile.passwordMismatch,
        t.profile.passwordMismatch
      );
      return;
    }

    if (formData.newPassword.length < 6) {
      showAlert("error", t.alerts.error, t.profile.passwordTooShort);
      return;
    }

    await changePasswordLoading.withLoading(async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      showAlert(
        "success",
        t.profile.passwordChanged,
        t.profile.passwordChangedDesc
      );
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
            {t.profile.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-3 text-lg">
            {t.profile.subtitle}
          </p>
        </div>
        <div className="flex gap-3">
          {isEditing ? (
            <>
              <CustomButton
                variant="outline"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </CustomButton>
              <CustomButton
                variant="primary"
                icon={Save}
                onClick={handleSave}
                loading={saveLoading.loading}
              >
                Save Changes
              </CustomButton>
            </>
          ) : (
            <CustomButton variant="primary" onClick={() => setIsEditing(true)}>
              Edit Profile
            </CustomButton>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Profile Overview */}
        <Card className="xl:col-span-1 bg-gradient-to-br from-white to-blue-50/30 dark:from-gray-800 dark:to-gray-900/50 border-0 shadow-lg hover:shadow-xl transition-all duration-500 ease-out">
          <CardHeader className="text-center">
            <div className="relative mx-auto">
              <Avatar className="w-24 h-24 mx-auto">
                <AvatarFallback className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 text-2xl font-bold">
                  {user?.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("") || user?.username?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <CustomButton
                size="sm"
                variant="secondary"
                icon={Camera}
                className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
              />
            </div>
            <CardTitle className="text-xl dark:text-gray-100">
              {user?.name || user?.username}
            </CardTitle>
            <CardDescription className="flex items-center justify-center gap-2">
              <Badge
                variant="secondary"
                className="dark:bg-gray-700 dark:text-gray-300"
              >
                Administrator
              </Badge>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <Mail className="w-4 h-4" />
                <span>{user?.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <Phone className="w-4 h-4" />
                <span>{formData.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>{formData.location}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>Joined January 2024</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Details */}
        <Card className="xl:col-span-2 bg-gradient-to-br from-white to-gray-50/30 dark:from-gray-800 dark:to-gray-900/50 border-0 shadow-lg hover:shadow-xl transition-all duration-500 ease-out">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 dark:text-gray-100">
              <User className="w-5 h-5" />
              Personal Information
            </CardTitle>
            <CardDescription className="dark:text-gray-400">
              Update your personal details and contact information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  Full Name
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  disabled={!isEditing}
                  className={`h-11 px-4 border-2 rounded-lg transition-all duration-300 ${
                    !isEditing
                      ? "bg-gray-50 border-gray-200 text-gray-600"
                      : "bg-white border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 text-gray-900"
                  }`}
                />
              </div>
              <div className="space-y-3">
                <Label
                  htmlFor="username"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  Username
                </Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) =>
                    handleInputChange("username", e.target.value)
                  }
                  disabled={!isEditing}
                  className={`h-11 px-4 border-2 rounded-lg transition-all duration-300 ${
                    !isEditing
                      ? "bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400"
                      : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/20 text-gray-900 dark:text-gray-100"
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  disabled={!isEditing}
                  className={`h-11 px-4 border-2 rounded-lg transition-all duration-300 ${
                    !isEditing
                      ? "bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400"
                      : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/20 text-gray-900 dark:text-gray-100"
                  }`}
                />
              </div>
              <div className="space-y-3">
                <Label
                  htmlFor="phone"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  disabled={!isEditing}
                  className={`h-11 px-4 border-2 rounded-lg transition-all duration-300 ${
                    !isEditing
                      ? "bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400"
                      : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/20 text-gray-900 dark:text-gray-100"
                  }`}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Password Settings */}
        <Card className="bg-gradient-to-br from-white to-red-50/30 dark:from-gray-800 dark:to-red-900/10 border-0 shadow-lg hover:shadow-xl transition-all duration-500 ease-out">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 dark:text-gray-100">
              <Shield className="w-5 h-5" />
              Password Settings
            </CardTitle>
            <CardDescription className="dark:text-gray-400">
              Change your password to keep your account secure
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Label
                htmlFor="currentPassword"
                className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"
              >
                <Shield className="w-4 h-4" />
                Current Password
              </Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  value={formData.currentPassword}
                  onChange={(e) =>
                    handleInputChange("currentPassword", e.target.value)
                  }
                  placeholder="Enter current password"
                  className="h-11 px-4 pr-12 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/20 transition-all duration-300 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
                <CustomButton
                  variant="ghost"
                  size="sm"
                  icon={showCurrentPassword ? EyeOff : Eye}
                  className="absolute right-1 top-1 h-9 w-9 rounded-lg"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="newPassword"
                className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"
              >
                <Shield className="w-4 h-4" />
                New Password
              </Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={formData.newPassword}
                  onChange={(e) =>
                    handleInputChange("newPassword", e.target.value)
                  }
                  placeholder="Enter new password"
                  className="h-11 px-4 pr-12 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/20 transition-all duration-300 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
                <CustomButton
                  variant="ghost"
                  size="sm"
                  icon={showNewPassword ? EyeOff : Eye}
                  className="absolute right-1 top-1 h-9 w-9 rounded-lg"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"
              >
                <Shield className="w-4 h-4" />
                Confirm New Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleInputChange("confirmPassword", e.target.value)
                  }
                  placeholder="Confirm new password"
                  className="h-11 px-4 pr-12 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/20 transition-all duration-300 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
                <CustomButton
                  variant="ghost"
                  size="sm"
                  icon={showConfirmPassword ? EyeOff : Eye}
                  className="absolute right-1 top-1 h-9 w-9 rounded-lg"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              </div>
            </div>

            <CustomButton
              variant="danger"
              icon={Shield}
              fullWidth
              onClick={handlePasswordChange}
              loading={changePasswordLoading.loading}
              disabled={
                !formData.currentPassword ||
                !formData.newPassword ||
                !formData.confirmPassword
              }
            >
              Change Password
            </CustomButton>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card className="bg-gradient-to-br from-white to-purple-50/30 dark:from-gray-800 dark:to-purple-900/10 border-0 shadow-lg hover:shadow-xl transition-all duration-500 ease-out">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 dark:text-gray-100">
              <Palette className="w-5 h-5" />
              Preferences
            </CardTitle>
            <CardDescription className="dark:text-gray-400">
              Customize your application experience
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Notifications */}
            <div className="space-y-4">
              <h4 className="font-medium flex items-center gap-2 dark:text-gray-100">
                <Bell className="w-4 h-4" />
                Notifications
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium dark:text-gray-100">
                      Email Notifications
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Receive notifications via email
                    </p>
                  </div>
                  <Button
                    variant={
                      preferences.emailNotifications ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() =>
                      handlePreferenceChange(
                        "emailNotifications",
                        !preferences.emailNotifications
                      )
                    }
                  >
                    {preferences.emailNotifications ? "On" : "Off"}
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium dark:text-gray-100">
                      Push Notifications
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Receive push notifications
                    </p>
                  </div>
                  <Button
                    variant={
                      preferences.pushNotifications ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() =>
                      handlePreferenceChange(
                        "pushNotifications",
                        !preferences.pushNotifications
                      )
                    }
                  >
                    {preferences.pushNotifications ? "On" : "Off"}
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium dark:text-gray-100">
                      Marketing Emails
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Receive promotional content
                    </p>
                  </div>
                  <Button
                    variant={
                      preferences.marketingEmails ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() =>
                      handlePreferenceChange(
                        "marketingEmails",
                        !preferences.marketingEmails
                      )
                    }
                  >
                    {preferences.marketingEmails ? "On" : "Off"}
                  </Button>
                </div>
              </div>
            </div>

            <Separator />

            {/* Appearance */}
            <div className="space-y-4">
              <h4 className="font-medium flex items-center gap-2 dark:text-gray-100">
                <Globe className="w-4 h-4" />
                {t.profile.appearance}
              </h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium dark:text-gray-100">
                      {t.profile.theme}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {t.profile.themeDesc}
                    </p>
                  </div>
                  <select
                    className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    value={preferences.theme}
                    onChange={(e) =>
                      handlePreferenceChange("theme", e.target.value)
                    }
                  >
                    <option value="light">{t.theme.light}</option>
                    <option value="dark">{t.theme.dark}</option>
                    <option value="auto">{t.theme.auto}</option>
                  </select>
                </div>

                {/* Language Selector Component */}
                <LanguageSelector
                  variant="settings"
                  className="border-t border-gray-200 dark:border-gray-700 pt-4"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileSettings;
