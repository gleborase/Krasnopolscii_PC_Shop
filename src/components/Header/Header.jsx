import { useState } from "react";
import { Menu, X } from "lucide-react";
import Brand from "./Brand";
import Navigation from "./Navigation";
import HeaderActions from "./HeaderActions";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3 md:px-6">
        <div className="flex items-center justify-between gap-4 md:gap-8">
          <Brand name="PC Shop" />

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Меню"
            aria-expanded={isOpen}
            className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 md:hidden"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <div
          className={`${
            isOpen ? "flex" : "hidden"
          } w-full flex-col gap-4 pt-4 md:flex md:w-auto md:flex-row md:items-center md:gap-8 md:pt-0`}
        >
          <Navigation onNavigate={() => setIsOpen(false)} />
          <HeaderActions />
        </div>
      </div>
    </header>
  );
}

export default Header;