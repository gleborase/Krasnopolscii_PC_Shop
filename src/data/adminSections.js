
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Tags,
  Users,
  Settings,
} from "lucide-react";

export const adminSections = [
  {
    id: "overview",
    path: "/admin/dashboard",
    label: "Обзор",
    title: "Обзор",
    icon: LayoutDashboard,
    description: "Ключевые показатели и последние заказы интернет-магазина.",
  },
  {
    id: "products",
    path: "/admin/products",
    label: "Товары",
    title: "Управление товарами",
    icon: Package,
    description: "Просмотр и управление товарами интернет-магазина.",
  },
  {
    id: "orders",
    path: "/admin/orders",
    label: "Заказы",
    title: "Управление заказами",
    icon: ShoppingCart,
    description: "Контроль заказов интернет-магазина.",
  },
  {
    id: "categories",
    path: "/admin/categories",
    label: "Категории",
    title: "Управление категориями",
    icon: Tags,
    description: "Организация каталога товаров по категориям.",
  },
  {
    id: "customers",
    path: "/admin/customers",
    label: "Покупатели",
    title: "Список покупателей",
    icon: Users,
    description: "Информация о покупателях магазина.",
  },
  {
    id: "settings",
    path: "/admin/settings",
    label: "Настройки",
    title: "Настройки панели",
    icon: Settings,
    description: "Основные настройки административной панели.",
  },
];

export function getSection(id) {
  return adminSections.find((section) => section.id === id) ?? adminSections[0];
}
