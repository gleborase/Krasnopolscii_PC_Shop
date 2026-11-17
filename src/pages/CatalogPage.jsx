import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import FiltersPanel from "../components/Catalog/FiltersPanel";
import ActiveFilters from "../components/Catalog/ActiveFilters";
import CatalogToolbar from "../components/Catalog/CatalogToolbar";
import ProductsGrid from "../components/Catalog/ProductsGrid";
import LoadingSkeleton from "../components/UI/LoadingSkeleton";
import ErrorMessage from "../components/UI/ErrorMessage";
import { useProducts } from "../hooks/useProducts";
import { useCatalogFilters } from "../hooks/useCatalogFilters";
import { filterProducts } from "../utils/filterProducts";
import { getBrands, getCounts } from "../utils/catalogStats";

function CatalogPage() {
  const { products, isLoading, error, refetch } = useProducts();
  const { filters, dispatch, activeCount } = useCatalogFilters();

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";

  const brands = useMemo(() => getBrands(products), [products]);
  const counts = useMemo(() => getCounts(products), [products]);

  const visibleProducts = useMemo(
    () => filterProducts(products, { ...filters, query }),
    [products, filters, query]
  );

  function setQuery(value) {
    setSearchParams(value ? { q: value } : {}, { replace: true });
  }

  function resetAll() {
    dispatch({ type: "reset" });
    setSearchParams({}, { replace: true });
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <h1 className="text-3xl font-semibold text-gray-900">Каталог комплектующих</h1>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[16rem_1fr]">
        <FiltersPanel
          filters={filters}
          dispatch={dispatch}
          brands={brands}
          counts={counts}
          activeCount={activeCount}
          onReset={resetAll}
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
                sortType={filters.sortType}
                onSortChange={(value) => dispatch({ type: "setSortType", value })}
              />
              <ActiveFilters filters={filters} dispatch={dispatch} onReset={resetAll} />
              <ProductsGrid products={visibleProducts} onReset={resetAll} />
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default CatalogPage;