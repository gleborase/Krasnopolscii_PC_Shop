import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { updateProduct } from "../../api/productsApi";
import { getErrorMessage } from "../../api/http";
import ProductForm from "../../components/Admin/Products/ProductForm";
import ErrorMessage from "../../components/UI/ErrorMessage";
import { useCategories } from "../../hooks/useCategories";
import { useProduct } from "../../hooks/useProduct";

function getFormValues(product) {
  return {
    image: product.image ?? "",
    imageName: product.image ? "Текущее фото" : "",
    imageSource: "file",
    imageUrl: "",
    title: product.title ?? "",
    brand: product.brand ?? "",
    categoryId: String(product.categoryId ?? ""),
    price: String(product.price ?? ""),
    quantity: String(product.quantity ?? (product.inStock ? 1 : 0)),
    description: product.description ?? "",
  };
}

function AdminEditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    product,
    isLoading: isProductLoading,
    error: productError,
    isNotFound,
    refetch,
  } = useProduct(id);
  const categoryData = useCategories();
  const [updatedProduct, setUpdatedProduct] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  async function handleSubmit(values) {
    setIsSaving(true);
    setSaveError("");

    try {
      setUpdatedProduct(await updateProduct(product.id, values));
    } catch (err) {
      setSaveError(`Не удалось сохранить изменения. ${getErrorMessage(err)}`);
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
          <ArrowLeft size={16} />К списку товаров
        </Link>

        <h2 className="text-xl font-bold text-gray-900">
          Редактирование товара
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Измените данные товара и сохраните обновления
        </p>
      </div>

      {isProductLoading || categoryData.isLoading ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-sm text-gray-500">
          Загрузка товара...
        </div>
      ) : isNotFound ? (
        <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6">
          <p className="text-sm text-gray-700">Товар не найден.</p>
          <Link
            to="/admin/products"
            className="inline-flex rounded-lg bg-emerald-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-800"
          >
            К списку товаров
          </Link>
        </div>
      ) : productError ? (
        <ErrorMessage message={productError} onRetry={refetch} />
      ) : categoryData.error ? (
        <ErrorMessage
          message={categoryData.error}
          onRetry={categoryData.refetch}
        />
      ) : updatedProduct ? (
        <div
          role="status"
          className="space-y-4 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-5 sm:p-6"
        >
          <h3 className="font-bold text-emerald-400">Товар успешно обновлён</h3>
          <p className="text-sm text-gray-700">{updatedProduct.title}</p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/admin/products"
              className="rounded-lg bg-emerald-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-800"
            >
              К списку товаров
            </Link>
            <Link
              to={updatedProduct.path}
              className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm text-gray-700 transition hover:bg-gray-50"
            >
              Открыть в каталоге
            </Link>
          </div>
        </div>
      ) : (
        <ProductForm
          categories={categoryData.categories}
          initialValues={getFormValues(product)}
          onSubmit={handleSubmit}
          isSaving={isSaving}
          submitError={saveError}
          submitLabel="Сохранить изменения"
          resetLabel="Сбросить изменения"
          onCancel={() => navigate("/admin/products")}
        />
      )}
    </section>
  );
}

export default AdminEditProduct;
