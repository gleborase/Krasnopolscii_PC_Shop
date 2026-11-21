import HeroContent from "./HeroContent";
import HeroMedia from "./HeroMedia";
import { useSiteData } from "../../hooks/useAdminContent";

function Hero({ productCount }) {
  const { data } = useSiteData();
  const hero = data?.hero;
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:py-20">
        <HeroContent
          label={hero?.label ?? "Конструктор ПК"}
          title={hero?.title ?? "Собери надёжный ПК"}
          description={hero?.description ?? ""}
        />

        <HeroMedia image="/images/pcimage.webp" productCount={productCount} />
      </div>
    </section>
  );
}

export default Hero;
