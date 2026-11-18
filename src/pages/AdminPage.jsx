import { useState } from "react";
import Sidebar from "../components/Admin/Sidebar";
import Header from "../components/Admin/Header";
import AdminWorkspace from "../components/Admin/AdminWorkspace";

function AdminPage() {
  const [activeSection, setActiveSection] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 md:flex">
      <Sidebar
        activeSection={activeSection}
        onSelect={setActiveSection}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header
          activeSection={activeSection}
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <AdminWorkspace activeSection={activeSection} />
        </main>
      </div>
    </div>
  );
}

export default AdminPage;