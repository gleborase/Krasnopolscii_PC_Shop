import { useEffect, useState } from "react";
import { fetchProducts } from "../api/productsApi";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const data = await fetchProducts(controller.signal);
        setProducts(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Не удалось загрузить товары. Проверьте соединение.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    load();

    return () => controller.abort();
  }, [attempt]);

  function refetch() {
    setIsLoading(true);
    setError(null);
    setAttempt((value) => value + 1);
  }

  return { products, isLoading, error, refetch };
}