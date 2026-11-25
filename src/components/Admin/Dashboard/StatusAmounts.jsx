import { getAmountByStatus } from "../../../utils/dashboardDetails";

const statusColors = {
  "Выполнен": "bg-emerald-700",
  "В обработке": "bg-amber-500",
  "Ожидает оплаты": "bg-sky-600",
};

function StatusAmounts({ orders }) {
  const totals = getAmountByStatus(orders);
  const entries = Object.entries(totals);
  const totalAmount = entries.reduce((sum, [, amount]) => sum + amount, 0);

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-6">
        <h3 className="font-bold text-gray-900">Сумма заказов по статусам</h3>
        <p className="mt-1 text-sm text-gray-500">
          Распределение общей стоимости заказов
        </p>
      </div>

      {entries.length === 0 ? (
        <p className="py-6 text-center text-sm text-gray-500">
          Нет данных для отображения
        </p>
      ) : (
        <div className="space-y-5">
          {entries.map(([status, amount]) => (
            <div key={status}>
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-sm">
                <span className="text-gray-600">{status}</span>
                <span className="font-semibold text-gray-900">
                  {amount.toLocaleString("ru-RU")} ₽
                </span>
              </div>
              <div
                className="h-2 overflow-hidden rounded-full bg-gray-100"
                role="progressbar"
                aria-label={`Доля статуса «${status}»`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={
                  totalAmount > 0 ? Math.round((amount / totalAmount) * 100) : 0
                }
              >
                <div
                  className={`h-full rounded-full ${
                    statusColors[status] ?? "bg-gray-500"
                  }`}
                  style={{
                    width: `${totalAmount > 0 ? (amount / totalAmount) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 flex justify-between border-t border-gray-100 pt-4 text-sm">
        <span className="font-medium text-gray-600">Общая сумма</span>
        <span className="font-bold text-gray-900">
          {totalAmount.toLocaleString("ru-RU")} ₽
        </span>
      </div>
    </section>
  );
}

export default StatusAmounts;
