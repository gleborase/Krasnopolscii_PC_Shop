import { X } from "lucide-react";
import { getCategoryName } from "../../utils/productCategories";

function ActiveFilters({ filters, dispatch, onReset, categories }) {
  const chips = [
    ...filters.categories.map((value) => ({
      key: `category-${value}`,
      label: getCategoryName(value, categories),
      action: { type: "toggleCategory", value },
    })),
    ...filters.brands.map((value) => ({
      key: `brand-${value}`,
      label: value,
      action: { type: "toggleBrand", value },
    })),
  ];

  if (filters.minPrice !== "") {
    chips.push({
      key: "min",
      label: `от ${filters.minPrice} ₽`,
      action: { type: "setMinPrice", value: "" },
    });
  }

  if (filters.maxPrice !== "") {
    chips.push({
      key: "max",
      label: `до ${filters.maxPrice} ₽`,
      action: { type: "setMaxPrice", value: "" },
    });
  }

  if (filters.inStockOnly) {
    chips.push({
      key: "stock",
      label: "В наличии",
      action: { type: "setInStockOnly", value: false },
    });
  }

  if (filters.popularOnly) {
    chips.push({
      key: "popular",
      label: "Популярные",
      action: { type: "setPopularOnly", value: false },
    });
  }

  if (chips.length === 0) return null;

  return (
    <div className="mb-4 flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <button
          key={chip.key}
          type="button"
          onClick={() => dispatch(chip.action)}
          aria-label={`Убрать фильтр: ${chip.label}`}
          className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-700 transition-colors hover:bg-gray-100"
        >
          {chip.label}
          <X className="size-3" />
        </button>
      ))}

      <button
        type="button"
        onClick={onReset}
        className="px-2 py-1 text-xs text-gray-500 hover:text-gray-900"
      >
        Сбросить всё
      </button>
    </div>
  );
}

export default ActiveFilters;