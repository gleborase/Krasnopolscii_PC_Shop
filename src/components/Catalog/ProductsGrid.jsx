import ProductCard from "../Products/ProductCard";

function ProductsGrid({ products }) {
  return (
    <div>
      <p className="mb-4 text-sm text-gray-500">Найдено товаров: {products.length}</p>

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