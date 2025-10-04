import React, { useState } from "react";
import { useLanguage, availableLanguages } from "@/context/LanguageContext";
import type { Language } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { handleDropdownAriaHidden } from "@/utils/dropdownAriaFix";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Languages, Check, ChevronDown } from "lucide-react";

interface LanguageSelectorProps {
  variant?: "header" | "settings";
  className?: string;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  variant = "header",
  className = "",
}) => {
  const { currentLanguage, setLanguage, t, isLoading } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = async (language: Language) => {
    if (language === currentLanguage || isLoading) return;

    setIsOpen(false);
    await setLanguage(language);
  };

  const currentLangData = availableLanguages.find(
    (lang) => lang.code === currentLanguage
  );

  if (variant === "header") {
    return (
      <DropdownMenu 
        open={isOpen} 
        onOpenChange={(open) => {
          setIsOpen(open);
          // Fix aria-hidden focus conflicts
          handleDropdownAriaHidden(open);
        }}
      >
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={`h-9 px-3 gap-2 text-white hover:bg-white/10 transition-all duration-200 ${className}`}
            disabled={isLoading}
          >
            <Languages className="w-4 h-4" />
            <span className="text-sm font-medium">
              {currentLangData?.flag} {currentLangData?.code.toUpperCase()}
            </span>
            <ChevronDown className="w-3 h-3 opacity-70" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          side="bottom"
          sideOffset={8}
          className="w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl rounded-lg backdrop-blur-sm z-[70]"
        >
          <div className="p-2">
            <div className="px-2 py-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {t.profile.language}
            </div>
            {availableLanguages.map((language) => (
              <DropdownMenuItem
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className="flex items-center justify-between px-3 py-2.5 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{language.flag}</span>
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {language.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {language.nativeName}
                    </div>
                  </div>
                </div>
                {currentLanguage === language.code && (
                  <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                )}
              </DropdownMenuItem>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // Settings variant (for profile settings page)
  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium dark:text-gray-100">
            {t.profile.language}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {t.profile.languageDesc}
          </p>
        </div>
        <DropdownMenu 
          open={isOpen} 
          onOpenChange={(open) => {
            setIsOpen(open);
            // Fix aria-hidden focus conflicts
            handleDropdownAriaHidden(open);
          }}
        >
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="w-48 justify-between bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
              disabled={isLoading}
            >
              <div className="flex items-center gap-2">
                <span>{currentLangData?.flag}</span>
                <span className="text-sm">{currentLangData?.name}</span>
              </div>
              <ChevronDown className="w-4 h-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            side="bottom"
            sideOffset={8}
            className="w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg"
          >
            {availableLanguages.map((language) => (
              <DropdownMenuItem
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span>{language.flag}</span>
                  <span className="text-sm">{language.name}</span>
                </div>
                {currentLanguage === language.code && (
                  <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Current language info */}
      <div className="flex items-center gap-2">
        <Badge
          variant="secondary"
          className="text-xs dark:bg-gray-700 dark:text-gray-300"
        >
          Current: {currentLangData?.nativeName}
        </Badge>
        {isLoading && (
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <div className="w-3 h-3 border border-gray-300 border-t-transparent rounded-full animate-spin"></div>
            {t.common.loading}...
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguageSelector;
