import { useEffect, useState } from "react";
import { fetchProductById, getErrorMessage } from "../api/productsApi";

const initialResult = { id: null, product: null, error: null, status: null };

export function useProduct(id) {
  const [result, setResult] = useState(initialResult);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const product = await fetchProductById(id, controller.signal);
        setResult({ id, product, error: null, status: null });
      } catch (err) {
        if (err.name !== "AbortError") {
          setResult({
            id,
            product: null,
            error: getErrorMessage(err),
            status: err.status ?? null,
          });
        }
      }
    }

    load();

    return () => controller.abort();
  }, [id, attempt]);

  function refetch() {
    setResult(initialResult);
    setAttempt((value) => value + 1);
  }

  const isLoading = result.id !== id;

  return {
    product: isLoading ? null : result.product,
    error: isLoading ? null : result.error,
    isNotFound: !isLoading && result.status === 404,
    isLoading,
    refetch,
  };
}