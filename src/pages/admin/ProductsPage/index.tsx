import React from "react";
import { useLanguage } from "../../../context/LanguageContext";

const ProductsPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {t.nav.products}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your product inventory and catalog
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-blue-600 dark:text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Products Management
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            This is where you would manage your products catalog, inventory, and
            pricing.
          </p>
          <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
            <p>• Add and edit product information</p>
            <p>• Manage inventory levels</p>
            <p>• Set up product categories</p>
            <p>• Track product performance</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
