import { Link, useLocation, useNavigate } from "react-router";
import Logo from "../../assets/logo-exe.png";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { useAuth } from "../../hooks/useAuth";

function AdminSidebar() {
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: "/admin/dashboard", label: "Tổng quan" },
    { path: "/admin/post", label: "Bài đăng" },
    { path: "/admin/web-donator", label: "Người ủng hộ" },
    { path: "/admin/user-management", label: "Người dùng" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/user/home");
  };
  return (
    <div className="bg-amber-300 flex flex-col items-center min-h-[100dvh] py-6 px-4 shadow-lg">
      <div className="mb-8">
        <img width={120} src={Logo} alt="Logo" />
      </div>

      <nav className="flex flex-col gap-3 w-full relative min-h-[100dvh]">
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
        <div
          onClick={handleLogout}
          className="hover:underline hover:text-blue-500 transition cursor-pointer absolute top-[80%] flex items-center justify-center gap-2 left-[20%]"
        >
          <span>
            <PowerSettingsNewIcon />
          </span>
          <span>Đăng xuất</span>
        </div>
      </nav>
    </div>
  );
}

export default AdminSidebar;
