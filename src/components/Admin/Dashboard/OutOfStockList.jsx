import { getOutOfStock } from "../../../utils/dashboardDetails";

const formatPrice = (price) => `${(Number(price) || 0).toLocaleString("ru-RU")} ₽`;

function OutOfStockList({ products }) {
  const { items, total } = getOutOfStock(products);

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h3 className="font-bold text-gray-900">Нет в наличии</h3>
          <p className="mt-1 text-sm text-gray-500">
            Товары, требующие пополнения
          </p>
        </div>
        <span className="shrink-0 rounded-lg bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700">
          Всего: {total}
        </span>
      </div>

      {items.length === 0 ? (
        <p className="py-6 text-center text-sm text-gray-500">
          Все товары есть в наличии.
        </p>
      ) : (
        <ul className="divide-y divide-gray-100">
          {items.map((product) => (
            <li
              key={product.id}
              className="flex min-w-0 items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
            >
              <span className="min-w-0 break-words text-sm text-gray-700">
                {product.title}
              </span>
              <span className="shrink-0 text-sm font-semibold text-gray-900">
                {formatPrice(product.price)}
              </span>
            </li>
          ))}
        </ul>
      )}

      {total > items.length && (
        <p className="mt-4 border-t border-gray-100 pt-3 text-xs text-gray-500">
          И ещё товаров: {total - items.length}
        </p>
      )}
    </section>
  );
}

export default OutOfStockList;
