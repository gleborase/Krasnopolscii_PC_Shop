import { RotateCcw, ShieldCheck, Truck } from "lucide-react";
import InfoBlock from "./InfoBlock";

function InfoSection() {
  const infoBlocks = [
    { id: 1, icon: Truck, title: "Доставка 1–3 дня", text: "По всей России, бесплатно от 10 000 ₽" },
    { id: 2, icon: ShieldCheck, title: "Гарантия качества", text: "Честная гарантия на все товары 2 года" },
    { id: 3, icon: RotateCcw, title: "Возврат 30 дней", text: "Без вопросов и лишних формальностей" },
  ];

  return (
    <section className="bg-stone-50">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="mb-6 text-2xl font-semibold text-gray-900">Почему выбирают нас</h2>
        <div className="grid grid-cols-1 gap-6 rounded-xl border border-gray-200 bg-white p-6 md:grid-cols-3">
          {infoBlocks.map((block) => (
            <InfoBlock
              key={block.id}
              icon={block.icon}
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