
import { useMemo } from "react";
import { Tags, Package } from "lucide-react";
import { products } from "../../data/products";
import CategoriesTable from "../../components/Admin/Categories/CategoriesTable";

function AdminCategories() {
  const categories = useMemo(() => {
    const categoryMap = new Map();

    products.forEach((product) => {
      const categoryName = product.category;

      categoryMap.set(
        categoryName,
        (categoryMap.get(categoryName) || 0) + 1
      );
    });

    return Array.from(categoryMap, ([name, count]) => ({
      name,
      count,
    }));
  }, []);

  const totalProducts = categories.reduce(
    (sum, category) => sum + category.count,
    0
  );

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Управление категориями
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Просмотр категорий товаров интернет-магазина PC Shop.
          </p>
        </div>

        <span className="w-fit rounded-xl bg-emerald-900/10 px-4 py-2 text-sm font-semibold text-emerald-900">
          Всего категорий: {categories.length}
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">
              Категории
            </p>

            <span className="rounded-xl bg-emerald-900/10 p-3 text-emerald-900">
              <Tags size={21} />
            </span>
          </div>

          <p className="mt-3 text-2xl font-bold text-gray-900">
            {categories.length}
          </p>
        </article>

        <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">
              Товары в категориях
            </p>

            <span className="rounded-xl bg-emerald-900/10 p-3 text-emerald-900">
              <Package size={21} />
            </span>
          </div>

          <p className="mt-3 text-2xl font-bold text-gray-900">
            {totalProducts}
          </p>
        </article>
      </div>

      <div>
        <div className="mb-4">
          <h3 className="font-bold text-gray-900">
            Список категорий
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Категории сформированы на основе каталога товаров.
          </p>
        </div>

        <CategoriesTable categories={categories} />
      </div>
    </section>
  );
}

export default AdminCategories;
