import { useEffect, useState } from "react";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} from "../../api/productsApi";

const emptyForm = { title: "", body: "" };

function getKey(post) {
  return post.localKey ?? post.id;
}

function NewsSection() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [editingKey, setEditingKey] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    getPosts(controller.signal)
      .then((data) => setPosts(data))
      .catch((err) => {
        if (err.name !== "AbortError") setError(err.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });

    return () => controller.abort();
  }, []);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function startEdit(post) {
    setEditingKey(getKey(post));
    setForm({ title: post.title, body: post.body });
  }

  function cancelEdit() {
    setEditingKey(null);
    setForm(emptyForm);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim()) return;

    setIsSaving(true);
    setError(null);

    try {
      if (editingKey !== null) {
        const target = posts.find((p) => getKey(p) === editingKey);
        const updated = await updatePost(target.id, form);

        setPosts((prev) =>
          prev.map((p) =>
            getKey(p) === editingKey ? { ...p, ...updated } : p
          )
        );
        cancelEdit();
      } else {
        const created = await createPost({ ...form, userId: 1 });

        setPosts((prev) => [
          { ...created, localKey: Date.now() },
          ...prev,
        ]);
        setForm(emptyForm);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(post) {
    setError(null);

    try {
      await deletePost(post.id);
      setPosts((prev) => prev.filter((p) => getKey(p) !== getKey(post)));
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <p className="mb-2 text-xs uppercase tracking-[0.2em] text-gray-500">
          Блог
        </p>
        <h2 className="mb-8 text-4xl font-medium text-gray-950">
          Новости магазина
        </h2>

        <form
          onSubmit={handleSubmit}
          className="mb-8 flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-5"
        >
          <p className="text-sm font-medium text-gray-900">
            {editingKey !== null ? "Редактирование поста" : "Новый пост"}
          </p>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Заголовок"
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400"
          />
          <textarea
            name="body"
            value={form.body}
            onChange={handleChange}
            placeholder="Текст"
            rows={3}
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={isSaving}
              className="rounded-lg bg-emerald-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-800 disabled:opacity-50"
            >
              {isSaving
                ? "Сохранение..."
                : editingKey !== null
                  ? "Сохранить"
                  : "Добавить"}
            </button>
            {editingKey !== null && (
              <button
                type="button"
                onClick={cancelEdit}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Отмена
              </button>
            )}
          </div>
        </form>

        {isLoading && <p className="text-sm text-gray-500">Загрузка...</p>}

        {error && (
          <p className="mb-4 text-sm text-red-500">Ошибка: {error}</p>
        )}

        {!isLoading && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={getKey(post)}
                className="flex flex-col rounded-xl border border-gray-200 bg-white p-5"
              >
                <h3 className="line-clamp-2 text-sm font-medium text-gray-900">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm text-gray-500">
                  {post.body}
                </p>
                <div className="mt-auto flex gap-2 pt-4">
                  <button
                    type="button"
                    onClick={() => startEdit(post)}
                    className="rounded-lg border border-gray-200 px-3 py-1 text-xs text-gray-700 hover:bg-gray-100"
                  >
                    Изменить
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(post)}
                    className="rounded-lg border border-red-200 px-3 py-1 text-xs text-red-500 hover:bg-red-50"
                  >
                    Удалить
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default NewsSection;