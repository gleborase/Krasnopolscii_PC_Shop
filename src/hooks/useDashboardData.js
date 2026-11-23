import { useProducts } from "./useProducts";
import { useCategories } from "./useCategories";
import { useCustomers, useOrders } from "./useAdminContent";

export function useDashboardData() {
  const products = useProducts();
  const categories = useCategories();
  const orders = useOrders();
  const customers = useCustomers();

  const sources = [products, categories, orders, customers];
  const isLoading = sources.some((source) => source.isLoading);
  const error = sources.find((source) => source.error)?.error ?? null;

  function refetch() {
    sources.forEach((source) => {
      if (source.error) source.refetch();
    });
  }

  return {
    products: products.products,
    categories: categories.categories,
    orders: orders.data ?? [],
    customers: customers.data ?? [],
    isLoading,
    error,
    refetch,
  };
}
