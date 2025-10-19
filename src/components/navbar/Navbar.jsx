import React, { useState } from "react";
import Logo from "../../assets/logo-exe.png";
import { Link } from "react-scroll";
import { useLocation, useNavigate } from "react-router";
import PersonIcon from "@mui/icons-material/Person";
import { useAuth } from "../../hooks/useAuth";

function Navbar() {
  const [active, setActive] = useState("home");

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
    navigate("/user/home");
  };

  return (
    <div className="bg-white/50 shadow-lg flex justify-between items-center gap-5 backdrop-blur-sm z-99">
      <div className="cursor-pointer" onClick={() => navigate("/user/home")}>
        <img width={200} height={200} src={Logo} alt="logo" />
      </div>
      {!["/user/add-project", "/user/profile"].includes(location.pathname) ? (
        <div className="flex gap-30 items-center bg-white/50 rounded-full p-3 h-[1,5rem]">
          {navbarItems.map((item) => (
            <Link
              key={item.id}
              to={item.id}
              spy={true} // Theo dõi khi cuộn
              smooth={true} // Cuộn mượt
              offset={-70} // Trừ chiều cao navbar
              duration={500} // Thời gian cuộn
              onSetActive={() => setActive(item.id)}
              className={`cursor-pointer px-4 py-2 rounded-full transition-all duration-300 ease-in-out transform ${
                active === item.id ? "bg-red-500 text-white" : "text-black"
              }
            hover:scale-110 font-medium`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      ) : null}

      {user ? (
        <div className="flex items-center gap-2 rounded-l-full pr-5">
          <span
            onClick={() => navigate("/profile/info")}
            className="relative bg-red-500 h-12 w-12 rounded-full flex justify-center items-center cursor-pointer overflow-hidden group"
          >
            <PersonIcon className="text-white z-10" />
            <span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent 
                   translate-x-[-100%] group-hover:translate-x-[100%] 
                   transition-transform duration-300 ease-in-out"
            ></span>
          </span>

          <span
            onClick={handleLogout}
            className="hover:underline hover:text-blue-500 transition cursor-pointer "
          >
            Đăng xuất
          </span>
        </div>
      ) : (
        <div className="flex gap-2 mr-1">
          <button
            onClick={() => navigate("/register")}
            className="bg-black p-2 rounded-full cursor-pointer hover:bg-amber-700 transition text-white"
          >
            Đăng ký
          </button>
          <button
            onClick={() => navigate("/login")}
            className="bg-yellow-500 p-2 rounded-full cursor-pointer hover:bg-amber-700 transition text-white"
          >
            Đăng nhập
          </button>
        </div>
      )}
      
    </div>
  );
}

export default Navbar;
