import { useEffect, useState } from "react";
import {
  deleteProduct as deleteProductRequest,
  fetchProducts,
} from "../api/productsApi";
import { getErrorMessage } from "../api/http";

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
          setError(getErrorMessage(err));
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

  async function removeProduct(id) {
    await deleteProductRequest(id);
    setProducts((currentProducts) =>
      currentProducts.filter((product) => product.id !== Number(id)),
    );
  }

  return { products, isLoading, error, refetch, removeProduct };
}