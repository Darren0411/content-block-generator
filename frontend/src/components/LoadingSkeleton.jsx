export function LoadingSkeleton() {
  return (
    <div className="w-full space-y-4 animate-pulse">
      <div className="h-20 bg-gray-200 rounded-lg"></div>
      <div className="h-40 bg-gray-200 rounded-lg"></div>
      <div className="grid grid-cols-3 gap-4">
        <div className="h-32 bg-gray-200 rounded-lg"></div>
        <div className="h-32 bg-gray-200 rounded-lg"></div>
        <div className="h-32 bg-gray-200 rounded-lg"></div>
      </div>
      <div className="h-16 bg-gray-200 rounded-lg"></div>
    </div>
  );
}