export function filterProducts(products, filters) {
  const {
    query,
    categories,
    brands,
    minPrice,
    maxPrice,
    inStockOnly,
    popularOnly,
    sortType,
  } = filters;

  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const min = minPrice === "" ? null : Number(minPrice);
  const max = maxPrice === "" ? null : Number(maxPrice);

  const result = products.filter((item) => {
    const text = `${item.title} ${item.category}`.toLowerCase();

    if (!words.every((word) => text.includes(word))) return false;
    if (categories.length > 0 && !categories.includes(item.category)) return false;
    if (brands.length > 0 && !brands.includes(item.brand)) return false;
    if (min !== null && item.price < min) return false;
    if (max !== null && item.price > max) return false;
    if (inStockOnly && !item.inStock) return false;
    if (popularOnly && !item.popular) return false;

    return true;
  });

  if (sortType === "cheap") result.sort((a, b) => a.price - b.price);
  if (sortType === "expensive") result.sort((a, b) => b.price - a.price);

  return result;
}