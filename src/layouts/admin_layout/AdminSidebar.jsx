import { Link, useLocation } from "react-router";
import Logo from "../../assets/logo-exe.png";

function AdminSidebar() {
  const location = useLocation();

  const navItems = [
    { path: "/admin/dashboard", label: "Tổng quan" },
    { path: "/admin/post", label: "Bài đăng" },
    { path: "/admin/user", label: "Người dùng" },
  ];
  return (
    <div className="bg-amber-300 flex flex-col items-center min-h-[100dvh] py-6 px-4 shadow-lg">
      <div className="mb-8">
        <img width={120} src={Logo} alt="Logo" />
      </div>

      <nav className="flex flex-col gap-3 w-full">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`px-4 py-2 rounded-lg text-center font-medium transition 
              hover:bg-amber-400 hover:text-white
              ${
                location.pathname === item.path
                  ? "bg-black text-white"
                  : "text-gray-800"
              }
            `}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default AdminSidebar;
