import { Link } from "react-router-dom";

function HeaderSection({ label, title, linkText, linkPath }) {
  return (
    <div className="mb-8 flex items-end justify-between">
      <div>
        <p className="mb-2 text-xs uppercase tracking-[0.2em] text-gray-500">
          {label}
        </p>
        <h2 className="text-4xl font-medium text-gray-950">{title}</h2>
      </div>

      <Link
        to={linkPath}
        className="text-sm text-gray-500 transition-colors hover:text-gray-900"
      >
        {linkText} →
      </Link>
    </div>
  );
}

export default HeaderSection;
