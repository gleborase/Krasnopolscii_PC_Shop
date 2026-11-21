import { RotateCcw, ShieldCheck, Truck } from "lucide-react";
import InfoBlock from "./InfoBlock";
import { useSiteData } from "../../hooks/useAdminContent";

const infoIcons = { Truck, ShieldCheck, RotateCcw };

function InfoSection() {
  const { data } = useSiteData();
  const infoBlocks = data?.infoBlocks ?? [];

  return (
    <section className="bg-stone-50">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="mb-6 text-2xl font-semibold text-gray-900">Почему выбирают нас</h2>
        <div className="grid grid-cols-1 gap-6 rounded-xl border border-gray-200 bg-white p-6 md:grid-cols-3">
          {infoBlocks.map((block) => (
            <InfoBlock
              key={block.id}
              icon={infoIcons[block.icon] ?? ShieldCheck}
              title={block.title}
              text={block.text}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default InfoSection;