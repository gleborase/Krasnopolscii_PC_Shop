function ProductCounter({ count }) {
  return (
    <div className="absolute -bottom-4 left-5 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
      <p className="text-xs text-gray-500">Товаров в каталоге</p>

      <span className="mt-1 block text-xl font-medium text-gray-900">
        {count}
      </span>
    </div>
  );
}

export default ProductCounter;
