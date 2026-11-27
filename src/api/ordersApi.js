import { request } from "./http";

export function updateOrderStatus(id, status) {
  return request(`/orders/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}
