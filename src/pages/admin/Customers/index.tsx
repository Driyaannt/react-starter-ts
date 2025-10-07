import { useLanguage } from "@/context/LanguageContext";

const Customers = () => {
  const { t } = useLanguage();
  console.log(t); // Using t to avoid warning

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">🙋‍♂️ Customers Page</h1>
      <p className="text-gray-600">
        This page was automatically added to routing system!
      </p>
      <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded">
        <p className="text-green-800 font-semibold">
          ✅ Route automatically generated: /admin/customers
        </p>
      </div>
    </div>
  );
};

export default Customers;
