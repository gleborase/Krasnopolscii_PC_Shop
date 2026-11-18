
import { Tags, Package } from "lucide-react";
import { products } from "../../data/products";

function AdminCategories() {
  const categories = [...new Set(products.map((product) => product.category))];

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">
          Управление категориями
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Категории товаров интернет-магазина
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => {
          const count = products.filter(
            (product) => product.category === category
          ).length;

          return (
            <article
              key={category}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-xl bg-emerald-900/10 p-3 text-emerald-900">
                  <Tags size={22} />
                </span>

                <span className="text-sm text-gray-500">
                  ID: {categories.indexOf(category) + 1}
                </span>
              </div>

              <h3 className="mt-4 font-bold text-gray-900">
                {category}
              </h3>

              <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                <Package size={16} />
                Товаров: {count}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default AdminCategories;
