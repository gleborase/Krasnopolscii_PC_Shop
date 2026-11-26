const RECENT_ORDERS_LIMIT = 5;

function getDateValue(date) {
  const match = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(date ?? "");

  if (!match) return -1;

  const [, dayText, monthText, yearText] = match;
  const day = Number(dayText);
  const month = Number(monthText);
  const year = Number(yearText);
  const value = new Date(year, month - 1, day);

  if (
    value.getFullYear() !== year ||
    value.getMonth() !== month - 1 ||
    value.getDate() !== day
  ) {
    return -1;
  }

  return year * 10000 + month * 100 + day;
}

function getOrderNumber(id) {
  const match = /(\d+)$/.exec(String(id ?? ""));
  return match ? Number(match[1]) : Number.NEGATIVE_INFINITY;
}

export function sortOrdersNewestFirst(orders) {
  return [...orders].sort((a, b) => {
    const dateDifference = getDateValue(b.date) - getDateValue(a.date);
    if (dateDifference !== 0) return dateDifference;
    return getOrderNumber(b.id) - getOrderNumber(a.id);
  });
}

export function getRecentOrders(orders) {
  return sortOrdersNewestFirst(orders).slice(0, RECENT_ORDERS_LIMIT);
}

export function getAmountByDate(orders) {
  const totals = orders.reduce((result, order) => {
    const date = order.date || "Без даты";
    result[date] = (result[date] ?? 0) + (Number(order.amount) || 0);
    return result;
  }, {});

  return Object.entries(totals)
    .map(([date, amount]) => ({ date, amount, value: getDateValue(date) }))
    .sort((a, b) => {
      if (a.value === -1) return 1;
      if (b.value === -1) return -1;
      return a.value - b.value;
    })
    .map(({ date, amount }) => ({ date, amount }));
}

export function getAmountByStatus(orders) {
  return orders.reduce((totals, order) => {
    const status = order.status || "Без статуса";
    totals[status] = (totals[status] ?? 0) + (Number(order.amount) || 0);
    return totals;
  }, {});
}

export function getOutOfStock(products) {
  const items = products
    .filter((product) => !product.inStock)
    .sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));

  return {
    items: items.slice(0, RECENT_ORDERS_LIMIT),
    total: items.length,
  };
}
