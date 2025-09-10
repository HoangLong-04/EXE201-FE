import React, { useState } from "react";
import Logo from "../../assets/logo-exe.png";
import { Link } from "react-scroll";
import { useNavigate } from "react-router";

function Navbar() {
  const [active, setActive] = useState("home");

  const navbarItems = [
    { id: "home", label: "Trang chủ" },
    { id: "info", label: "Giới thiệu" },
    { id: "film", label: "Phim" },
    { id: "design", label: "Thiết kế" },
    { id: "game", label: "Game" },
  ];

  const navigate = useNavigate()
  return (
    <div className="bg-red-500/50 shadow-lg flex justify-between items-center gap-5 backdrop-blur-sm z-99 fixed top-0 right-0 left-0">
      <div>
        <img width={200} height={200} src={Logo} alt="logo" />
      </div>
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
              active === item.id ? "bg-red-500 text-white" : "text-black"}
            hover:scale-110 font-medium`}
          >
            {item.label}
          </Link>
        ))}
      </div>
      <div className="flex gap-2 mr-1">
        <button onClick={() => navigate('/register')} className="bg-black p-2 rounded-full cursor-pointer hover:bg-amber-700 transition text-white">
          Đăng ký
        </button>
        <button onClick={() => navigate('/login')} className="bg-yellow-500 p-2 rounded-full cursor-pointer hover:bg-amber-700 transition text-white">
          Đăng nhập
        </button>
      </div>
    </div>
  );
}

export default Navbar;
