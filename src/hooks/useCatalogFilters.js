import { useReducer } from "react";

export const initialFilters = {
  categories: [],
  brands: [],
  minPrice: "",
  maxPrice: "",
  inStockOnly: false,
  popularOnly: false,
  sortType: "default",
};

function toggle(list, value) {
  return list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value];
}

export function filtersReducer(state, action) {
  switch (action.type) {
    case "toggleCategory":
      return { ...state, categories: toggle(state.categories, action.value) };
    case "toggleBrand":
      return { ...state, brands: toggle(state.brands, action.value) };
    case "setMinPrice":
      return { ...state, minPrice: action.value };
    case "setMaxPrice":
      return { ...state, maxPrice: action.value };
    case "setInStockOnly":
      return { ...state, inStockOnly: action.value };
    case "setPopularOnly":
      return { ...state, popularOnly: action.value };
    case "setSortType":
      return { ...state, sortType: action.value };
    case "reset":
      return initialFilters;
    default:
      return state;
  }
}

export function getActiveCount(filters) {
  return (
    filters.categories.length +
    filters.brands.length +
    (filters.minPrice !== "" ? 1 : 0) +
    (filters.maxPrice !== "" ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0) +
    (filters.popularOnly ? 1 : 0)
  );
}

export function useCatalogFilters() {
  const [filters, dispatch] = useReducer(filtersReducer, initialFilters);

  return { filters, dispatch, activeCount: getActiveCount(filters) };
}