const statusStyles = {
  "Выполнен": "bg-emerald-500/15 text-emerald-400",
  "В обработке": "bg-amber-500/15 text-amber-400",
  "Ожидает оплаты": "bg-gray-100 text-gray-700",
};

function RecentOrders({ orders }) {
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
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                      statusStyles[order.status] ?? statusStyles["Ожидает оплаты"]
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}

            {orders.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                  Заказов пока нет.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default RecentOrders;
