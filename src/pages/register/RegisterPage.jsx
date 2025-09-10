import React from "react";
import { useNavigate } from "react-router";

function RegisterPage() {
    const navigate = useNavigate()
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        {/* Tiêu đề */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Đăng ký
        </h2>

        {/* Form */}
        <form className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên đăng nhập
            </label>
            <input
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition"
              placeholder="Tên đăng nhập"
              type="text"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mật khẩu
            </label>
            <input
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition"
              placeholder="Mật khẩu"
              type="password"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-400 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-blue-500 transition cursor-pointer"
          >
            Đăng ký
          </button>
        </form>

        {/* Extra */}

        <p onClick={() => navigate('/login')} className="text-red-400 font-medium cursor-pointer hover:underline text-center mt-5">
          Đăng nhập
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
