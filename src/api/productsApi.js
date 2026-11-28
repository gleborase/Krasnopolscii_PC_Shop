import { request } from "./http";

function toProduct(item) {
  return {
    ...item,
    id: Number(item.id),
    categoryId: Number(item.categoryId),
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

export async function createProduct(product) {
  const created = await request("/products", {
    method: "POST",
    body: JSON.stringify(product),
  });
  return toProduct(created);
}

export async function updateProduct(id, product) {
  const updated = await request(`/products/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify(product),
  });
  return toProduct(updated);
}

export function deleteProduct(id) {
  return request(`/products/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
}
