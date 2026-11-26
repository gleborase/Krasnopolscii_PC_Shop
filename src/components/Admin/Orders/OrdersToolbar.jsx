import { Search, X } from "lucide-react";

function OrdersToolbar({
  query,
  status,
  statusOptions,
  foundCount,
  totalCount,
  activeCount,
  onQueryChange,
  onStatusChange,
  onReset,
}) {
  return (
    <div className="space-y-3 rounded-2xl border border-gray-200 bg-white p-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-500" />
          <input
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Поиск по номеру, покупателю, дате"
            aria-label="Поиск заказов"
            className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:border-gray-400"
          />
        </div>

        {activeCount > 0 && (
          <button
            type="button"
            onClick={onReset}
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-50"
          >
            <X className="size-4" />
            Сбросить
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Статус заказа">
        {statusOptions.map((option) => {
          const isActive = option.value === status;

          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={isActive}
              onClick={() => onStatusChange(option.value)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                isActive
                  ? "border-emerald-900 bg-emerald-900 text-white"
                  : "border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {option.label} · {option.count}
            </button>
          );
        })}
      </div>

      <p className="text-xs text-gray-500">
        Найдено заказов: {foundCount} из {totalCount}
      </p>
    </div>
  );
}

export default OrdersToolbar;