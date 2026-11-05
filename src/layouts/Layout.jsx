import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900">
      <Header />

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}

export default Layout;