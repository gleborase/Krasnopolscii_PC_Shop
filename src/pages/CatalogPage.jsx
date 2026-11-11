import FiltersPanel from "../components/Catalog/FiltersPanel";
import ProductsGrid from "../components/Catalog/ProductsGrid";
import LoadingSkeleton from "../components/UI/LoadingSkeleton";
import ErrorMessage from "../components/UI/ErrorMessage";
import { useProducts } from "../hooks/useProducts";

function CatalogPage() {
  const { products, isLoading, error, refetch } = useProducts();

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <h1 className="text-3xl font-semibold text-gray-900">Каталог комплектующих</h1>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[16rem_1fr]">
        <FiltersPanel />

        {isLoading ? (
          <LoadingSkeleton />
        ) : error ? (
          <ErrorMessage message={error} onRetry={refetch} />
        ) : (
          <ProductsGrid products={products} />
        )}
      </div>
    </section>
  );
}

export default CatalogPage;