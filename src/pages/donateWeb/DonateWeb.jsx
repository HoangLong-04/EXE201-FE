import React, { useState } from "react";
import PrivateApi from "../../services/PrivateApi";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import CircularProgress from "@mui/material/CircularProgress";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "../../components/paymentForm/PaymentForm";

function DonateWeb() {
  const [form, setForm] = useState({
    amount: "",
    isAnonymous: false,
    message: "",
  });

  // const [clientSecret, setClientSecret] = useState(null);
  // const [publishableKey, setPublishableKey] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const LoadingSpinner = () => (
    <svg
      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );

  const handleDonate = async (e) => {
    e.preventDefault();
    if (!form.amount || form.amount < 10000) {
      toast.error("Vui lòng nhập số tiền ủng hộ hợp lệ (tối thiểu 10,000 VND).");
      return;
    }

    setLoading(true);
    try {
      const res = await PrivateApi.donateForWeb(form);
      if (res?.data?.paymentUrl) {
        toast.success("Tạo yêu cầu thanh toán thành công!");
        window.location.href = res.data.paymentUrl;
      } else {
        toast.error("Không tìm thấy liên kết thanh toán.");
      }
      // setClientSecret(res.data.clientSecret);
      // setPublishableKey(res.data.publishableKey);
      toast.success("Tạo yêu cầu thanh toán thành công!");
    } catch (err) {
      console.error(err);
      toast.error("Tạo yêu cầu thất bại");
    } finally {
      setLoading(false);
    }
  };

  // if (clientSecret && publishableKey) {
  //   const stripePromise = loadStripe(publishableKey);
  //   return (
  //     <div className="flex items-center justify-center min-h-[80vh] bg-gray-50">
  //       <Elements stripe={stripePromise}>
  //         <div className="max-w-xl w-full mx-auto p-4 md:p-8 bg-white rounded-xl shadow-2xl border border-gray-100">
  //           <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
  //             Hoàn tất thanh toán
  //           </h2>
  //           {/* Truyền các thông tin cần thiết vào PaymentForm */}
  //           <PaymentForm clientSecret={clientSecret} form={form} />
  //         </div>
  //       </Elements>
  //     </div>
  //   );
  // }

  return (
    <div className="flex justify-center pt-12 pb-20 min-h-screen bg-gray-50">
      <div className="max-w-lg w-full mx-4 bg-gradient-to-b from-white to-green-50 p-6 sm:p-8 rounded-3xl shadow-xl border border-green-100 space-y-6 transition-all duration-300 hover:shadow-2xl">
        <h2 className="text-3xl font-extrabold text-center text-green-700">
          Ủng hộ dự án 💚
        </h2>

        <form onSubmit={handleDonate} className="space-y-6">
          {/* Số tiền */}
          <div>
            <label
              htmlFor="amount"
              className="block font-semibold text-gray-700 mb-2"
            >
              Số tiền (VND)
            </label>
            <input
              id="amount"
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              className="w-full border border-green-200 rounded-xl px-4 py-3 outline-none bg-white 
                         text-gray-900 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all 
                         text-lg font-mono"
              placeholder="Tối thiểu 10.000 VND"
              min="10000"
              required
            />
          </div>

          <div className="flex items-center">
            <input
              id="isAnonymous"
              type="checkbox"
              name="isAnonymous"
              checked={form.isAnonymous}
              onChange={handleChange}
              className="w-5 h-5 accent-green-600 rounded focus:ring-green-400 cursor-pointer"
            />
            <label
              htmlFor="isAnonymous"
              className="text-gray-700 ml-3 select-none cursor-pointer"
            >
              Ủng hộ ẩn danh (Không hiển thị tên bạn)
            </label>
          </div>

          <div>
            <label
              htmlFor="message"
              className="block font-semibold text-gray-700 mb-2"
            >
              Lời nhắn (Tùy chọn)
            </label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={3}
              className="w-full border border-green-200 rounded-xl px-4 py-3 outline-none bg-white 
                         text-gray-800 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all resize-none"
              placeholder="Gửi lời nhắn động viên cho dự án..."
            />
          </div>

          <button
            type="submit"
            disabled={loading || !form.amount || form.amount < 1000}
            className={`w-full flex justify-center items-center text-white font-bold py-3 rounded-xl 
                        transition-all duration-300 transform text-lg
                        ${
                          loading || !form.amount || form.amount < 1000
                            ? "bg-green-400 cursor-not-allowed opacity-80"
                            : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 active:scale-[0.98] shadow-lg hover:shadow-xl cursor-pointer"
                        }`}
            aria-busy={loading}
          >
            {loading ? (
              <LoadingSpinner />
            ) : (
              <>
                💸 <span className="ml-2">Tiến hành Thanh toán</span>
              </>
            )}
          </button>
        </form>

        <p className="text-center text-xs text-gray-500 mt-4 pt-2 border-t border-green-100">
          Mọi ủng hộ của bạn giúp ZENTIVE phát triển bền vững hơn 🌱
        </p>
      </div>
    </div>
  );
}

export default DonateWeb;
