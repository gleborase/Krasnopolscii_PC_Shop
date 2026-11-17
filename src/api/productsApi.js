import { products as catalog } from "../data/products";

export class ApiError extends Error {
  constructor(status) {
    super(`Ошибка HTTP: ${status}`);
    this.name = "ApiError";
    this.status = status;
  }
}

function toProduct(item) {
  return {
    ...item,
    id: Number(item.id),
    path: `/products/${item.id}`,
    description:
      item.description ??
      "Комплектующее с проверенными характеристиками и совместимостью для вашей сборки.",
  };
}

export async function fetchProducts(signal) {
  void signal;
  return catalog.map((item) => toProduct(item));
}

export async function fetchProductById(id, signal) {
  void signal;

  const product = catalog.find((item) => String(item.id) === String(id));

  if (!product) {
    throw new ApiError(404);
  }

  return toProduct(product);
}

export function getErrorMessage(err) {
  if (err.name === "TimeoutError") {
    return "Сервер отвечает слишком долго. Попробуйте ещё раз.";
  }

  if (err instanceof ApiError) {
    if (err.status === 404) return "Запрошенные данные не найдены (404).";
    if (err.status >= 500) {
      return `Ошибка на стороне сервера (${err.status}). Попробуйте позже.`;
    }
    return `Сервер отклонил запрос (${err.status}).`;
  }

  return "Нет соединения с сервером. Проверьте интернет.";
}