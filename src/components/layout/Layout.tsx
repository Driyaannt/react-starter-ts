import React from "react";
import type { ReactNode } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
  activePage?: string;
  onPageChange?: (pageId: string) => void;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  activePage,
  onPageChange,
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

  const handleSidebarToggle = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onPageChange={onPageChange} />
      <div className="flex">
        <Sidebar
          activeItem={activePage}
          onItemClick={onPageChange}
          onToggle={handleSidebarToggle}
        />
        <main
          className={`flex-1 pt-16 transition-all duration-300 ${
            sidebarCollapsed ? "ml-16" : "ml-64"
          }`}
        >
          <div className="p-6 min-h-[calc(100vh-4rem)] w-full">{children}</div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default Layout;
