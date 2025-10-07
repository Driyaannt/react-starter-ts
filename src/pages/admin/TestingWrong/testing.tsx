// ❌ File ini TIDAK akan ter-detect karena nama file salah!

const TestingWrong = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-red-600">
        ❌ This page will NOT be auto-detected!
      </h1>
      <p className="mt-4 text-lg">
        Reason: File name is "testing.tsx" instead of "index.tsx"
      </p>
    </div>
  );
};

export default TestingWrong;
