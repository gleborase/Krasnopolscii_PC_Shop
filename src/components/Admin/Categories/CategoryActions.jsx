import { Pencil, Trash2 } from "lucide-react";

function CategoryActions({ category, onEdit, onDelete, disabled }) {
  return (
    <div className="flex items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => onEdit(category)}
        disabled={disabled}
        title="Редактировать категорию"
        aria-label="Редактировать категорию"
        className="rounded-lg p-2 text-blue-500 transition hover:bg-blue-500/10 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Pencil size={17} />
      </button>

      <button
        type="button"
        onClick={() => onDelete(category.id)}
        disabled={disabled}
        title="Удалить категорию"
        aria-label="Удалить категорию"
        className="rounded-lg p-2 text-red-500 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Trash2 size={17} />
      </button>
    </div>
  );
}

export default CategoryActions;