export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16">
      <div
        className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-(--nova)"
        role="status"
        aria-label="Loading"></div>
      <p className="font-medium text-gray-600">Loading products...</p>
    </div>
  );
}
