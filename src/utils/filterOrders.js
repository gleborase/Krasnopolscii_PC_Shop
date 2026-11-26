export const ALL_STATUSES = "all";

export function getOrderStatus(order) {
  return order.status || "Без статуса";
}

export function filterOrders(orders, { query, status }) {
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);

  return orders.filter((order) => {
    if (status !== ALL_STATUSES && getOrderStatus(order) !== status) {
      return false;
    }

    const text =
      `${order.id} ${order.customer} ${order.date} ${getOrderStatus(order)}`.toLowerCase();

    return words.every((word) => text.includes(word));
  });
}

export function getStatusOptions(orders) {
  const counts = orders.reduce((result, order) => {
    const status = getOrderStatus(order);
    result[status] = (result[status] ?? 0) + 1;
    return result;
  }, {});

  return [
    { value: ALL_STATUSES, label: "Все", count: orders.length },
    ...Object.entries(counts).map(([status, count]) => ({
      value: status,
      label: status,
      count,
    })),
  ];
}