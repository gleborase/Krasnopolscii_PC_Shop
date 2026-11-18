import { Bell, Menu, Search } from "lucide-react";
import { getSection } from "../../data/adminSections";

function Header({ activeSection, onMenuClick }) {
  const section = getSection(activeSection);

  return (
    <header className="sticky top-0 z-30 flex min-h-20 items-center justify-between gap-4 border-b border-gray-200 bg-white px-4 py-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Открыть меню"
          className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 md:hidden"
        >
          <Menu size={22} />
        </button>

        <div>
          <p className="text-xs text-gray-500">Административная панель</p>
          <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
            {section.label}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <label className="hidden items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 sm:flex">
          <Search size={17} className="text-gray-500" />
          <input
            type="search"
            placeholder="Поиск..."
            aria-label="Поиск в панели"
            className="w-28 bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-500 md:w-40"
          />
        </label>

        <button
          type="button"
          aria-label="Уведомления"
          className="relative rounded-xl p-2.5 text-gray-600 hover:bg-gray-100"
        >
          <Bell size={20} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-emerald-900" />
        </button>

        <div className="flex items-center gap-2 border-l border-gray-200 pl-3 sm:gap-3 sm:pl-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-900/15 text-sm font-bold text-emerald-900">
            А
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-gray-900">Администратор</p>
            <p className="text-xs text-gray-500">Управление магазином</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;