import NavItem from "../Header/NavItem";

function FooterColumn({ title, links }) {
  return (
    <div>
      <h4 className="text-xs uppercase tracking-[0.2em] text-gray-500">
        {title}
      </h4>

      <ul className="mt-4 space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            <NavItem label={link.label} path={link.path} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FooterColumn;
