
import CategoryActions from "./CategoryActions";

function CategoriesTable({ categories }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] text-left text-sm">
          <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
            <tr>
              <th className="px-6 py-4 font-semibold">ID</th>
              <th className="px-6 py-4 font-semibold">Название категории</th>
              <th className="px-6 py-4 font-semibold">Количество товаров</th>
              <th className="px-6 py-4 text-center font-semibold">Действия</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {categories.map((category, index) => (
              <tr
                key={category.name}
                className="text-gray-700 transition-colors hover:bg-gray-50"
              >
                <td className="px-6 py-4 font-medium text-gray-500">
                  {index + 1}
                </td>

                <td className="px-6 py-4 font-semibold text-gray-900">
                  {category.name}
                </td>

                <td className="px-6 py-4">
                  <span className="rounded-full bg-emerald-900/10 px-3 py-1 text-xs font-medium text-emerald-900">
                    {category.count}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <CategoryActions />
                </td>
              </tr>
            ))}

            {categories.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-10 text-center text-gray-500"
                >
                  Категории не найдены.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CategoriesTable;
