export function getBrands(products) {
  return [...new Set(products.map((item) => item.brand))].sort();
}

export function getCounts(products) {
  const counts = { categories: {}, brands: {} };

  for (const item of products) {
    counts.categories[item.categoryId] =
      (counts.categories[item.categoryId] ?? 0) + 1;
    counts.brands[item.brand] = (counts.brands[item.brand] ?? 0) + 1;
  }

  return counts;
}