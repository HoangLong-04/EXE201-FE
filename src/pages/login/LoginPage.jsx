import { useState } from "react";
import { useNavigate } from "react-router";
import PublicApi from "../../services/PublicApi";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import CircularProgress from "@mui/material/CircularProgress";

function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await PublicApi.login(form);
      console.log(response.data.userProfile.role);

      if (response.data.userProfile.role === "Admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/home");
      }
      login(response.data);

      toast.success("Đăng nhập thành công");
    } catch (error) {
      toast.error(error.data || "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Đăng nhập
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition"
              placeholder="Email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mật khẩu
            </label>
            <input
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition"
              placeholder="Mật khẩu"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <button
            disabled={loading}
            type="submit"
            className={`w-full flex justify-center items-center bg-red-400 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-red-500 transition cursor-pointer ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-400 hover:bg-red-500"
            }`}
          >
            {loading ? (
              <CircularProgress color="inherit" size={24} />
            ) : (
              "Đăng nhập"
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          Chưa có tài khoản?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-red-400 font-medium cursor-pointer hover:underline"
          >
            Đăng ký ngay
          </span>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
