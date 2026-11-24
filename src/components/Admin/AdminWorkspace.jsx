
import ErrorMessage from "../UI/ErrorMessage";
import StatCard from "./Dashboard/StatCard";
import RecentOrders from "./Dashboard/RecentOrders";
import OrdersChart from "./Dashboard/OrdersChart";
import CategoryChart from "./Dashboard/CategoryChart";

import { useDashboardData } from "../../hooks/useDashboardData";
import { getDashboardStats } from "../../utils/dashboardStats";

function AdminWorkspace() {
  const {
    products,
    categories,
    orders,
    customers,
    isLoading,
    error,
    refetch,
  } = useDashboardData();

  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} />;
  }

  const stats = getDashboardStats({
    products,
    categories,
    orders,
    customers,
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-gray-900">
          Добро пожаловать!
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Сводка по интернет-магазину PC Shop. Показатели рассчитываются по
          данным сервера; заказы и покупатели — демонстрационные.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {isLoading
          ? Array.from({ length: 4 }, (_, index) => (
              <div
                key={index}
                className="h-36 animate-pulse rounded-2xl bg-gray-200"
              />
            ))
          : stats.map((item) => (
              <StatCard key={item.label} {...item} />
            ))}
      </div>

      {isLoading ? (
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="h-80 animate-pulse rounded-2xl bg-gray-200" />
          <div className="h-80 animate-pulse rounded-2xl bg-gray-200" />
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          <OrdersChart orders={orders} />

          <CategoryChart
            categories={categories}
            products={products}
          />
        </div>
      )}

      {isLoading ? (
        <div className="h-64 animate-pulse rounded-2xl bg-gray-200" />
      ) : (
        <RecentOrders orders={orders} />
      )}
    </div>
  );
}

export default AdminWorkspace;
