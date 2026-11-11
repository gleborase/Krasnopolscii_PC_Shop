import { TriangleAlert } from "lucide-react";

function ErrorMessage({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-gray-200 bg-white p-10 text-center">
      <TriangleAlert className="mb-3 h-10 w-10 text-red-400" />
      <h3 className="mb-1 text-lg font-medium text-gray-900">Ошибка загрузки</h3>
      <p className="mb-5 text-sm text-gray-500">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="rounded-lg bg-emerald-900 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-800"
      >
        Попробовать снова
      </button>
    </div>
  );
}

export default ErrorMessage;