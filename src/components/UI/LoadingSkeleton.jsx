function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }, (_, index) => (
        <div
          key={index}
          className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white"
        >
          <div className="h-48 w-full animate-pulse bg-gray-200" />
          <div className="flex flex-col gap-2 p-4">
            <div className="h-3 w-24 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
            <div className="mt-4 flex items-center justify-between">
              <div className="h-5 w-20 animate-pulse rounded bg-gray-200" />
              <div className="h-9 w-24 animate-pulse rounded-lg bg-gray-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LoadingSkeleton;