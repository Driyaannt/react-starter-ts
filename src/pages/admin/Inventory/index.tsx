import { useLanguage } from "@/context/LanguageContext";

const Inventory = () => {
  const { t } = useLanguage();
  console.log(t);

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-8 rounded-lg shadow-lg mb-6">
          <h1 className="text-4xl font-bold mb-2">📦 Inventory Management</h1>
          <p className="text-lg opacity-90">
            Real-time stock tracking and management
          </p>
        </div>

        <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-green-800 mb-3">
            ✨ AUTO-GENERATED ROUTE
          </h2>
          <div className="space-y-2 text-green-700">
            <p className="text-lg">
              <strong>Page:</strong> Inventory
            </p>
            <p className="text-lg">
              <strong>Route:</strong> /admin/inventory
            </p>
            <p className="text-lg">
              <strong>Status:</strong> ✅ Automatically detected and added!
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-4">How it works:</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Created folder: <code className="bg-gray-100 px-2 py-1 rounded">src/pages/admin/Inventory/</code></li>
            <li>Created file: <code className="bg-gray-100 px-2 py-1 rounded">index.tsx</code></li>
            <li>Plugin detected new file automatically</li>
            <li>Route generated and added to routing system</li>
            <li>No terminal commands needed! 🚀</li>
          </ol>
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded">
          <p className="text-blue-800">
            <strong>💡 Tip:</strong> Check your console to see the auto-detection message!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
