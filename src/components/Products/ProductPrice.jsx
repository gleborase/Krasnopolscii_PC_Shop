function ProductPrice({ price }) {
  return (
    <span className="text-lg font-medium text-gray-950">
      {price.toLocaleString("ru-RU")} ₽
    </span>
  );
}

export default ProductPrice;
