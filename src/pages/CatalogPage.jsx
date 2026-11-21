import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import FiltersPanel from "../components/Catalog/FiltersPanel";
import ActiveFilters from "../components/Catalog/ActiveFilters";
import CatalogToolbar from "../components/Catalog/CatalogToolbar";
import ProductsGrid from "../components/Catalog/ProductsGrid";
import Pagination from "../components/Catalog/Pagination";
import LoadingSkeleton from "../components/UI/LoadingSkeleton";
import ErrorMessage from "../components/UI/ErrorMessage";
import { useProducts } from "../hooks/useProducts";
import { useCatalogFilters } from "../hooks/useCatalogFilters";
import { useCategories } from "../hooks/useCategories";
import { filterProducts } from "../utils/filterProducts";
import { getBrands, getCounts } from "../utils/catalogStats";

const PAGE_SIZE = 6;

function CatalogPage() {
  const { products, isLoading, error, refetch } = useProducts();
  const { filters, dispatch, activeCount } = useCatalogFilters();
  const { categories } = useCategories();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";

  const brands = useMemo(() => getBrands(products), [products]);
  const counts = useMemo(() => getCounts(products), [products]);

  const visibleProducts = useMemo(
    () => filterProducts(products, { ...filters, query }),
    [products, filters, query]
  );

  const totalPages = Math.max(1, Math.ceil(visibleProducts.length / PAGE_SIZE));
  const currentPage = Math.min(filters.page, totalPages);
  const pageProducts = visibleProducts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  function setQuery(value) {
    setSearchParams(value ? { q: value } : {}, { replace: true });
    dispatch({ type: "setPage", value: 1 });
  }

  function changePage(page) {
    dispatch({ type: "setPage", value: page });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetAll() {
    dispatch({ type: "reset" });
    setSearchParams({}, { replace: true });
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12">
      <h1 className="text-3xl font-semibold text-gray-900">Каталог комплектующих</h1>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[16rem_1fr]">
        <div className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:self-start lg:overflow-y-auto">
          <button
            type="button"
            onClick={() => setIsFiltersOpen((value) => !value)}
            aria-expanded={isFiltersOpen}
            className="mb-3 flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-800 lg:hidden"
          >
            <span className="flex items-center gap-2">
              <SlidersHorizontal className="size-4" />
              Фильтры{activeCount > 0 && ` (${activeCount})`}
            </span>
            <ChevronDown
              className={`size-4 transition-transform ${isFiltersOpen ? "rotate-180" : ""}`}
            />
          </button>

          <div className={`${isFiltersOpen ? "block" : "hidden"} lg:block`}>
            <FiltersPanel
              filters={filters}
              dispatch={dispatch}
              brands={brands}
              counts={counts}
              categories={categories.map((category) => category.name)}
              activeCount={activeCount}
              onReset={resetAll}
            />
          </div>
        </div>

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
              <ProductsGrid
                products={pageProducts}
                total={visibleProducts.length}
                onReset={resetAll}
              />
              <Pagination
                page={currentPage}
                totalPages={totalPages}
                onChange={changePage}
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default CatalogPage;