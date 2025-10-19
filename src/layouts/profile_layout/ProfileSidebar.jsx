import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import HomeIcon from '@mui/icons-material/Home';

function ProfileSidebar() {
  const navigate = useNavigate()
  const location = useLocation();
  const navItems = [
    { path: "/profile/info", label: "Thông tin cá nhân" },
    { path: "/profile/post", label: "Bài đăng" },
  ];
  return (
    <div className="bg-black flex flex-col items-center min-h-[100dvh] py-6 px-4 shadow-lg">
      <div onClick={() => navigate('/user/home')} className="mb-8 flex justify-center items-center gap-2 cursor-pointer hover:-translate-y-0.5 transition ease-in-out duration-300">
        <p><HomeIcon sx={{color: 'white'}} /></p>
        <p className="text-2xl text-white font-semibold">Trang chủ</p>
      </div>

      <nav className="flex flex-col gap-3 w-full">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`px-4 py-2 rounded-lg text-center cursor-pointer font-medium transition 
              hover:bg-yellow-200/50 hover:text-black
              ${
                location.pathname === item.path
                  ? "bg-yellow-300 text-black"
                  : "text-white"
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

export default ProfileSidebar;
