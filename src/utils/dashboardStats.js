import { CreditCard, Package, ShoppingBag, Users } from "lucide-react";

const formatNumber = (value) => value.toLocaleString("ru-RU");

export function getDashboardStats({ products, categories, orders, customers }) {
  const completedOrders = orders.filter((order) => order.status === "Выполнен");
  const revenue = completedOrders.reduce(
    (sum, order) => sum + Number(order.amount),
    0,
  );
  const inStock = products.filter((product) => product.inStock).length;
  const activeCustomers = customers.filter(
    (customer) => customer.status === "Активен",
  ).length;

  return [
    {
      label: "Выручка",
      value: `${formatNumber(revenue)} ₽`,
      hint: `Выполнено заказов: ${completedOrders.length} из ${orders.length}`,
      icon: CreditCard,
    },
    {
      label: "Заказы",
      value: formatNumber(orders.length),
      hint: `В работе: ${orders.length - completedOrders.length}`,
      icon: ShoppingBag,
    },
    {
      label: "Товары",
      value: formatNumber(products.length),
      hint: `В наличии: ${inStock} · категорий: ${categories.length}`,
      icon: Package,
    },
    {
      label: "Покупатели",
      value: formatNumber(customers.length),
      hint: `Активных: ${activeCustomers}`,
      icon: Users,
    },
  ];
}
