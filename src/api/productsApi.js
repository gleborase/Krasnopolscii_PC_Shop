import { request } from "./http";

function toProduct(item) {
  return {
    ...item,
    id: Number(item.id),
    path: `/products/${item.id}`,
    description:
      item.description ??
      "Комплектующее с проверенными характеристиками и совместимостью для вашей сборки.",
  };
}

export async function fetchProducts(signal) {
  const items = await request("/products", { signal });
  return items.map(toProduct);
}

export async function fetchProductById(id, signal) {
  const item = await request(`/products/${encodeURIComponent(id)}`, { signal });
  return toProduct(item);
}