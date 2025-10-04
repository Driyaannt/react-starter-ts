import React, { useState } from "react";
import { Moon, Sun, Loader2 } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import CustomButton from "@/components/ui/CustomButton";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleToggle = async () => {
    setIsTransitioning(true);

    // Add slight delay for smooth visual transition
    await new Promise((resolve) => setTimeout(resolve, 150));

    toggleTheme();

    // Reset transition state after theme changes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 400);
  };

  const IconComponent = isTransitioning
    ? Loader2
    : theme === "light"
    ? Moon
    : Sun;

  return (
    <CustomButton
      variant="ghost"
      size="lg"
      onClick={handleToggle}
      disabled={isTransitioning}
      className={`
        theme-toggle-button
        h-11 w-11 p-0 rounded-full 
        hover:bg-white/25 dark:hover:bg-gray-600/60
        border-2 border-white/30 dark:border-gray-500/40
        backdrop-blur-md
        transition-all duration-300 ease-out
        ${isTransitioning ? "animate-spin" : "hover:scale-115 hover:shadow-2xl"}
        active:scale-95
        shadow-lg hover:shadow-2xl
        ring-0 hover:ring-2 hover:ring-white/30 dark:hover:ring-gray-400/30
      `}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <IconComponent
        className={`
          theme-toggle-icon header-icon
          h-6 w-6 
          transition-all duration-300 ease-out
          ${theme === "light" ? "sun-icon" : "moon-icon"}
          ${isTransitioning ? "" : "hover:rotate-12"}
        `}
      />
    </CustomButton>
  );
};

export default ThemeToggle;
