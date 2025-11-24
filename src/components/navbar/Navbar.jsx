import React, { useState } from "react";
import Logo from "../../assets/logo-exe.png";
import { Link } from "react-scroll";
import { useLocation, useNavigate } from "react-router";
import PersonIcon from "@mui/icons-material/Person";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";

function Navbar() {
  const [active, setActive] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { logout, user } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const navbarItems = [
    { id: "home", label: "Trang chủ" },
    { id: "info", label: "Giới thiệu" },
    { id: "film", label: "Phim" },
    { id: "design", label: "Thiết kế" },
    { id: "game", label: "Game" },
  ];

  const handleLogout = () => {
    logout();
    toast.success("Đã đăng xuất");
    navigate("/user/home");
  };

  // Hàm xử lý đóng menu sau khi click (cho mobile)
  const handleNavLinkClick = (id) => {
    setActive(id);
    setIsMenuOpen(false);
  };

  const specialPaths = [
    "/user/add-project",
    "/user/profile",
    "/donate-web",
    "/user/project-detail",
  ];
  const isSpecialPage = specialPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <div className="bg-white/90 shadow-lg flex justify-between items-center px-4 lg:px-8 py-3 backdrop-blur-sm z-50">
      <div
        className="cursor-pointer flex-shrink-0"
        onClick={() => navigate("/user/home")}
      >
        <img
          width={120}
          height={120}
          src={Logo}
          alt="logo"
          className="w-[120px] h-auto lg:w-[200px]"
        />
      </div>

      {!isSpecialPage ? (
        <div className="hidden lg:flex gap-4 items-center bg-white/50 rounded-full p-2 h-fit">
          {navbarItems.map((item) => (
            <Link
              key={item.id}
              to={item.id}
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              onSetActive={() => setActive(item.id)}
              className={`cursor-pointer px-4 py-2 rounded-full transition-all duration-300 ease-in-out transform text-lg
                ${
                  active === item.id
                    ? "bg-red-500 text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                }
                hover:scale-105 font-medium whitespace-nowrap`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      ) : null}

      <div className="flex items-center gap-4">
        {user ? (
          /* Đã đăng nhập */
          <div className="flex items-center gap-5">
            <button
              title="Hồ sơ cá nhân"
              onClick={() => navigate("/profile/info")}
              className="relative bg-red-500 h-10 w-10 rounded-full flex justify-center items-center cursor-pointer overflow-hidden group flex-shrink-0"
            >
              <PersonIcon className="text-white z-10 w-6 h-6" />
              <span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent 
                  translate-x-[-100%] group-hover:translate-x-[100%] 
                  transition-transform duration-300 ease-in-out"
              ></span>
            </button>

            <span
              onClick={handleLogout}
              className="hidden lg:block hover:underline hover:text-blue-500 transition cursor-pointer text-sm font-medium"
            >
              Đăng xuất
            </span>
          </div>
        ) : (
          <div className="flex gap-2 text-sm font-medium flex-shrink-0">
            <button
              onClick={() => navigate("/register")}
              className="bg-black p-2 px-3 rounded-full cursor-pointer hover:bg-amber-700 transition text-white"
            >
              Đăng ký
            </button>
            <button
              onClick={() => navigate("/login")}
              className="bg-yellow-500 p-2 px-3 rounded-full cursor-pointer hover:bg-amber-700 transition text-white"
            >
              Đăng nhập
            </button>
          </div>
        )}

        {!isSpecialPage && (
          <button
            className="lg:hidden text-gray-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <CloseIcon className="w-6 h-6" />
            ) : (
              <MenuIcon className="w-6 h-6" />
            )}
          </button>
        )}
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && !isSpecialPage && (
        <div className="lg:hidden absolute top-[65px] left-0 w-full bg-white/95 shadow-xl flex flex-col p-4 z-40">
          {navbarItems.map((item) => (
            <Link
              key={item.id}
              to={item.id}
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              onSetActive={() => setActive(item.id)}
              onClick={() => handleNavLinkClick(item.id)}
              className={`block cursor-pointer px-4 py-3 text-lg font-medium transition-colors
                ${
                  active === item.id
                    ? "text-red-600 bg-red-50"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              {item.label}
            </Link>
          ))}
          {user && (
            <span
              onClick={handleLogout}
              className="block px-4 py-3 text-lg font-medium text-blue-500 hover:bg-gray-100 cursor-pointer"
            >
              Đăng xuất
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;
