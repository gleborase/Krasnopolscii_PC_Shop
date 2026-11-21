import { request } from "./http";

export function getCategories(signal) {
  return request("/categories", { signal });
}

export function createCategory(data) {
  return request("/categories", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateCategory(id, data) {
  return request(`/categories/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export function deleteCategory(id) {
  return request(`/categories/${id}`, { method: "DELETE" });
}