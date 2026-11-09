function FilterGroup({ title, children }) {
  return (
    <div className="border-b border-gray-200 py-4 last:border-b-0 last:pb-0">
      <h3 className="text-xs uppercase tracking-[0.15em] text-gray-500">{title}</h3>
      <div className="mt-3 space-y-2">{children}</div>
    </div>
  );
}

export default FilterGroup;