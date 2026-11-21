import { useEffect, useState } from "react";
import {
  fetchCustomers,
  fetchOrders,
  fetchSettings,
  fetchSiteData,
  fetchStatistics,
} from "../api/adminContentApi";
import { getErrorMessage } from "../api/http";

export function useApiResource(loader) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        setData(await loader(controller.signal));
      } catch (err) {
        if (err.name !== "AbortError") setError(getErrorMessage(err));
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, [loader, attempt]);

  function refetch() {
    setIsLoading(true);
    setError(null);
    setAttempt((value) => value + 1);
  }

  return { data, isLoading, error, refetch };
}

export function useSiteData() {
  return useApiResource(fetchSiteData);
}

export function useOrders() {
  return useApiResource(fetchOrders);
}

export function useStatistics() {
  return useApiResource(fetchStatistics);
}

export function useCustomers() {
  return useApiResource(fetchCustomers);
}

export function useSettings() {
  return useApiResource(fetchSettings);
}
