import FiltersPanel from "../components/Catalog/FiltersPanel";
import ProductsGrid from "../components/Catalog/ProductsGrid";
import { products } from "../data/products";

function CatalogPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <h1 className="text-3xl font-semibold text-gray-900">Каталог комплектующих</h1>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[16rem_1fr]">
        <FiltersPanel />
        <ProductsGrid products={products} />
      </div>
    </section>
  );
}

export default CatalogPage;