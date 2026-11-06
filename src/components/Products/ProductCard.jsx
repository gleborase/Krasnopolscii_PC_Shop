import { Link } from "react-router-dom";
import CategoryImage from "../Categories/CategoryImage";
import ProductPrice from "./ProductPrice";

function ProductCard({ title, price, image, category, path }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white">
      <Link to={path}>
        <CategoryImage src={image} alt={title} />
      </Link>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <p className="text-xs uppercase tracking-[0.15em] text-gray-500">
          {category}
        </p>
        <h3 className="text-sm font-medium text-gray-900">{title}</h3>

        <div className="mt-auto flex items-center justify-between pt-4">
          <ProductPrice price={price} />
          <button
            type="button"
            className="rounded-lg bg-emerald-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-800"
          >
            В корзину
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
