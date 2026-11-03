import Brand from "./Brand";
import Navigation from "./Navigation";
import HeaderActions from "./HeaderActions";

function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <div className="flex items-center gap-8">
          <Brand name="PC Shop" />

          <Navigation />
        </div>

        <HeaderActions />
      </div>
    </header>
  );
}

export default Header;
