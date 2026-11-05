import Hero from "../components/Hero/Hero";
import CategoriesSection from "../components/Categories/CategoriesSection";
import ProductsSection from "../components/Products/ProductsSection";
import InfoSection from "../components/Info/InfoSection";

function HomePage() {
  return (
    <>
      <Hero />
      <CategoriesSection />
      <ProductsSection />
      <InfoSection />
    </>
  );
}

export default HomePage;
