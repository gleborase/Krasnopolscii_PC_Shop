import {
  ArrowDownRight,
  ArrowUpRight,
  CreditCard,
  Package,
  ShoppingBag,
  Users,
} from "lucide-react";
import { getSection } from "../../data/adminSections";

const statistics = [
  { label: "Выручка", value: "125 400 ₽", change: "+12,5%", icon: CreditCard, positive: true },
  { label: "Заказы", value: "48", change: "+8,2%", icon: ShoppingBag, positive: true },
  { label: "Товары", value: "126", change: "+4 новых", icon: Package, positive: true },
  { label: "Покупатели", value: "312", change: "−2,1%", icon: Users, positive: false },
];

const recentOrders = [
  { id: "#PC-1048", customer: "Иван Петров", date: "18.11.2026", amount: "24 990 ₽", status: "Выполнен" },
  { id: "#PC-1047", customer: "Анна Смирнова", date: "18.11.2026", amount: "18 450 ₽", status: "В обработке" },
  { id: "#PC-1046", customer: "Максим Иванов", date: "17.11.2026", amount: "42 300 ₽", status: "Ожидает оплаты" },
  { id: "#PC-1045", customer: "Елена Козлова", date: "17.11.2026", amount: "9 890 ₽", status: "Выполнен" },
];

const statusStyles = {
  "Выполнен": "bg-emerald-500/15 text-emerald-400",
  "В обработке": "bg-amber-500/15 text-amber-400",
  "Ожидает оплаты": "bg-gray-100 text-gray-700",
};

function StatCard({ label, value, change, icon: Icon, positive }) {
  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">{label}</p>

        <span className="rounded-xl bg-emerald-900/15 p-2.5 text-emerald-900">
          <Icon size={20} />
        </span>
      </div>

      <p className="mt-4 text-2xl font-bold text-gray-900">{value}</p>

      <p
        className={`mt-2 flex items-center gap-1 text-xs font-medium ${
          positive ? "text-emerald-400" : "text-red-400"
        }`}
      >
        {positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        {change}
        <span className="font-normal text-gray-500">за месяц</span>
      </p>
    </article>
  );
}

function OrdersTable() {
  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="flex flex-col gap-2 border-b border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <h3 className="font-bold text-gray-900">Последние заказы</h3>
          <p className="mt-1 text-xs text-gray-500">
            Недавние операции интернет-магазина
          </p>
        </div>

        <span className="w-fit rounded-lg bg-emerald-900/15 px-3 py-1.5 text-xs font-semibold text-emerald-900">
          Всего: 48
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px] text-left text-sm">
          <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
            <tr>
              <th className="px-6 py-3 font-semibold">Заказ</th>
              <th className="px-6 py-3 font-semibold">Покупатель</th>
              <th className="px-6 py-3 font-semibold">Дата</th>
              <th className="px-6 py-3 font-semibold">Сумма</th>
              <th className="px-6 py-3 font-semibold">Статус</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {recentOrders.map((order) => (
              <tr key={order.id} className="text-gray-700 hover:bg-gray-50">
                <td className="px-6 py-4 font-semibold text-gray-900">{order.id}</td>
                <td className="px-6 py-4">{order.customer}</td>
                <td className="px-6 py-4">{order.date}</td>
                <td className="px-6 py-4 font-medium">{order.amount}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[order.status]}`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function SectionPlaceholder({ section }) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-lg font-bold text-gray-900">{section.title}</h2>

      <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
        {section.description}
      </p>

      <p className="mt-6 rounded-xl bg-gray-50 p-4 text-sm text-gray-600">
        Рабочий раздел интерфейса подготовлен. Функции управления данными
        будут добавлены на следующих этапах разработки.
      </p>
    </section>
  );
}

function AdminWorkspace({ activeSection }) {
  const section = getSection(activeSection);

  if (section.id !== "overview") {
    return <SectionPlaceholder section={section} />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-gray-900">Добро пожаловать!</h2>
        <p className="mt-1 text-sm text-gray-500">
          Краткая информация о работе интернет-магазина PC Shop. Показатели и
          заказы представлены как демонстрационные данные.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statistics.map((item) => (
          <StatCard key={item.label} {...item} />
        ))}
      </div>

      <OrdersTable />
    </div>
  );
}

export default AdminWorkspace;