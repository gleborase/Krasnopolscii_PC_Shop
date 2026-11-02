import Search from "./Search";
import AccountAction from "./AccountAction";
import CartAction from "./CartAction";

function HeaderActions() {
  return (
    <div className="flex items-center gap-4">
      <Search />

      <AccountAction />

      <CartAction count={0} />
    </div>
  );
}

export default HeaderActions;
