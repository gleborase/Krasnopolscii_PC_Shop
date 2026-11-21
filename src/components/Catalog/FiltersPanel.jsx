import FilterGroup from "./FilterGroup";

function CheckboxRow({ label, count, checked, onChange }) {
  return (
    <label className="flex items-center gap-2 text-sm text-gray-700">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="size-4 accent-emerald-900"
      />
      <span className="flex-1">{label}</span>
      {count !== undefined && (
        <span className="text-xs text-gray-500">{count}</span>
      )}
    </label>
  );
}

function FiltersPanel({
  filters,
  dispatch,
  brands,
  counts,
  activeCount,
  onReset,
  categories = [],
}) {
  const showCounts = brands.length > 0;

  return (
    <aside className="h-fit rounded-xl border border-gray-200 bg-white p-5">
      <h2 className="text-lg font-medium text-gray-900">
        Фильтры{activeCount > 0 && ` (${activeCount})`}
      </h2>

      <FilterGroup title="Категория">
        {categories.map((name) => (
          <CheckboxRow
            key={name}
            label={name}
            count={showCounts ? (counts[name] ?? 0) : undefined}
            checked={filters.categories.includes(name)}
            onChange={() => dispatch({ type: "toggleCategory", value: name })}
          />
        ))}
      </FilterGroup>

      {brands.length > 0 && (
        <FilterGroup title="Производитель">
          {brands.map((name) => (
            <CheckboxRow
              key={name}
              label={name}
              count={counts[name] ?? 0}
              checked={filters.brands.includes(name)}
              onChange={() => dispatch({ type: "toggleBrand", value: name })}
            />
          ))}
        </FilterGroup>
      )}

      <FilterGroup title="Цена, ₽">
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="0"
            value={filters.minPrice}
            onChange={(event) =>
              dispatch({ type: "setMinPrice", value: event.target.value })
            }
            placeholder="от"
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus:border-gray-400"
          />
          <input
            type="number"
            min="0"
            value={filters.maxPrice}
            onChange={(event) =>
              dispatch({ type: "setMaxPrice", value: event.target.value })
            }
            placeholder="до"
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus:border-gray-400"
          />
        </div>
      </FilterGroup>

      <FilterGroup title="Дополнительно">
        <CheckboxRow
          label="Только в наличии"
          checked={filters.inStockOnly}
          onChange={(event) =>
            dispatch({ type: "setInStockOnly", value: event.target.checked })
          }
        />
        <CheckboxRow
          label="Только популярные"
          checked={filters.popularOnly}
          onChange={(event) =>
            dispatch({ type: "setPopularOnly", value: event.target.checked })
          }
        />
      </FilterGroup>

      <button
        type="button"
        onClick={onReset}
        className="mt-4 w-full rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100"
      >
        Сбросить
      </button>
    </aside>
  );
}

export default FiltersPanel;
