import ErrorMessage from "../../components/UI/ErrorMessage";
import { useOrders } from "../../hooks/useAdminContent";

const STATUS_STYLES = {
  Выполнен: "bg-emerald-500/15 text-emerald-400",
  "В обработке": "bg-amber-500/15 text-amber-400",
  "Ожидает оплаты": "bg-orange-500/15 text-orange-300",
};

function formatAmount(amount) {
  const value = Number(amount);

  return Number.isFinite(value) ? `${value.toLocaleString("ru-RU")} ₽` : "—";
}

function AdminOrders() {
  const { data: orders, isLoading, error, refetch } = useOrders();
  const list = orders ?? [];
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

          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[650px] text-left text-sm">
                <caption className="sr-only">
                  Список заказов с основными сведениями
                </caption>
                <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                  <tr>
                    <th scope="col" className="px-5 py-4">
                      Номер заказа
                    </th>
                    <th scope="col" className="px-5 py-4">
                      Покупатель
                    </th>
                    <th scope="col" className="px-5 py-4">
                      Дата
                    </th>
                    <th scope="col" className="px-5 py-4">
                      Сумма
                    </th>
                    <th scope="col" className="px-5 py-4">
                      Статус
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {list.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-5 py-10 text-center text-gray-500"
                      >
                        Заказов пока нет.
                      </td>
                    </tr>
                  ) : (
                    list.map((order) => (
                      <tr
                        key={order.id}
                        className="text-gray-700 hover:bg-gray-50"
                      >
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
                            {order.status || "Без статуса"}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default AdminOrders;
