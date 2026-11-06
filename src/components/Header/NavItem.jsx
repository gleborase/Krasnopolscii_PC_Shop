import { NavLink } from "react-router-dom";

function NavItem({ label, path, onClick }) {
  return (
    <NavLink
      onClick={onClick}
      to={path}
      end={path === "/"}
      className={({ isActive }) =>
        `text-sm transition-colors ${
          isActive
            ? "font-medium text-gray-950"
            : "text-gray-600 hover:text-gray-950"
        }`
      }
    >
      {label}
    </NavLink>
  );
}

export default NavItem;
