import ErrorMessage from "../../components/UI/ErrorMessage";
import { useSettings } from "../../hooks/useAdminContent";

function AdminSettings() {
  const { data, isLoading, error, refetch } = useSettings();
  const settings = data ?? [];

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Настройки панели</h2>
        <p className="mt-1 text-sm text-gray-500">Основные настройки интернет-магазина.</p>
      </div>

      {isLoading ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-sm text-gray-500">
          Загрузка настроек...
        </div>
      ) : error ? (
        <ErrorMessage message={error} onRetry={refetch} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {settings.map((setting) => (
            <label key={setting.id} className="rounded-2xl border border-gray-200 bg-white p-5">
              <span className="mb-2 block text-sm font-medium text-gray-700">{setting.label}</span>
              <input
                type={setting.type}
                defaultValue={setting.value}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none"
              />
            </label>
          ))}
        </div>
      )}
    </section>
  );
}

export default AdminSettings;
