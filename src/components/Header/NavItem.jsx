function NavItem({ label, path }) {
  return (
    <a
      href={path}
      className="text-sm text-gray-600 transition-colors hover:text-gray-950"
    >
      {label}
    </a>
  );
}

export default NavItem;
