function Brand({ name }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-900 text-sm font-semibold text-white">
        В
      </div>

      <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-900">
        {name}
      </span>
    </div>
  );
}

export default Brand;
