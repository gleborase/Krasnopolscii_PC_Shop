import HeaderSection from "../Categories/HeaderSection";
import ProductCard from "./ProductCard";

function ProductsSection() {
  const products = [
    {
      id: 1,
      category: "Видеокарты",
      title: "GeForce RTX 4070 12 ГБ",
      price: 62990,
      image: "/images/products/gpu.jpg",
      path: "/products/1",
    },
    {
      id: 2,
      category: "Накопители",
      title: "Kingston NV2 1 ТБ",
      price: 12990,
      image: "/images/products/storage.jpg",
      path: "/products/2",
    },
    {
      id: 3,
      category: "Процессоры",
      title: "Intel Core i5-12400F",
      price: 10990,
      image: "/images/products/cpu.webp",
      path: "/products/3",
    },
     {
      id: 4,
      category: "Блоки питания",
      title: "MSI MPG A850G 80+ Gold",
      price: 12990,
      image: "/images/products/powersupply.jpg",
      path: "/products/4",
    },
  ];

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <HeaderSection
          label="Каталог"
          title="Популярные товары"
          linkText="Весь каталог"
          linkPath="/products"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((item) => (
            <ProductCard
              key={item.id}
              title={item.title}
              category={item.category}
              image={item.image}
              price={item.price}
              path={item.path}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductsSection;