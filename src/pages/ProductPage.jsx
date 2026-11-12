import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useProduct } from "../hooks/useProduct";
import ProductPrice from "../components/Products/ProductPrice";
import ProductPageSkeleton from "../components/UI/ProductPageSkeleton";
import ErrorMessage from "../components/UI/ErrorMessage";

function ProductPage() {
  const { id } = useParams();
  const { product, isLoading, isNotFound, error, refetch } = useProduct(id);

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <Link
        to="/products"
        className="mb-6 inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-950"
      >
        <ArrowLeft className="size-4" />В каталог
      </Link>

      {isLoading ? (
        <ProductPageSkeleton />
      ) : isNotFound ? (
        <div className="rounded-xl border border-gray-200 bg-white p-10 text-center">
          <h1 className="text-2xl font-semibold text-gray-900">Товар не найден</h1>
          <p className="mt-2 text-sm text-gray-500">
            Товара с номером {id} нет в каталоге.
          </p>
        </div>
      ) : error ? (
        <ErrorMessage message={error} onRetry={refetch} />
      ) : (
        <div className="grid gap-8 md:grid-cols-2">
          <img
            src={product.image}
            alt={product.title}
            className="h-80 w-full rounded-xl object-cover"
          />

          <div className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-[0.15em] text-gray-500">
              {product.category}
            </p>
            <h1 className="text-3xl font-semibold text-gray-900">{product.title}</h1>
            <ProductPrice price={product.price} />
            <p className="mt-2 text-sm text-gray-500">{product.description}</p>
            <button
              type="button"
              className="mt-4 w-fit rounded-lg bg-emerald-900 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-800"
            >
              В корзину
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default ProductPage;