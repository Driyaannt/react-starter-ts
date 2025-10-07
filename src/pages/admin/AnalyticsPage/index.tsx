import React from "react";
import { useLanguage } from "../../../context/LanguageContext";

const AnalyticsPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {t.nav.analytics}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          View detailed analytics and business insights
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-purple-600 dark:text-purple-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Analytics Dashboard
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            This is where you would view comprehensive business analytics and
            reports.
          </p>
          <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
            <p>• Sales performance metrics</p>
            <p>• User engagement analytics</p>
            <p>• Revenue and profit reports</p>
            <p>• Custom dashboard widgets</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
