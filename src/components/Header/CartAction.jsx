function CartAction({ count }) {
  return (
    <button
      type="button"
      className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
    >
      Корзина ({count})
    </button>
  );
}

export default CartAction;
