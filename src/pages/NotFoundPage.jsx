import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 text-center md:px-6">
      <h1 className="text-3xl font-semibold text-gray-900">Страница не найдена</h1>
      <Link to="/" className="mt-6 inline-block text-sm text-gray-600 hover:text-gray-950">
        Вернуться на главную
      </Link>
    </section>
  );
}

export default NotFoundPage;