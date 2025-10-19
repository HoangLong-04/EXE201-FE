import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router";

function AdminLayout() {
  return (
    <div className="flex min-h-[100dvh] relative">
      <aside className="w-[250px] fixed top-0 left-0">
        <AdminSidebar />
      </aside>

      <main className="flex-1 bg-gray-100 p-6 ml-[250px]">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
