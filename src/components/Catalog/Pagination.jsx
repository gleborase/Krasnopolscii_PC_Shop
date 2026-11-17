import { ChevronLeft, ChevronRight } from "lucide-react";

const baseClass =
  "inline-flex size-9 items-center justify-center rounded-lg border text-sm transition-colors";

function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav
      aria-label="Страницы каталога"
      className="mt-6 flex flex-wrap items-center justify-center gap-2"
    >
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label="Предыдущая страница"
        className={`${baseClass} border-gray-200 text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40`}
      >
        <ChevronLeft className="size-4" />
      </button>

      {pages.map((number) => (
        <button
          key={number}
          type="button"
          onClick={() => onChange(number)}
          aria-current={number === page ? "page" : undefined}
          className={`${baseClass} ${
            number === page
              ? "border-emerald-900 bg-emerald-900 text-white"
              : "border-gray-200 text-gray-700 hover:bg-gray-100"
          }`}
        >
          {number}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Следующая страница"
        className={`${baseClass} border-gray-200 text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40`}
      >
        <ChevronRight className="size-4" />
      </button>
    </nav>
  );
}

export default Pagination;