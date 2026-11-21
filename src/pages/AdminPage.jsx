
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Admin/Sidebar";
import Header from "../components/Admin/Header";
import { useAdminSections } from "../hooks/useAdminSections";

function AdminPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const { sections, isLoading, error, refetch } = useAdminSections();

  const activeSection =
    sections.find((section) => section.path === location.pathname) ??
    sections[0];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 md:flex">
      <Sidebar
        sections={sections}
        isLoading={isLoading}
        error={error}
        onRetry={refetch}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header
          section={activeSection}
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-7xl">
            <Outlet />
          </div>
        </main>

        <footer className="border-t border-gray-200 bg-white px-6 py-4 text-center text-xs text-gray-500">
          © 2026 PC Shop · Административная панель
        </footer>
      </div>
    </div>
  );
}

export default AdminPage;
