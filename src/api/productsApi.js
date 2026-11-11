import { products as catalog } from "../data/products";

const API_URL = "https://jsonplaceholder.typicode.com";

export async function fetchProducts(signal) {
  const response = await fetch(`${API_URL}/posts?_limit=${catalog.length}`, {
    signal,
  });

  if (!response.ok) {
    throw new Error(`Ошибка HTTP: ${response.status}`);
  }

  const posts = await response.json();

  return posts.map((post, index) => {
    const item = catalog[index % catalog.length];

    return {
      ...item,
      id: post.id,
      path: `/products/${post.id}`,
    };
  });
}