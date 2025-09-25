import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router";

function AdminLayout() {
  return (
    <div className="flex min-h-[100dvh]">
      <aside className="w-[250px]">
        <AdminSidebar />
      </aside>

      <main className="flex-1 bg-gray-50 p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
