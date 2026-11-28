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

function createProductFormState(values = initialProductValues) {
  return {
    values: { ...initialProductValues, ...values },
    touched: {},
    submitted: false,
  };
}

export function productFormReducer(state, action) {
  switch (action.type) {
    case "change":
      return {
        ...state,
        values: { ...state.values, [action.field]: action.value },
      };
    case "setImage":
      return {
        ...state,
        values: {
          ...state.values,
          image: action.image,
          imageName: action.imageName,
        },
        touched: { ...state.touched, image: true },
      };
    case "clearImage":
      return {
        ...state,
        values: { ...state.values, image: "", imageName: "" },
      };
    case "blur":
      return {
        ...state,
        touched: { ...state.touched, [action.field]: true },
      };
    case "submit":
      return { ...state, submitted: true };
    case "reset":
      return createProductFormState(action.values);
    default:
      return state;
  }
}

export function useProductForm({
  initialValues = initialProductValues,
  requireImage = true,
} = {}) {
  const [state, dispatch] = useReducer(
    productFormReducer,
    initialValues,
    createProductFormState,
  );
  const errors = validateProduct(state.values, { requireImage });

  function getError(field) {
    return state.submitted || state.touched[field]
      ? errors[field]
      : undefined;
  }

  function reset() {
    dispatch({ type: "reset", values: initialValues });
  }

  return {
    values: state.values,
    errors,
    isValid: Object.keys(errors).length === 0,
    getError,
    dispatch,
    reset,
  };
}
