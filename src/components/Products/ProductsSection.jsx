import HeaderSection from "../Categories/HeaderSection";
import ProductCard from "./ProductCard";
import LoadingSkeleton from "../UI/LoadingSkeleton";
import ErrorMessage from "../UI/ErrorMessage";
import { getCategoryName } from "../../utils/productCategories";

function ProductsSection({ products, categories, isLoading, error, onRetry }) {
  const popularProducts = products.filter((item) => item.popular);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <HeaderSection
          label="Каталог"
          title="Популярные товары"
          linkText="Весь каталог"
          linkPath="/products"
        />

        {isLoading ? (
          <LoadingSkeleton />
        ) : error ? (
          <ErrorMessage message={error} onRetry={onRetry} />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {popularProducts.map((item) => (
              <ProductCard
                key={item.id}
                title={item.title}
                category={getCategoryName(item.categoryId, categories)}
                image={item.image}
                price={item.price}
                path={item.path}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductsSection;