import ProductCard from "../Products/ProductCard";

function getProductsWord(count) {
  const lastTwo = count % 100;
  const last = count % 10;

  if (lastTwo >= 11 && lastTwo <= 14) return "товаров";
  if (last === 1) return "товар";
  if (last >= 2 && last <= 4) return "товара";
  return "товаров";
}

function ProductsGrid({ products }) {
  if (products.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-10 text-center text-sm text-gray-500">
        Товары не найдены
      </div>
    );
  }

  return (
    <div>
      <p className="mb-4 text-sm text-gray-500">
        Найдено: {products.length} {getProductsWord(products.length)}
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((item) => (
          <ProductCard
            key={item.id}
            title={item.title}
            category={item.category}
            image={item.image}
            price={item.price}
            path={item.path}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductsGrid;