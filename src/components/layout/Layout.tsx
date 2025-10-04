import React from "react";
import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { useDropdownFocusManagement } from "@/hooks/useDropdownFocusManagement";
import { getPageIdFromRoute } from "../../constants/routes";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const activePage = getPageIdFromRoute(location.pathname);
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

  // Handle dropdown focus management to prevent aria-hidden warnings
  useDropdownFocusManagement();

  // Simple dropdown position fix - no complex logic
  React.useEffect(() => {
    const handleDropdownClick = (event: Event) => {
      const target = event.target as HTMLElement;
      const trigger = target.closest("[data-radix-dropdown-menu-trigger]");

      if (trigger) {
        // Simple delayed positioning fix
        setTimeout(() => {
          const dropdowns = document.querySelectorAll(
            '[data-radix-dropdown-menu-content][data-state="open"]'
          );
          dropdowns.forEach((dropdown) => {
            const dropdownEl = dropdown as HTMLElement;
            const triggerRect = trigger.getBoundingClientRect();

            // Simple positioning - just ensure it's below the trigger
            dropdownEl.style.top = `${triggerRect.bottom + 4}px`;
            dropdownEl.style.left = `${triggerRect.left}px`;
            dropdownEl.style.position = "fixed";
            dropdownEl.style.zIndex = "9999";
          });
        }, 50); // Small delay to let Radix position first
      }
    };

    document.addEventListener("click", handleDropdownClick, true);
    return () =>
      document.removeEventListener("click", handleDropdownClick, true);
  }, []);

  const handleSidebarToggle = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500 ease-out">
      <Header />
      <div className="flex">
        <Sidebar activeItem={activePage} onToggle={handleSidebarToggle} />
        <main
          className={`flex-1 pt-16 transition-all duration-300 show-scrollbar overflow-y-auto max-h-screen ${
            sidebarCollapsed ? "ml-16" : "ml-64"
          }`}
        >
          <div className="p-6 min-h-[calc(100vh-4rem)] w-full transition-colors duration-400 ease-out">
            {children}
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default Layout;
