import { Link } from "react-router-dom";

function CartAction({ count }) {
  return (
    <Link
      to="/cart"
      className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
    >
      Корзина ({count})
    </Link>
  );
}

export default CartAction;
