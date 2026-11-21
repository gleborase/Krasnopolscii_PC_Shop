import HeaderSection from "./HeaderSection";
import CategoryItem from "./CategoryItem";
import { useSiteData } from "../../hooks/useAdminContent";

function CategoriesSection() {
  const { data } = useSiteData();
  const categories = data?.popularCategories ?? [];

  return (
    <section className="bg-stone-50">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <HeaderSection
          label="Категории"
          title="Популярные категории"
          linkText="Весь каталог"
          linkPath="/products"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((item) => (
            <CategoryItem
              key={item.id}
              title={item.title}
              image={item.image}
              path={item.path}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategoriesSection;
