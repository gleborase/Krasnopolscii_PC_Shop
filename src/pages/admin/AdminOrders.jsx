import ErrorMessage from "../../components/UI/ErrorMessage";
import { useOrders } from "../../hooks/useAdminContent";

function AdminOrders() {
  const { data: orders, isLoading, error, refetch } = useOrders();
  const list = orders ?? [];

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
          <p className="mt-2 text-2xl font-bold text-emerald-700">
            {list.filter((order) => order.status === "Выполнен").length}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">В обработке</p>
          <p className="mt-2 text-2xl font-bold text-amber-600">
            {list.filter((order) => order.status !== "Выполнен").length}
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-5 py-4">Номер заказа</th>
                <th className="px-5 py-4">Покупатель</th>
                <th className="px-5 py-4">Дата</th>
                <th className="px-5 py-4">Сумма</th>
                <th className="px-5 py-4">Статус</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {list.map((order) => (
                <tr key={order.id} className="text-gray-700 hover:bg-gray-50">
                  <td className="px-5 py-4 font-semibold text-gray-900">
                    {order.id}
                  </td>

                  <td className="px-5 py-4">{order.customer}</td>
                  <td className="px-5 py-4">{order.date}</td>

                  <td className="px-5 py-4 font-medium">
                    {order.amount.toLocaleString("ru-RU")} ₽
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        order.status === "Выполнен"
                          ? "bg-emerald-500/15 text-emerald-700"
                          : order.status === "В обработке"
                            ? "bg-amber-500/15 text-amber-700"
                            : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
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
