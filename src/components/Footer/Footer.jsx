import Brand from "../Header/Brand";
import FooterColumn from "./FooterColumn";
import { useSiteData } from "../../hooks/useAdminContent";

function Footer() {
  const { data } = useSiteData();
  const columns = data?.footerColumns ?? [];
  const brandName = data?.brandName ?? "PC Shop";
  const footer = data?.footer;

  return (
    <footer className="border-t border-gray-200 bg-black">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Brand name={brandName} />
            <p className="mt-4 max-w-xs text-sm leading-6 text-gray-500">
              {footer?.description ?? "Учебный интернет-магазин комплектующих."}
            </p>
          </div>

          {columns.map((column) => (
            <FooterColumn
              key={column.id}
              title={column.title}
              links={column.links}
            />
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-gray-200 pt-6 text-xs text-gray-500 md:flex-row md:justify-between">
          <p>{footer?.copyright ?? "© PC Shop"}</p>
          <p>{footer?.stack ?? "React · Vite"}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;