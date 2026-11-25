import { Link } from "react-router-dom";
import { getRecentOrders } from "../../../utils/dashboardDetails";

const statusStyles = {
  "Выполнен": "bg-emerald-500/15 text-emerald-400",
  "В обработке": "bg-amber-500/15 text-amber-400",
  "Ожидает оплаты": "bg-gray-100 text-gray-700",
};

function RecentOrders({ orders }) {
  const recentOrders = getRecentOrders(orders);

  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="flex flex-col gap-2 border-b border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <h3 className="font-bold text-gray-900">Последние заказы</h3>
          <p className="mt-1 text-xs text-gray-500">
            Недавние операции интернет-магазина
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-600">
            Показано {recentOrders.length} из {orders.length}
          </span>
          <Link
            to="/admin/orders"
            className="text-sm font-semibold text-emerald-800 hover:text-emerald-900"
          >
            Все заказы
          </Link>
        </div>
      </div>

      {recentOrders.length === 0 ? (
        <p className="px-6 py-10 text-center text-sm text-gray-500">
          Заказов пока нет.
        </p>
      ) : (
        <ul className="divide-y divide-gray-100">
          {recentOrders.map((order) => (
            <li
              key={order.id}
              className="flex min-w-0 flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:px-6"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-emerald-900/10 text-sm font-bold text-emerald-900">
                {(order.customer || "?").trim().charAt(0).toUpperCase()}
              </span>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-gray-900">
                  {order.customer || "Покупатель не указан"}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  {order.id} · {order.date || "Дата не указана"}
                </p>
              </div>

              <div className="flex items-center justify-between gap-3 sm:justify-end">
                <span className="text-sm font-semibold text-gray-900">
                  {(Number(order.amount) || 0).toLocaleString("ru-RU")} ₽
                </span>
                <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                    statusStyles[order.status] ?? "bg-gray-100 text-gray-600"
                  }`}
                >
                  {order.status || "Без статуса"}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default RecentOrders;
