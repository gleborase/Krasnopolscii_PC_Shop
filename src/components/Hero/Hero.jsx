import HeroContent from "./HeroContent";
import HeroMedia from "./HeroMedia";

function Hero() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:py-20">
        <HeroContent
          label="Новая коллекция · 2026"
          title="Вещи, которые служат долго"
          description="Электроника, одежда, товары для дома и спорта — отобранные вручную позиции с честными характеристиками и быстрой доставкой."
        />

        <HeroMedia image="/images/pcimage.webp" productCount={9} />
      </div>
    </section>
  );
}

export default Hero;
