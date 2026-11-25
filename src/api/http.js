const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:3001"
).replace(/\/+$/, "");
const TIMEOUT_MS = 8000;

export class ApiError extends Error {
  constructor(status) {
    super(`Ошибка HTTP: ${status}`);
    this.name = "ApiError";
    this.status = status;
  }
}

export async function request(path, options = {}) {
  const { signal, headers, ...rest } = options;

  const signals = [AbortSignal.timeout(TIMEOUT_MS)];
  if (signal) signals.push(signal);

  const response = await fetch(`${API_URL}${path}`, {
    ...rest,
    headers: { "Content-Type": "application/json", ...headers },
    signal: AbortSignal.any(signals),
  });

  if (!response.ok) {
    throw new ApiError(response.status);
  }

  return response.json();
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

  return "Не удалось подключиться к серверу. Запустите json-server командой npm run api.";
}