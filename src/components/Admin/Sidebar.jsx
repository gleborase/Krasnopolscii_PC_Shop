
import { Link, NavLink } from "react-router-dom";
import { Store, X } from "lucide-react";
import { getAdminIcon } from "../../utils/adminIcons";

function Sidebar({ sections, isLoading, error, onRetry, isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Закрыть меню"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col overflow-y-auto border-r border-gray-200 bg-white transition-transform duration-200 md:sticky md:top-0 md:z-auto md:h-screen md:shrink-0 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-gray-200 px-6">
          <Link to="/" className="flex items-center gap-3 font-bold text-gray-900">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-900 text-white">
              <Store size={21} />
            </span>

            <span className="text-lg">
              PC Shop <span className="text-emerald-900">Admin</span>
            </span>
          </Link>

          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть меню"
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 md:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-4 py-6">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
            Управление магазином
          </p>

          <nav className="space-y-1">
            {isLoading && (
              <p className="px-3 py-2 text-sm text-gray-500">Загрузка меню...</p>
            )}
            {error && (
              <div className="px-3 py-2 text-sm text-red-400">
                <p>{error}</p>
                <button type="button" onClick={onRetry} className="mt-2 underline hover:opacity-80">
                  Попробовать снова
                </button>
              </div>
            )}
            {sections.map(({ id, path, label, icon }) => {
              const Icon = getAdminIcon(icon);
              return (
                <NavLink
                  key={id}
                  to={path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-emerald-900/15 text-emerald-900"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`
                  }
                >
                  <Icon size={19} />
                  {label}
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto border-t border-gray-200 p-4">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-gray-600 hover:bg-gray-100"
          >
            <Store size={19} />
            Вернуться в магазин
          </Link>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
