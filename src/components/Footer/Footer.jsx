import Brand from "../Header/Brand";
import FooterColumn from "./FooterColumn";

function Footer() {
  const columns = [
    {
      id: 1,
      title: "Каталог",
      links: [
        { label: "Все комплектующие", path: "/products" },
        { label: "Конструктор ПК", path: "/builder" },
        { label: "Новинки", path: "/products" },
      ],
    },
    {
      id: 2,
      title: "Покупателям",
      links: [
        { label: "Корзина", path: "/cart" },
        { label: "Вход", path: "/login" },
        { label: "Регистрация", path: "/register" },
      ],
    },
    {
      id: 3,
      title: "Магазин",
      links: [
        { label: "Админ-панель", path: "/admin" },
        { label: "Управление товарами", path: "/admin/products" },
        { label: "Категории", path: "/admin/categories" },
      ],
    },
  ];

  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Brand name="PC Shop" />
            <p className="mt-4 max-w-xs text-sm leading-6 text-gray-500">
              Учебный интернет-магазин комплектующих с конструктором
              совместимых сборок на React.
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
          <p>© 2026 PC Shop. Учебный проект.</p>
          <p>React · Tailwind CSS · Vite</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;