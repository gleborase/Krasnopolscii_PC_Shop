function HeroActions() {
  return (
    <div className="mt-8 flex items-center gap-3">
      <button
        type="button"
        className="rounded-lg bg-emerald-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-emerald-800"
      >
        Перейти к сборке
      </button>

      <button
        type="button"
        className="rounded-lg border border-gray-200 bg-white px-6 py-3 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-50"
      >
        Админ-панель
      </button>
    </div>
  );
}

export default HeroActions;
