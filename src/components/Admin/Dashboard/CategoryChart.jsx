
function CategoryChart({ categories, products }) {
  const chartData = categories.map((category) => {
    const count = products.filter(
      (product) => product.category === category.name
    ).length;

    return {
      name: category.name,
      count,
    };
  });

  const maxCount = Math.max(
    ...chartData.map((item) => item.count),
    1
  );

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-6">
        <h3 className="font-bold text-gray-900">
          Товары по категориям
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Распределение товаров каталога
        </p>
      </div>

      <div className="space-y-4">
        {chartData.map((item) => (
          <div key={item.name}>
            <div className="mb-1 flex justify-between gap-3 text-sm">
              <span className="text-gray-600">
                {item.name}
              </span>

              <span className="font-semibold text-gray-900">
                {item.count}
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-emerald-800 transition-all"
                style={{
                  width: `${(item.count / maxCount) * 100}%`,
                }}
              />
            </div>
          </div>
        ))}

        {chartData.length === 0 && (
          <p className="py-6 text-center text-sm text-gray-500">
            Нет данных для отображения
          </p>
        )}
      </div>
    </section>
  );
}

export default CategoryChart;
