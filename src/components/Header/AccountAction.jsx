import { Link } from "react-router-dom";

function AccountAction() {
  return (
    <Link
      to="/login"
      className="rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100"
    >
      Войти
    </Link>
  );
}

export default AccountAction;
