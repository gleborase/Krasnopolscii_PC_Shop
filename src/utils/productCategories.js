export function getCategoryName(categoryId, categories) {
  return (
    categories.find((category) => category.id === categoryId)?.name ??
    "Категория не найдена"
  );
}
