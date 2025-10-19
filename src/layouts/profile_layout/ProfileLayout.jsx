import { Outlet } from "react-router";
import ProfileSidebar from "./ProfileSidebar";

function ProfileLayout() {
  return (
    <div className="flex min-h-screen">
      <aside className="sticky top-0 left-0 w-[250px] h-screen">
        <ProfileSidebar />
      </aside>

      <main className="bg-gray-50 flex-1">
        <div className="p-4 shadow-lg sticky top-0 z-9">Xin chào, Long</div>
        <Outlet />
      </main>
    </div>
  );
}

export default ProfileLayout;
