import FilterGroup from "./FilterGroup";

const categories = ["Видеокарты", "Процессоры", "Оперативная память", "Блоки питания", "Накопители"];

function FiltersPanel() {
  return (
    <aside className="h-fit rounded-xl border border-gray-200 bg-white p-5">
      <h2 className="text-lg font-medium text-gray-900">Фильтры</h2>

      <FilterGroup title="Категория">
        {categories.map((name) => (
          <label key={name} className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" className="size-4 accent-emerald-900" />
            {name}
          </label>
        ))}
      </FilterGroup>

      <FilterGroup title="Цена, ₽">
        <div className="flex items-center gap-2">
          <input type="number" placeholder="от" className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus:border-gray-400" />
          <input type="number" placeholder="до" className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus:border-gray-400" />
        </div>
      </FilterGroup>

      <button type="button" className="mt-4 w-full rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100">
        Сбросить
      </button>
    </aside>
  );
}

export default FiltersPanel;