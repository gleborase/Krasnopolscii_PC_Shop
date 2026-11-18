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
    label: "Обзор",
    title: "Обзор",
    icon: LayoutDashboard,
    description: "Ключевые показатели и последние заказы интернет-магазина.",
  },
  {
    id: "products",
    label: "Товары",
    title: "Управление товарами",
    icon: Package,
    description: "Раздел для просмотра и управления товарами интернет-магазина.",
  },
  {
    id: "orders",
    label: "Заказы",
    title: "Управление заказами",
    icon: ShoppingCart,
    description: "Раздел для контроля заказов и изменения их статусов.",
  },
  {
    id: "categories",
    label: "Категории",
    title: "Управление категориями",
    icon: Tags,
    description: "Раздел для организации каталога по категориям комплектующих.",
  },
  {
    id: "customers",
    label: "Покупатели",
    title: "Список покупателей",
    icon: Users,
    description: "Раздел для просмотра информации о покупателях магазина.",
  },
  {
    id: "settings",
    label: "Настройки",
    title: "Настройки панели",
    icon: Settings,
    description: "Раздел с основными настройками административной панели.",
  },
];

export function getSection(id) {
  return adminSections.find((section) => section.id === id) ?? adminSections[0];
}