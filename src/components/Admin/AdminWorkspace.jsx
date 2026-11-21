import {
  ArrowDownRight,
  ArrowUpRight,
  CreditCard,
  Package,
  ShoppingBag,
  Users,
} from "lucide-react";
import ErrorMessage from "../UI/ErrorMessage";
import { useOrders, useStatistics } from "../../hooks/useAdminContent";

const statisticIcons = { CreditCard, Package, ShoppingBag, Users };

const statusStyles = {
  "Выполнен": "bg-emerald-500/15 text-emerald-400",
  "В обработке": "bg-amber-500/15 text-amber-400",
  "Ожидает оплаты": "bg-gray-100 text-gray-700",
};

function StatCard({ label, value, change, icon: Icon, positive }) {
  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">{label}</p>

        <span className="rounded-xl bg-emerald-900/15 p-2.5 text-emerald-900">
          <Icon size={20} />
        </span>
      </div>

      <p className="mt-4 text-2xl font-bold text-gray-900">{value}</p>

      <p
        className={`mt-2 flex items-center gap-1 text-xs font-medium ${
          positive ? "text-emerald-400" : "text-red-400"
        }`}
      >
        {positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        {change}
        <span className="font-normal text-gray-500">за месяц</span>
      </p>
    </article>
  );
}

function OrdersTable({ orders }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="flex flex-col gap-2 border-b border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <h3 className="font-bold text-gray-900">Последние заказы</h3>
          <p className="mt-1 text-xs text-gray-500">
            Недавние операции интернет-магазина
          </p>
        </div>

        <span className="w-fit rounded-lg bg-emerald-900/15 px-3 py-1.5 text-xs font-semibold text-emerald-900">
          Всего: {orders.length}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px] text-left text-sm">
          <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
            <tr>
              <th className="px-6 py-3 font-semibold">Заказ</th>
              <th className="px-6 py-3 font-semibold">Покупатель</th>
              <th className="px-6 py-3 font-semibold">Дата</th>
              <th className="px-6 py-3 font-semibold">Сумма</th>
              <th className="px-6 py-3 font-semibold">Статус</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="text-gray-700 hover:bg-gray-50">
                <td className="px-6 py-4 font-semibold text-gray-900">{order.id}</td>
                <td className="px-6 py-4">{order.customer}</td>
                <td className="px-6 py-4">{order.date}</td>
                <td className="px-6 py-4 font-medium">
                  {Number(order.amount).toLocaleString("ru-RU")} ₽
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[order.status]}`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function AdminWorkspace() {
  const { data: statistics, isLoading: isStatisticsLoading, error: statisticsError, refetch: refetchStatistics } = useStatistics();
  const { data: orders, isLoading: isOrdersLoading, error: ordersError, refetch: refetchOrders } = useOrders();

  if (statisticsError) {
    return <ErrorMessage message={statisticsError} onRetry={refetchStatistics} />;
  }

  if (ordersError) {
    return <ErrorMessage message={ordersError} onRetry={refetchOrders} />;
  }

  const list = statistics ?? [];
  const orderList = orders ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-gray-900">Добро пожаловать!</h2>
        <p className="mt-1 text-sm text-gray-500">
          Краткая информация о работе интернет-магазина PC Shop. Показатели и
          заказы представлены как демонстрационные данные.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {isStatisticsLoading ? (
          <p className="text-sm text-gray-500">Загрузка показателей...</p>
        ) : list.map((item) => (
          <StatCard
            key={item.label}
            {...item}
            icon={statisticIcons[item.icon] ?? Package}
          />
        ))}
      </div>

      {isOrdersLoading ? (
        <p className="text-sm text-gray-500">Загрузка заказов...</p>
      ) : (
        <OrdersTable orders={orderList} />
      )}
    </div>
  );
}

export default AdminWorkspace;