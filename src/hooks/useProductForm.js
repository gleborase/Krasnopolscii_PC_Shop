import { useReducer } from "react";
import {
  initialProductValues,
  validateProduct,
} from "../utils/validateProduct";

export const initialProductForm = {
  values: initialProductValues,
  touched: {},
  submitted: false,
};

export function productFormReducer(state, action) {
  switch (action.type) {
    case "change":
      return {
        ...state,
        values: { ...state.values, [action.field]: action.value },
      };
    case "blur":
      return {
        ...state,
        touched: { ...state.touched, [action.field]: true },
      };
    case "submit":
      return { ...state, submitted: true };
    case "reset":
      return initialProductForm;
    default:
      return state;
  }
}

export function useProductForm() {
  const [state, dispatch] = useReducer(productFormReducer, initialProductForm);
  const errors = validateProduct(state.values);

  function getError(field) {
    return state.submitted || state.touched[field]
      ? errors[field]
      : undefined;
  }

  return {
    values: state.values,
    errors,
    isValid: Object.keys(errors).length === 0,
    getError,
    dispatch,
  };
}
