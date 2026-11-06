import NavItem from "./NavItem";

function Navigation({ onNavigate }) {
  const navigationItems = [
    { label: "Главная", path: "/" },
    { label: "Комплектующие", path: "/products" },
  ];

  return (
    <nav className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
      {navigationItems.map((item) => (
        <NavItem
          key={item.path}
          label={item.label}
          path={item.path}
          onClick={onNavigate}
        />
      ))}
    </nav>
  );
}

export default Navigation;