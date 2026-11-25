import { useState } from "react";
import { Tags, Package, Plus, X } from "lucide-react";
import { useProducts } from "../../hooks/useProducts";
import CategoriesTable from "../../components/Admin/Categories/CategoriesTable";
import ErrorMessage from "../../components/UI/ErrorMessage";
import { useCategories } from "../../hooks/useCategories";
import { getErrorMessage } from "../../api/http";

function AdminCategories() {
  const {
    categories,
    isLoading,
    error: loadError,
    refetch,
    addCategory,
    renameCategory,
    removeCategory,
  } = useCategories();
  const {
    products,
    isLoading: isProductsLoading,
    error: productsError,
    refetch: refetchProducts,
  } = useProducts();
  const categoriesWithCounts = categories.map((category) => ({
    ...category,
    count: products.filter(
      (product) => product.categoryId === category.id
    ).length,
  }));

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  function openAddForm() {
    setEditingCategory(null);
    setCategoryName("");
    setError("");
    setIsFormOpen(true);
  }

  function openEditForm(category) {
    setEditingCategory(category);
    setCategoryName(category.name);
    setError("");
    setIsFormOpen(true);
  }

  function closeForm() {
    setIsFormOpen(false);
    setEditingCategory(null);
    setCategoryName("");
    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const trimmedName = categoryName.trim();

    if (!trimmedName) {
      setError("Введите название категории.");
      return;
    }

    const duplicateCategory = categories.some(
      (category) =>
        category.name.toLowerCase() === trimmedName.toLowerCase() &&
        category.id !== editingCategory?.id
    );

    if (duplicateCategory) {
      setError("Категория с таким названием уже существует.");
      return;
    }

    setIsSaving(true);
    setActionError("");

    try {
      if (editingCategory) {
        await renameCategory(editingCategory.id, trimmedName);
      } else {
        await addCategory(trimmedName);
      }

      closeForm();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(categoryId) {
    const linkedProducts = products.filter(
      (product) => product.categoryId === categoryId
    );

    if (linkedProducts.length > 0) {
      setActionError(
        `Нельзя удалить категорию: к ней привязано товаров — ${linkedProducts.length}. Сначала перенесите товары в другую категорию.`
      );
      return;
    }

    const confirmed = window.confirm(
      "Вы действительно хотите удалить эту категорию?"
    );

    if (!confirmed) return;

    setIsSaving(true);
    setActionError("");

    try {
      await removeCategory(categoryId);
    } catch (err) {
      setActionError(getErrorMessage(err));
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Управление категориями
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Добавление, редактирование и удаление категорий товаров.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddForm}
          disabled={isLoading || Boolean(loadError)}
          className="flex w-fit items-center gap-2 rounded-xl bg-emerald-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Plus size={18} />
          Добавить категорию
        </button>
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
            {isLoading ? "…" : categories.length}
          </p>
        </article>

        <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">
              Товары в каталоге
            </p>

            <span className="rounded-xl bg-emerald-900/10 p-3 text-emerald-900">
              <Package size={21} />
            </span>
          </div>

          <p className="mt-3 text-2xl font-bold text-gray-900">
            {isProductsLoading ? "…" : products.length}
          </p>
        </article>
      </div>

      <div>
        <div className="mb-4">
          <h3 className="font-bold text-gray-900">
            Список категорий
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Всего категорий: {isLoading ? "…" : categories.length}
          </p>
        </div>

        {actionError && (
          <p
            role="alert"
            className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400"
          >
            {actionError}
          </p>
        )}

        {isLoading || isProductsLoading ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-sm text-gray-500">
            Загрузка категорий...
          </div>
        ) : loadError ? (
          <ErrorMessage message={loadError} onRetry={refetch} />
        ) : productsError ? (
          <ErrorMessage message={productsError} onRetry={refetchProducts} />
        ) : (
          <CategoriesTable
            categories={categoriesWithCounts}
            onEdit={openEditForm}
            onDelete={handleDelete}
            disabled={isSaving}
          />
        )}
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">
                {editingCategory
                  ? "Редактирование категории"
                  : "Добавление категории"}
              </h3>

              <button
                type="button"
                onClick={closeForm}
                disabled={isSaving}
                className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 disabled:opacity-40"
                aria-label="Закрыть"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="categoryName"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Название категории
                </label>

                <input
                  id="categoryName"
                  type="text"
                  value={categoryName}
                  onChange={(event) => {
                    setCategoryName(event.target.value);
                    setError("");
                  }}
                  placeholder="Например, Мониторы"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-emerald-800"
                  autoFocus
                />

                {error && (
                  <p className="mt-2 text-sm text-red-500">
                    {error}
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeForm}
                  disabled={isSaving}
                  className="rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-40"
                >
                  Отмена
                </button>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="rounded-xl bg-emerald-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
                >
                  {isSaving
                    ? "Сохранение..."
                    : editingCategory
                      ? "Сохранить"
                      : "Добавить"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

export default AdminCategories;