
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Package, Plus, Pencil, Trash2 } from "lucide-react";
import { useProducts } from "../../hooks/useProducts";
import { useCategories } from "../../hooks/useCategories";
import ErrorMessage from "../../components/UI/ErrorMessage";
import { getCategoryName } from "../../utils/productCategories";
import { getErrorMessage } from "../../api/http";

function AdminProducts() {
  const [search, setSearch] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [deletingProductId, setDeletingProductId] = useState(null);
  const {
    products,
    isLoading: isProductsLoading,
    error: productsError,
    refetch: refetchProducts,
    removeProduct,
  } = useProducts();
  const categoryData = useCategories();
  const isLoading = isProductsLoading || categoryData.isLoading;
  const error = productsError ?? categoryData.error;

  function retryLoading() {
    refetchProducts();
    categoryData.refetch();
  }

  async function handleDelete(product) {
    const confirmed = window.confirm(
      `Удалить товар «${product.title}»? Это действие нельзя отменить.`
    );

    if (!confirmed) return;

    setDeletingProductId(product.id);
    setDeleteError("");

    try {
      await removeProduct(product.id);
    } catch (err) {
      setDeleteError(getErrorMessage(err));
    } finally {
      setDeletingProductId(null);
    }
  }

  const filteredProducts = products.filter((product) => {
    const query = search.toLowerCase();
    const categoryName = getCategoryName(
      product.categoryId,
      categoryData.categories
    );

    return (
      product.title.toLowerCase().includes(query) ||
      product.brand?.toLowerCase().includes(query) ||
      categoryName.toLowerCase().includes(query)
    );
  });

  return (
    <section className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Управление товарами
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Список товаров интернет-магазина PC Shop
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="w-fit rounded-xl bg-emerald-900/10 px-4 py-2 text-sm font-semibold text-emerald-900">
            Всего товаров: {isLoading ? "…" : products.length}
          </span>

          <Link
            to="/admin/products/new"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-800"
          >
            <Plus size={17} />
            Добавить товар
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3">
        <Search size={19} className="text-gray-400" />

        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Поиск по названию, бренду или категории..."
          className="w-full bg-transparent text-sm text-gray-900 outline-none"
        />
      </div>

      {deleteError && (
        <p
          role="alert"
          className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400"
        >
          Не удалось удалить товар. {deleteError}
        </p>
      )}

      {isLoading ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-sm text-gray-500">
          Загрузка товаров...
        </div>
      ) : error ? (
        <ErrorMessage message={error} onRetry={retryLoading} />
      ) : (
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-5 py-4">Товар</th>
                <th className="px-5 py-4">Бренд</th>
                <th className="px-5 py-4">Категория</th>
                <th className="px-5 py-4">Цена</th>
                <th className="px-5 py-4">Кол-во</th>
                <th className="px-5 py-4">Наличие</th>
                <th className="px-5 py-4 text-right">Действия</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt=""
                          className="h-10 w-10 shrink-0 rounded-lg bg-gray-100 object-cover"
                        />
                      ) : (
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500">
                          <Package size={19} />
                        </div>
                      )}
                      <span className="font-medium text-gray-900">
                        {product.title}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-4">{product.brand ?? "—"}</td>
                  <td className="px-5 py-4">
                    {getCategoryName(product.categoryId, categoryData.categories)}
                  </td>

                  <td className="px-5 py-4 font-semibold text-gray-900">
                    {product.price.toLocaleString("ru-RU")} ₽
                  </td>

                  <td className="px-5 py-4">{product.quantity ?? "—"}</td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        product.inStock
                          ? "bg-emerald-500/15 text-emerald-400"
                          : "bg-red-500/10 text-red-600"
                      }`}
                    >
                      {product.inStock ? "В наличии" : "Нет в наличии"}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        to={`/admin/products/${product.id}/edit`}
                        title="Редактировать товар"
                        aria-label={`Редактировать товар ${product.title}`}
                        className="rounded-lg p-2 text-blue-500 transition hover:bg-blue-500/10"
                      >
                        <Pencil size={17} />
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(product)}
                        disabled={deletingProductId !== null}
                        title="Удалить товар"
                        aria-label={`Удалить товар ${product.title}`}
                        className="rounded-lg p-2 text-red-500 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <p className="p-8 text-center text-sm text-gray-500">
            Товары не найдены.
          </p>
        )}
      </div>
      )}
    </section>
  );
}

export default AdminProducts;
