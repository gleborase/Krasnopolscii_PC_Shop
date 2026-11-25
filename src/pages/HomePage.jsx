import Hero from "../components/Hero/Hero";
import CategoriesSection from "../components/Categories/CategoriesSection";
import ProductsSection from "../components/Products/ProductsSection";
import InfoSection from "../components/Info/InfoSection";
import { useProducts } from "../hooks/useProducts";
import { useCategories } from "../hooks/useCategories";

function HomePage() {
  const { products, isLoading, error, refetch } = useProducts();
  const categoryData = useCategories();
  const productCount = isLoading ? "…" : error ? "—" : products.length;
  const pageError = error ?? categoryData.error;
  const pageIsLoading = isLoading || categoryData.isLoading;

  function retryLoading() {
    refetch();
    categoryData.refetch();
  }

  return (
    <>
      <Hero productCount={productCount} />
      <CategoriesSection />
      <ProductsSection
        products={products}
        categories={categoryData.categories}
        isLoading={pageIsLoading}
        error={pageError}
        onRetry={retryLoading}
      />
      <InfoSection />
    </>
  );
}

export default HomePage;
