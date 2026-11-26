import { Link } from "react-router-dom";
import ProductPrice from "./ProductPrice";

function ProductCard({ title, category, image, price, path, inStock = true }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md">
      <Link to={path} className="block overflow-hidden">
        <div className="relative">
          <img
            src={image}
            alt={title}
            className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
          {!inStock && (
            <span className="absolute left-3 top-3 rounded-full bg-gray-900/80 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-white">
              Нет в наличии
            </span>
          )}
        </div>
      </Link>

      <div className="space-y-3 p-4">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-gray-500">
          {category}
        </p>

        <Link to={path} className="block text-base font-medium leading-6 text-gray-900 hover:text-emerald-900">
          {title}
        </Link>

        <div className="flex items-center justify-between gap-3">
          <ProductPrice price={price} />
          <span className={inStock ? "text-xs font-medium text-emerald-400" : "text-xs font-medium text-gray-500"}>
            {inStock ? "В наличии" : "Под заказ"}
          </span>
        </div>

        <Link
          to={path}
          className="inline-flex items-center rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-emerald-900 hover:text-emerald-900"
        >
          Подробнее
        </Link>
      </div>
    </article>
  );
}

export default ProductCard;