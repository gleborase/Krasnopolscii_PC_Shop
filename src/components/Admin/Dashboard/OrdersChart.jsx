
function OrdersChart({ orders }) {
  const groupedOrders = orders.reduce((result, order) => {
    const date = order.date;

    if (!result[date]) {
      result[date] = 0;
    }

    result[date] += Number(order.amount) || 0;

    return result;
  }, {});

  const chartData = Object.entries(groupedOrders).map(
    ([date, amount]) => ({ date, amount })
  );

  const maxAmount = Math.max(
    ...chartData.map((item) => item.amount),
    1
  );

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-6">
        <h3 className="font-bold text-gray-900">
          Сумма заказов по датам
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Распределение стоимости заказов
        </p>
      </div>

      {chartData.length === 0 ? (
        <p className="py-10 text-center text-sm text-gray-500">
          Нет данных для отображения
        </p>
      ) : (
        <div className="flex h-52 items-end justify-around gap-4 border-b border-gray-200 px-2">
          {chartData.map((item) => {
            const height = (item.amount / maxAmount) * 100;

            return (
              <div
                key={item.date}
                className="flex h-full flex-1 flex-col items-center justify-end gap-2"
              >
                <span className="text-xs font-medium text-gray-700">
                  {item.amount.toLocaleString("ru-RU")} ₽
                </span>

                <div
                  className="w-full max-w-20 rounded-t-lg bg-emerald-800 transition-all"
                  style={{ height: `${height}%` }}
                  title={`${item.date}: ${item.amount.toLocaleString("ru-RU")} ₽`}
                />

                <span className="text-xs text-gray-500">
                  {item.date}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default OrdersChart;
