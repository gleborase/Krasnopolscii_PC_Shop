import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FiltersPanel from "../components/Catalog/FiltersPanel";
import CatalogToolbar from "../components/Catalog/CatalogToolbar";
import ProductsGrid from "../components/Catalog/ProductsGrid";
import LoadingSkeleton from "../components/UI/LoadingSkeleton";
import ErrorMessage from "../components/UI/ErrorMessage";
import { useProducts } from "../hooks/useProducts";
import { filterProducts } from "../utils/filterProducts";

function CatalogPage() {
  const { products, isLoading, error, refetch } = useProducts();

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortType, setSortType] = useState("default");

  const visibleProducts = useMemo(
    () =>
      filterProducts(products, {
        query,
        categories: selectedCategories,
        minPrice,
        maxPrice,
        sortType,
      }),
    [products, query, selectedCategories, minPrice, maxPrice, sortType],
  );

  function setQuery(value) {
    setSearchParams(value ? { q: value } : {}, { replace: true });
  }

  function toggleCategory(name) {
    setSelectedCategories((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name],
    );
  }

  function resetFilters() {
    setSearchParams({}, { replace: true });
    setSelectedCategories([]);
    setMinPrice("");
    setMaxPrice("");
    setSortType("default");
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <h1 className="text-3xl font-semibold text-gray-900">
        Каталог комплектующих
      </h1>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[16rem_1fr]">
        <FiltersPanel
          selectedCategories={selectedCategories}
          onToggleCategory={toggleCategory}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onMinPriceChange={setMinPrice}
          onMaxPriceChange={setMaxPrice}
          onReset={resetFilters}
        />

        <div>
          {isLoading ? (
            <LoadingSkeleton />
          ) : error ? (
            <ErrorMessage message={error} onRetry={refetch} />
          ) : (
            <>
              <CatalogToolbar
                query={query}
                onQueryChange={setQuery}
                sortType={sortType}
                onSortChange={setSortType}
              />
              <ProductsGrid products={visibleProducts} onReset={resetFilters} />
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default CatalogPage;
