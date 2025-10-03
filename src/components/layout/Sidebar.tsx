import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  Users,
  Package,
  ShoppingCart,
  TrendingUp,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  badge?: string;
}

const menuItems: MenuItem[] = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3, path: "/dashboard" },
  {
    id: "users",
    label: "User Management",
    icon: Users,
    path: "/users",
    badge: "12",
  },
  { id: "users-page", label: "Users", icon: Users, path: "/users-page" },
  { id: "products", label: "Products", icon: Package, path: "/products" },
  {
    id: "orders",
    label: "Orders",
    icon: ShoppingCart,
    path: "/orders",
    badge: "3",
  },
  { id: "analytics", label: "Analytics", icon: TrendingUp, path: "/analytics" },
  { id: "settings", label: "Settings", icon: Settings, path: "/settings" },
];

interface SidebarProps {
  activeItem?: string;
  onItemClick?: (itemId: string) => void;
  onToggle?: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeItem = "dashboard",
  onItemClick,
  onToggle,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleItemClick = (itemId: string) => {
    if (onItemClick) {
      onItemClick(itemId);
    } else {
      // Fallback behavior
      console.log(`Navigating to: ${itemId}`);
    }
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-16 bottom-0 z-40 bg-white border-r border-gray-200 transition-all duration-300",
        "hover:shadow-xl hover:bg-gradient-to-br hover:from-blue-50/30 hover:to-purple-50/20 hover:border-blue-200",
        "overflow-y-auto", // Internal scroll for sidebar content
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex flex-col h-full">
        {/* Toggle Button */}
        <div className="flex items-center justify-end p-4 border-b border-gray-100 flex-shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              const newCollapsed = !isCollapsed;
              setIsCollapsed(newCollapsed);
              if (onToggle) {
                onToggle(newCollapsed);
              }
            }}
            className="h-8 w-8 hover:bg-blue-100/60 hover:text-blue-700 hover:shadow-md transition-all duration-200 hover:scale-110"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeItem === item.id;

              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start h-10 px-3 transition-all duration-200",
                    isCollapsed && "px-2 justify-center",
                    isActive && "bg-blue-600 text-white hover:bg-blue-700",
                    !isActive &&
                      "hover:bg-blue-100/50 hover:text-blue-800 hover:shadow-lg hover:border-blue-200/50 hover:scale-[1.02]"
                  )}
                  onClick={() => handleItemClick(item.id)}
                  title={isCollapsed ? item.label : ""}
                >
                  <IconComponent
                    className={cn("h-4 w-4", !isCollapsed && "mr-3")}
                  />
                  {!isCollapsed && (
                    <>
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                </Button>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        {!isCollapsed && (
          <div className="p-4 border-t border-gray-100">
            <div className="text-xs text-gray-500">
              <p className="font-medium">MyApp v1.0</p>
              <p className="mt-1">© 2024 All rights reserved</p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
