import { request } from "./http";

export function fetchSiteData(signal) {
  return request("/siteData", { signal });
}

export function fetchOrders(signal) {
  return request("/orders", { signal });
}

export function fetchCustomers(signal) {
  return request("/customers", { signal });
}

export function fetchSettings(signal) {
  return request("/settings", { signal });
}
