import Search from "./Search";
import AccountAction from "./AccountAction";
import CartAction from "./CartAction";

function HeaderActions() {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
      <Search />

      <AccountAction />

      <CartAction count={0} />
    </div>
  );
}

export default HeaderActions;