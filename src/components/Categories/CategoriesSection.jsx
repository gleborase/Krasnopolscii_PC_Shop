import HeaderSection from "./HeaderSection";
import CategoryItem from "./CategoryItem";

function CategoriesSection() {
  const categories = [
    {
      id: 1,
      title: "Видеокарты",
      image: "/images/categories/gpu.jpg",
      path: "/categories/gpu",
    },
    {
      id: 2,
      title: "Процессоры",
      image: "/images/categories/cpu.webp",
      path: "/categories/cpu",
    },
    {
      id: 3,
      title: "Оперативная память",
      image: "/images/categories/ram.jpg",
      path: "/categories/ram",
    },
    {
      id: 4,
      title: "Блоки питания",
      image: "/images/categories/powersupply.jpg",
      path: "/categories/powersupply",
    },
  ];

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
