function StatCard({ label, value, hint, icon: Icon }) {
  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">{label}</p>

        <span className="rounded-xl bg-emerald-900/15 p-2.5 text-emerald-900">
          <Icon size={20} />
        </span>
      </div>

      <p className="mt-4 text-2xl font-bold text-gray-900">{value}</p>

      <p className="mt-2 text-xs text-gray-500">{hint}</p>
    </article>
  );
}

export default StatCard;
