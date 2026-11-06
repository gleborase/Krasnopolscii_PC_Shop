import { useParams } from "react-router-dom";

function ProductPage() {
  const { id } = useParams();
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-semibold text-gray-900">
        {id ? `Товар ${id}` : "Комплектующие"}
      </h1>
    </section>
  );
}