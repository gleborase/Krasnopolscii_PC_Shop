
import { useState } from "react";
import { Tags, Package, Plus, X } from "lucide-react";
import { products } from "../../data/products";
import CategoriesTable from "../../components/Admin/Categories/CategoriesTable";

function getInitialCategories() {
  const categoryMap = new Map();

  products.forEach((product) => {
    const categoryName = product.category;

    categoryMap.set(
      categoryName,
      (categoryMap.get(categoryName) || 0) + 1
    );
  });

  return Array.from(categoryMap, ([name, count], index) => ({
    id: index + 1,
    name,
    count,
  }));
}

function AdminCategories() {
  const [categories, setCategories] = useState(getInitialCategories);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState("");

  const totalProducts = products.length;

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

  function handleSubmit(event) {
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

    if (editingCategory) {
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.id === editingCategory.id
            ? { ...category, name: trimmedName }
            : category
        )
      );
    } else {
      setCategories((prevCategories) => [
        ...prevCategories,
        {
          id: Date.now(),
          name: trimmedName,
          count: 0,
        },
      ]);
    }

    closeForm();
  }

  function handleDelete(categoryId) {
    const confirmed = window.confirm(
      "Вы действительно хотите удалить эту категорию?"
    );

    if (!confirmed) return;

    setCategories((prevCategories) =>
      prevCategories.filter((category) => category.id !== categoryId)
    );
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
          className="flex w-fit items-center gap-2 rounded-xl bg-emerald-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
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
            {categories.length}
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
            Всего категорий: {categories.length}
          </p>
        </div>

        <CategoriesTable
          categories={categories}
          onEdit={openEditForm}
          onDelete={handleDelete}
        />
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
                className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100"
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
                  className="rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  Отмена
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-emerald-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  {editingCategory ? "Сохранить" : "Добавить"}
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
