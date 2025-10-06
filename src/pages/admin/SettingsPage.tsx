import React from "react";
import { useLanguage } from "../../context/LanguageContext";

const SettingsPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {t.nav.settings}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Configure application settings and preferences
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-gray-600 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Application Settings
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            This is where you would configure general application settings and
            system preferences.
          </p>
          <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
            <p>• System configurations</p>
            <p>• Security settings</p>
            <p>• Integration settings</p>
            <p>• Backup and maintenance</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
