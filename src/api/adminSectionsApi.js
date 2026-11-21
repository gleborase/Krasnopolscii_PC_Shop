import { request } from "./http";

export function fetchAdminSections(signal) {
  return request("/adminSections", { signal });
}