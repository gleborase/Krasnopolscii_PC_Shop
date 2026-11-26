import { getOrderStatus } from "../../../utils/filterOrders";

const STATUS_STYLES = {
  "Выполнен": "bg-emerald-500/15 text-emerald-400",
  "В обработке": "bg-amber-500/15 text-amber-400",
  "Ожидает оплаты": "bg-orange-500/15 text-orange-300",
};

const COLUMNS = ["Номер заказа", "Покупатель", "Дата", "Сумма", "Статус"];

function formatAmount(amount) {
  const value = Number(amount);

  return Number.isFinite(value) ? `${value.toLocaleString("ru-RU")} ₽` : "—";
}

function OrdersTable({ orders, hasOrders, onReset }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px] text-left text-sm">
          <caption className="sr-only">
            Список заказов с основными сведениями
          </caption>
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              {COLUMNS.map((column) => (
                <th key={column} scope="col" className="px-5 py-4">
                  {column}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {orders.length === 0 ? (
              <tr>
                <td
                  colSpan={COLUMNS.length}
                  className="px-5 py-10 text-center text-gray-500"
                >
                  {hasOrders ? (
                    <>
                      <p>По вашему запросу заказов не найдено.</p>
                      <button
                        type="button"
                        onClick={onReset}
                        className="mt-3 rounded-lg bg-emerald-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-800"
                      >
                        Сбросить фильтры
                      </button>
                    </>
                  ) : (
                    "Заказов пока нет."
                  )}
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="text-gray-700 hover:bg-gray-50">
                  <td className="px-5 py-4 font-semibold text-gray-900">
                    {order.id ?? "—"}
                  </td>
                  <td className="px-5 py-4">{order.customer || "—"}</td>
                  <td className="px-5 py-4">{order.date || "—"}</td>
                  <td className="px-5 py-4 font-medium">
                    {formatAmount(order.amount)}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        STATUS_STYLES[order.status] ??
                        "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {getOrderStatus(order)}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrdersTable;