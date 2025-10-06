import React from "react";
import { useLanguage } from "../../context/LanguageContext";

const OrdersPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {t.nav.orders}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage customer orders and fulfillment
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Orders Management
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            This is where you would manage customer orders and order fulfillment
            process.
          </p>
          <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
            <p>• View and process customer orders</p>
            <p>• Track order status and shipping</p>
            <p>• Manage returns and refunds</p>
            <p>• Generate order reports</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
