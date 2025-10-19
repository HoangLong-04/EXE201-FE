import { motion } from "framer-motion";
import { CheckCircle2, Home, Gift } from "lucide-react";
import { useLocation, useNavigate } from "react-router";

function SuccessPayment() {
  const navigate = useNavigate();
  const location = useLocation();

  // Lấy thông tin từ query hoặc state nếu bạn truyền lúc navigate
  const amount = location.state?.amount || 0;
  const message = location.state?.message || "Cảm ơn bạn đã ủng hộ 💚";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-white px-6 py-10">
      {/* Hiệu ứng vòng tròn */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 10 }}
        className="bg-green-100 rounded-full p-6 mb-6 shadow-lg"
      >
        <CheckCircle2 className="text-green-600 w-20 h-20" />
      </motion.div>

      {/* Nội dung chính */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-bold text-green-700 mb-2 text-center"
      >
        Thanh toán thành công!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-gray-600 text-center max-w-md mb-6"
      >
        {message}
      </motion.p>

      {/* Thông tin giao dịch */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white shadow-md rounded-2xl p-5 w-full max-w-md text-gray-700"
      >
        {/* <div className="flex justify-between py-2 border-b">
          <span>Số tiền:</span>
          <span className="font-semibold text-green-600">
            {amount.toLocaleString("vi-VN")} ₫
          </span>
        </div> */}
        <div className="flex justify-between py-2 border-b">
          <span>Trạng thái:</span>
          <span className="font-semibold text-green-600">Đã thanh toán</span>
        </div>
        <div className="flex justify-between py-2">
          <span>Thời gian:</span>
          <span>{new Date().toLocaleString("vi-VN")}</span>
        </div>
      </motion.div>

      {/* Nút điều hướng */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex gap-4 mt-8"
      >
        <button
          onClick={() => navigate("/")}
          className="flex cursor-pointer items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-full font-medium shadow hover:bg-green-700 transition"
        >
          <Home size={18} /> Trang chủ
        </button>

        {/* <button
          onClick={() => navigate("/projects")}
          className="flex items-center gap-2 border border-green-600 text-green-700 px-5 py-2 rounded-full font-medium hover:bg-green-50 transition"
        >
          <Gift size={18} /> Xem dự án khác
        </button> */}
      </motion.div>
    </div>
  );
}

export default SuccessPayment;
