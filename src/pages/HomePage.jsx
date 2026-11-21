import Hero from "../components/Hero/Hero";
import CategoriesSection from "../components/Categories/CategoriesSection";
import ProductsSection from "../components/Products/ProductsSection";
import InfoSection from "../components/Info/InfoSection";
import { useProducts } from "../hooks/useProducts";

function HomePage() {
  const { products, isLoading, error, refetch } = useProducts();
  const productCount = isLoading ? "…" : error ? "—" : products.length;

  return (
    <>
      <Hero productCount={productCount} />
      <CategoriesSection />
      <ProductsSection
        products={products}
        isLoading={isLoading}
        error={error}
        onRetry={refetch}
      />
      <InfoSection />
    </>
  );
}

export default HomePage;
