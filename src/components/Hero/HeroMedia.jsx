import ProductCounter from "./ProductCounter";

function HeroMedia({ image, productCount }) {
  return (
    <div className="relative">
      <img
        src={image}
        alt="Покупатель с товарами"
        className="h-[380px] w-full rounded-2xl object-cover"
      />

      <ProductCounter count={productCount} />
    </div>
  );
}

export default HeroMedia;
