import { useReducer } from "react";
import { ALL_STATUSES } from "../utils/filterOrders";

export const initialOrderFilters = {
  query: "",
  status: ALL_STATUSES,
};

export function orderFiltersReducer(state, action) {
  switch (action.type) {
    case "setQuery":
      return { ...state, query: action.value };
    case "setStatus":
      return { ...state, status: action.value };
    case "reset":
      return initialOrderFilters;
    default:
      return state;
  }
}

export function getActiveCount(filters) {
  return (
    (filters.query.trim() !== "" ? 1 : 0) +
    (filters.status !== ALL_STATUSES ? 1 : 0)
  );
}

export function useOrderFilters() {
  const [filters, dispatch] = useReducer(
    orderFiltersReducer,
    initialOrderFilters,
  );

  return { filters, dispatch, activeCount: getActiveCount(filters) };
}