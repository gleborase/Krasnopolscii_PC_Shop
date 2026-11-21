import ErrorMessage from "../../components/UI/ErrorMessage";
import { useCustomers } from "../../hooks/useAdminContent";

function AdminCustomers() {
  const { data, isLoading, error, refetch } = useCustomers();
  const customers = data ?? [];

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Список покупателей</h2>
        <p className="mt-1 text-sm text-gray-500">Информация о покупателях магазина.</p>
      </div>

      {isLoading ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-sm text-gray-500">
          Загрузка покупателей...
        </div>
      ) : error ? (
        <ErrorMessage message={error} onRetry={refetch} />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full min-w-[650px] text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-5 py-4">Покупатель</th>
                <th className="px-5 py-4">Email</th>
                <th className="px-5 py-4">Заказы</th>
                <th className="px-5 py-4">Статус</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {customers.map((customer) => (
                <tr key={customer.id} className="text-gray-700">
                  <td className="px-5 py-4 font-semibold text-gray-900">{customer.name}</td>
                  <td className="px-5 py-4">{customer.email}</td>
                  <td className="px-5 py-4">{customer.orders}</td>
                  <td className="px-5 py-4">{customer.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default AdminCustomers;
