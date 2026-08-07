export default function Loader() {
  return (
    <div className="flex justify-center items-center py-12">
      <div
        className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"
        aria-label="Loading"></div>
      <p className="ml-4 text-gray-600 font-medium">Loading products...</p>
    </div>
  );
}
