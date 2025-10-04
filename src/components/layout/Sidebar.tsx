import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/context/LanguageContext";
import {
  BarChart3,
  Users,
  Package,
  ShoppingCart,
  TrendingUp,
  Settings,
  ChevronLeft,
  ChevronRight,
  CreditCard,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ROUTES } from "../../constants/routes";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  badge?: string;
}

interface SidebarProps {
  activeItem?: string;
  onToggle?: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeItem = "dashboard",
  onToggle,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [tooltip, setTooltip] = useState<{
    show: boolean;
    text: string;
    x: number;
    y: number;
    isActive: boolean;
  }>({
    show: false,
    text: "",
    x: 0,
    y: 0,
    isActive: false,
  });

  const menuItems: MenuItem[] = [
    {
      id: "dashboard",
      label: t.nav.dashboard,
      icon: BarChart3,
      path: ROUTES.DASHBOARD,
    },
    {
      id: "users",
      label: t.nav.userManagement,
      icon: Users,
      path: ROUTES.USERS,
      badge: "12",
    },
    {
      id: "users-page",
      label: t.nav.users,
      icon: Users,
      path: ROUTES.USERS_PAGE,
    },
    {
      id: "products",
      label: t.nav.products,
      icon: Package,
      path: ROUTES.PRODUCTS,
    },
    {
      id: "orders",
      label: t.nav.orders,
      icon: ShoppingCart,
      path: ROUTES.ORDERS,
      badge: "3",
    },
    {
      id: "transactions",
      label: t.nav.transactions,
      icon: CreditCard,
      path: ROUTES.TRANSACTIONS,
      badge: "5",
    },
    {
      id: "analytics",
      label: t.nav.analytics,
      icon: TrendingUp,
      path: ROUTES.ANALYTICS,
    },
    {
      id: "settings",
      label: t.nav.settings,
      icon: Settings,
      path: ROUTES.SETTINGS,
    },
  ];

  const handleItemClick = (path: string) => {
    navigate(path);
  };

  const handleMouseEnter = (
    event: React.MouseEvent<HTMLButtonElement>,
    item: MenuItem
  ) => {
    if (isCollapsed) {
      const rect = event.currentTarget.getBoundingClientRect();
      setTooltip({
        show: true,
        text: item.label + (item.badge ? ` (${item.badge})` : ""),
        x: rect.right + 8,
        y: rect.top + rect.height / 2,
        isActive: activeItem === item.id,
      });
    }
  };

  const handleMouseLeave = () => {
    setTooltip((prev) => ({ ...prev, show: false }));
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-16 bottom-0 z-40 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300",
        "hover:shadow-xl hover:bg-gradient-to-br hover:from-blue-50/30 hover:to-purple-50/20 dark:hover:from-gray-700/30 dark:hover:to-gray-600/20 hover:border-blue-200 dark:hover:border-gray-600",
        "overflow-y-auto", // Internal scroll for sidebar content
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex flex-col h-full">
        {/* Toggle Button */}
        <div className="flex items-center justify-end p-4 border-b border-gray-100 dark:border-gray-700 flex-shrink-0">
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
            className="h-8 w-8 hover:bg-blue-100/60 dark:hover:bg-blue-900/40 hover:text-blue-700 dark:hover:text-blue-400 hover:shadow-md transition-all duration-200 hover:scale-110"
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
                      "hover:bg-blue-100/50 dark:hover:bg-blue-900/30 hover:text-blue-800 dark:hover:text-blue-300 hover:shadow-lg hover:border-blue-200/50 dark:hover:border-blue-700/50 hover:scale-[1.02]"
                  )}
                  onClick={() => handleItemClick(item.path)}
                  onMouseEnter={(e) => handleMouseEnter(e, item)}
                  onMouseLeave={handleMouseLeave}
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

      {/* Fixed Tooltip */}
      {tooltip.show && (
        <div
          className={cn("sidebar-tooltip show", tooltip.isActive && "active")}
          style={{
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
            transform: "translateY(-50%)",
          }}
        >
          {tooltip.text}
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
