import { getOrderStatus } from "../../../utils/filterOrders";
import {
  STATUS_STYLES,
  getStatusChoices,
} from "../../../utils/orderStatuses";

const COLUMNS = [
  "Номер заказа",
  "Покупатель",
  "Дата",
  "Сумма",
  "Статус",
  "Изменить статус",
];

function formatAmount(amount) {
  const value = Number(amount);

  return Number.isFinite(value) ? `${value.toLocaleString("ru-RU")} ₽` : "—";
}

function OrdersTable({
  orders,
  hasOrders,
  pendingIds,
  onStatusChange,
  onReset,
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
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
              orders.map((order) => {
                const isPending = pendingIds.includes(order.id);

                return (
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
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <select
                          value={getOrderStatus(order)}
                          disabled={isPending}
                          onChange={(event) =>
                            onStatusChange(order, event.target.value)
                          }
                          aria-label={`Статус заказа ${order.id}`}
                          className="rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-sm text-gray-800 outline-none focus:border-gray-400 disabled:cursor-wait disabled:opacity-50"
                        >
                          {getStatusChoices(order).map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                        {isPending && (
                          <span className="text-xs text-gray-500">
                            Сохранение…
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrdersTable;