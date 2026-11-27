import { getOrderStatus } from "./filterOrders";

export const ORDER_STATUSES = ["В обработке", "Ожидает оплаты", "Выполнен"];

export const STATUS_STYLES = {
  "Выполнен": "bg-emerald-500/15 text-emerald-400",
  "В обработке": "bg-amber-500/15 text-amber-400",
  "Ожидает оплаты": "bg-orange-500/15 text-orange-300",
};

export function getStatusChoices(order) {
  const current = getOrderStatus(order);

  return ORDER_STATUSES.includes(current)
    ? ORDER_STATUSES
    : [current, ...ORDER_STATUSES];
}
