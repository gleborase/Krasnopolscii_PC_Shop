import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ProductForm from "../../components/Admin/Products/ProductForm";
import ErrorMessage from "../../components/UI/ErrorMessage";
import { createProduct } from "../../api/productsApi";
import { getErrorMessage } from "../../api/http";
import { useCategories } from "../../hooks/useCategories";
import { getCategoryName } from "../../utils/productCategories";

function AdminAddProduct() {
  const { categories, isLoading, error, refetch } = useCategories();
  const [savedProduct, setSavedProduct] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  async function handleSubmit(product) {
    setIsSaving(true);
    setSaveError(null);

    try {
      setSavedProduct(await createProduct(product));
    } catch (err) {
      setSaveError(`Не удалось сохранить товар. ${getErrorMessage(err)}`);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <section className="space-y-6">
      <div>
        <Link
          to="/admin/products"
          className="mb-3 inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-gray-900"
        >
          <ArrowLeft size={16} />
          К списку товаров
        </Link>

        <h2 className="text-xl font-bold text-gray-900">Добавление товара</h2>
        <p className="mt-1 text-sm text-gray-500">
          Заполните данные нового товара интернет-магазина PC Shop
        </p>
      </div>

      {isLoading ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-sm text-gray-500">
          Загрузка категорий...
        </div>
      ) : error ? (
        <ErrorMessage message={error} onRetry={refetch} />
      ) : savedProduct ? (
        <div
          role="status"
          className="space-y-4 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-5 sm:p-6"
        >
          <h3 className="font-bold text-emerald-400">Товар добавлен в каталог</h3>

          {savedProduct.image && (
            <img
              src={savedProduct.image}
              alt={savedProduct.title}
              className="size-32 rounded-lg border border-gray-200 bg-white object-contain"
            />
          )}

          <dl className="grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-gray-500">Наименование</dt>
              <dd className="font-medium text-gray-900">{savedProduct.title}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Бренд</dt>
              <dd className="font-medium text-gray-900">{savedProduct.brand}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Категория</dt>
              <dd className="font-medium text-gray-900">
                {getCategoryName(savedProduct.categoryId, categories)}
              </dd>
            </div>
            <div>
              <dt className="text-gray-500">Стоимость</dt>
              <dd className="font-medium text-gray-900">
                {savedProduct.price.toLocaleString("ru-RU")} ₽
              </dd>
            </div>
            <div>
              <dt className="text-gray-500">Количество</dt>
              <dd className="font-medium text-gray-900">
                {savedProduct.quantity} шт.
                {savedProduct.inStock ? "" : " (нет в наличии)"}
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-gray-500">Описание</dt>
              <dd className="whitespace-pre-line text-gray-900">
                {savedProduct.description}
              </dd>
            </div>
          </dl>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/admin/products"
              className="rounded-lg bg-emerald-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-800"
            >
              К списку товаров
            </Link>
            <Link
              to={savedProduct.path}
              className="rounded-lg bg-emerald-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-800"
            >
              Открыть в каталоге
            </Link>
            <button
              type="button"
              onClick={() => setSavedProduct(null)}
              className="rounded-lg bg-emerald-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-800"
            >
              Добавить ещё
            </button>
          </div>
        </div>
      ) : (
        <ProductForm
          categories={categories}
          onSubmit={handleSubmit}
          isSaving={isSaving}
          submitError={saveError}
        />
      )}
    </section>
  );
}

export default AdminAddProduct;
