import { useEffect, useState } from "react";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../api/categoriesApi";
import { getErrorMessage } from "../api/http";  

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const data = await getCategories(controller.signal);
        setCategories(data);
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

  async function addCategory(name) {
    const created = await createCategory({ name, count: 0 });
    setCategories((prev) => [...prev, created]);
  }

  async function renameCategory(id, name) {
    const updated = await updateCategory(id, { name });
    setCategories((prev) =>
      prev.map((category) => (category.id === id ? updated : category)),
    );
  }

  async function removeCategory(id) {
    await deleteCategory(id);
    setCategories((prev) => prev.filter((category) => category.id !== id));
  }

  return {
    categories,
    isLoading,
    error,
    refetch,
    addCategory,
    renameCategory,
    removeCategory,
  };
}
