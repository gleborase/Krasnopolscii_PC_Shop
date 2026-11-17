export function getBrands(products) {
  return [...new Set(products.map((item) => item.brand))].sort();
}

export function getCounts(products) {
  const counts = {};

  for (const item of products) {
    counts[item.category] = (counts[item.category] ?? 0) + 1;
    counts[item.brand] = (counts[item.brand] ?? 0) + 1;
  }

  return counts;
}