import { useMemo } from "react";
import OrdersTable from "../../components/Admin/Orders/OrdersTable";
import OrdersToolbar from "../../components/Admin/Orders/OrdersToolbar";
import ErrorMessage from "../../components/UI/ErrorMessage";
import { useOrderFilters } from "../../hooks/useOrderFilters";
import { useAdminOrders } from "../../hooks/useAdminOrders";
import { sortOrdersNewestFirst } from "../../utils/dashboardDetails";
import { filterOrders, getStatusOptions } from "../../utils/filterOrders";

function AdminOrders() {
  const {
    orders,
    isLoading,
    error,
    refetch,
    pendingIds,
    notice,
    actionError,
    updateStatus,
    clearMessages,
  } = useAdminOrders();
  const { filters, dispatch, activeCount } = useOrderFilters();

  const list = useMemo(() => sortOrdersNewestFirst(orders ?? []), [orders]);
  const visibleOrders = useMemo(
    () => filterOrders(list, filters),
    [list, filters],
  );
  const statusOptions = useMemo(() => getStatusOptions(list), [list]);
  const completedCount = list.filter(
    (order) => order.status === "Выполнен",
  ).length;

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">
          Управление заказами
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Список заказов интернет-магазина PC Shop
        </p>
      </div>

      {isLoading ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-sm text-gray-500">
          Загрузка заказов...
        </div>
      ) : error ? (
        <ErrorMessage message={error} onRetry={refetch} />
      ) : (
        <>
          {notice && (
            <div
              role="status"
              className="flex items-start justify-between gap-4 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400"
            >
              <span>{notice}</span>
              <button
                type="button"
                onClick={clearMessages}
                className="shrink-0 text-xs underline underline-offset-2"
              >
                Закрыть
              </button>
            </div>
          )}

          {actionError && (
            <div
              role="alert"
              className="flex items-start justify-between gap-4 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-400"
            >
              <span>{actionError}</span>
              <button
                type="button"
                onClick={clearMessages}
                className="shrink-0 text-xs underline underline-offset-2"
              >
                Закрыть
              </button>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <p className="text-sm text-gray-500">Всего заказов</p>
              <p className="mt-2 text-2xl font-bold text-gray-900">
                {list.length}
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <p className="text-sm text-gray-500">Выполнено</p>
              <p className="mt-2 text-2xl font-bold text-emerald-400">
                {completedCount}
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <p className="text-sm text-gray-500">Не завершено</p>
              <p className="mt-2 text-2xl font-bold text-amber-400">
                {list.length - completedCount}
              </p>
            </div>
          </div>

          {list.length > 0 && (
            <OrdersToolbar
              query={filters.query}
              status={filters.status}
              statusOptions={statusOptions}
              foundCount={visibleOrders.length}
              totalCount={list.length}
              activeCount={activeCount}
              onQueryChange={(value) => dispatch({ type: "setQuery", value })}
              onStatusChange={(value) => dispatch({ type: "setStatus", value })}
              onReset={() => dispatch({ type: "reset" })}
            />
          )}

          <OrdersTable
            orders={visibleOrders}
            hasOrders={list.length > 0}
            pendingIds={pendingIds}
            onStatusChange={updateStatus}
            onReset={() => dispatch({ type: "reset" })}
          />
        </>
      )}
    </section>
  );
}

export default AdminOrders;