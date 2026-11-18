
import { Pencil, Trash2 } from "lucide-react";

function CategoryActions() {
  return (
    <div className="flex items-center justify-center gap-2">
      <button
        type="button"
        disabled
        title="Редактирование будет добавлено на следующем этапе"
        className="rounded-lg p-2 text-gray-400 opacity-60 cursor-not-allowed"
      >
        <Pencil size={17} />
      </button>

      <button
        type="button"
        disabled
        title="Удаление будет добавлено на следующем этапе"
        className="rounded-lg p-2 text-gray-400 opacity-60 cursor-not-allowed"
      >
        <Trash2 size={17} />
      </button>
    </div>
  );
}

export default CategoryActions;
