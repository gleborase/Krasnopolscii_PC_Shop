import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ProductForm from "../../components/Admin/Products/ProductForm";
import ErrorMessage from "../../components/UI/ErrorMessage";
import { useCategories } from "../../hooks/useCategories";
import { getCategoryName } from "../../utils/productCategories";

function AdminAddProduct() {
  const { categories, isLoading, error, refetch } = useCategories();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const preview = product?.imagePreview;

    return () => {
      if (preview?.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [product?.imagePreview]);

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
      ) : product ? (
        <div
          role="status"
          className="space-y-4 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-5 sm:p-6"
        >
          <h3 className="font-bold text-emerald-400">
            Форма заполнена корректно
          </h3>

          <dl className="grid gap-3 text-sm sm:grid-cols-2">
            <div className="sm:col-span-2">
              <dt className="text-gray-500">Фото</dt>
              <dd className="mt-2">
                <img
                  src={product.imagePreview}
                  alt={`Фото товара ${product.title}`}
                  className="size-40 rounded-xl border border-gray-200 bg-white object-contain"
                />
                {product.imageName && (
                  <p className="mt-1 text-xs text-gray-500">
                    {product.imageName}
                  </p>
                )}
              </dd>
            </div>
            <div>
              <dt className="text-gray-500">Наименование</dt>
              <dd className="font-medium text-gray-900">{product.title}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Категория</dt>
              <dd className="font-medium text-gray-900">
                {getCategoryName(product.categoryId, categories)}
              </dd>
            </div>
            <div>
              <dt className="text-gray-500">Стоимость</dt>
              <dd className="font-medium text-gray-900">
                {product.price.toLocaleString("ru-RU")} ₽
              </dd>
            </div>
            <div>
              <dt className="text-gray-500">Количество</dt>
              <dd className="font-medium text-gray-900">
                {product.quantity} шт.
                {product.inStock ? "" : " (нет в наличии)"}
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-gray-500">Описание</dt>
              <dd className="whitespace-pre-line text-gray-900">
                {product.description}
              </dd>
            </div>
          </dl>

          <button
            type="button"
            onClick={() => setProduct(null)}
            className="rounded-lg bg-emerald-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-800"
          >
            Заполнить новую форму
          </button>
        </div>
      ) : (
        <ProductForm categories={categories} onSubmit={setProduct} />
      )}
    </section>
  );
}

export default AdminAddProduct;
