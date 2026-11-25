import { getAmountByDate } from "../../../utils/dashboardDetails";

function OrdersChart({ orders }) {
  const chartData = getAmountByDate(orders);

  const maxAmount = Math.max(
    ...chartData.map((item) => item.amount),
    1
  );

  return (
    <section className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-6">
        <h3 className="font-bold text-gray-900">
          Сумма заказов по датам
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Распределение стоимости заказов
        </p>
      </div>

      {chartData.length === 0 ? (
        <p className="flex flex-1 items-center justify-center text-center text-sm text-gray-500">
          Нет данных для отображения
        </p>
      ) : (
        <div className="flex min-h-52 flex-1 flex-col gap-2 px-2">
          <div className="flex min-h-0 flex-1 items-stretch justify-around gap-4 border-b border-gray-200 pt-5">
            {chartData.map((item) => {
              const height = (item.amount / maxAmount) * 100;
              const formattedAmount = item.amount.toLocaleString("ru-RU");

              return (
                <div
                  key={item.date}
                  className="flex min-w-0 flex-1 justify-center"
                >
                  <div className="relative flex h-full w-full max-w-20 items-end">
                    <span
                      className="absolute left-1/2 z-10 -translate-x-1/2 whitespace-nowrap text-xs font-medium text-gray-700"
                      style={{ bottom: `calc(${height}% + 0.5rem)` }}
                    >
                      {formattedAmount} ₽
                    </span>
                    <div
                      className="w-full rounded-t-lg bg-emerald-800 transition-all"
                      style={{ height: `${height}%` }}
                      title={`${item.date}: ${formattedAmount} ₽`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-around gap-4">
            {chartData.map((item) => (
              <span
                key={item.date}
                className="min-w-0 flex-1 text-center text-xs text-gray-500"
              >
                {item.date}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default OrdersChart;