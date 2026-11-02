import HeroActions from "./HeroActions.jsx";

function HeroContent({ label, title, description }) {
  return (
    <div className="max-w-xl">
      <p className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-gray-500">
        {label}
      </p>

      <h1 className="max-w-lg text-5xl font-medium leading-[1.05] tracking-tight text-gray-950">
        {title}
      </h1>

      <p className="mt-5 max-w-lg text-base leading-7 text-gray-500">
        {description}
      </p>

      <HeroActions />
    </div>
  );
}

export default HeroContent;
