import {
  Circle,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  Tags,
  Users,
} from "lucide-react";

const icons = {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Tags,
  Users,
  Settings,
};

export function getAdminIcon(name) {
  return icons[name] ?? Circle;
}