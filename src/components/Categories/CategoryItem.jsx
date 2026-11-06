import { Link } from "react-router-dom";
import CategoryImage from "./CategoryImage";
import CategoryLabel from "./CategoryLabel";
import CategoryAction from "./CategoryAction";

function CategoryItem({ title, image, path }) {
  return (
    <Link
      to={path}
      className="group block overflow-hidden rounded-xl border border-gray-200 bg-white"
    >
      <CategoryImage src={image} alt={title} />

      <div className="flex items-center justify-between px-4 py-3">
        <CategoryLabel text={title} />
        <CategoryAction />
      </div>
    </Link>
  );
}

export default CategoryItem;
