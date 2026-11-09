import HeaderSection from "../Categories/HeaderSection";
import ProductCard from "./ProductCard";
import { products } from "../../data/products";

function ProductsSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <HeaderSection
          label="Каталог"
          title="Популярные товары"
          linkText="Весь каталог"
          linkPath="/products"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.filter((item) => item.popular).map((item) => (
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
    </section>
  );
}

export default ProductsSection;