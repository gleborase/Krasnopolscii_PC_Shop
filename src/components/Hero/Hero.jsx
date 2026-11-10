import HeroContent from "./HeroContent";
import HeroMedia from "./HeroMedia";
import { products } from "../../data/products";

function Hero() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:py-20">
        <HeroContent
          label="Конструктор ПК · 2026"
          title="Собери надёжный ПК"
          description="Процессоры, видеокарты, материнские платы и память — проверенные комплектующие с честными характеристиками. Соберите ПК в конструкторе: совместимость проверяется автоматически."
        />

        <HeroMedia image="/images/pcimage.webp" productCount={products.length} />
      </div>
    </section>
  );
}

export default Hero;
