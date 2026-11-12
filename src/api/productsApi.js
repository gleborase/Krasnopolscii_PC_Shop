import { products as catalog } from "../data/products";

const API_URL = "https://jsonplaceholder.typicode.com";
const TIMEOUT_MS = 8000;

export class ApiError extends Error {
  constructor(status) {
    super(`Ошибка HTTP: ${status}`);
    this.name = "ApiError";
    this.status = status;
  }
}

async function request(path, signal) {
  const signals = [AbortSignal.timeout(TIMEOUT_MS)];
  if (signal) signals.push(signal);

  const response = await fetch(`${API_URL}${path}`, {
    signal: AbortSignal.any(signals),
  });

  if (!response.ok) {
    throw new ApiError(response.status);
  }

  return response.json();
}

function toProduct(post) {
  const item = catalog[(post.id - 1) % catalog.length];

  return {
    ...item,
    id: post.id,
    path: `/products/${post.id}`,
  };
}

export async function fetchProducts(signal) {
  const posts = await request(`/posts?_limit=${catalog.length}`, signal);
  return posts.map(toProduct);
}

export async function fetchProductById(id, signal) {
  const post = await request(`/posts/${encodeURIComponent(id)}`, signal);
  return { ...toProduct(post), description: post.body };
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