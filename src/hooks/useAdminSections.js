import { useEffect, useState } from "react";
import { fetchAdminSections } from "../api/adminSectionsApi";
import { getErrorMessage } from "../api/http";

export function useAdminSections() {
  const [sections, setSections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const data = await fetchAdminSections(controller.signal);
        setSections(data);
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

  return { sections, isLoading, error, refetch };
}