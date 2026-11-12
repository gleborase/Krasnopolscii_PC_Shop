function ProductPageSkeleton() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="h-80 w-full animate-pulse rounded-xl bg-gray-200" />
      <div className="flex flex-col gap-3">
        <div className="h-3 w-24 animate-pulse rounded bg-gray-200" />
        <div className="h-8 w-3/4 animate-pulse rounded bg-gray-200" />
        <div className="h-7 w-32 animate-pulse rounded bg-gray-200" />
        <div className="mt-4 h-4 w-full animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
        <div className="mt-4 h-10 w-36 animate-pulse rounded-lg bg-gray-200" />
      </div>
    </div>
  );
}

export default ProductPageSkeleton;