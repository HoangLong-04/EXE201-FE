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

  const [clientSecret, setClientSecret] = useState(null);
  const [publishableKey, setPublishableKey] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDonate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await PrivateApi.donateForWeb(form);
      setClientSecret(res.data.clientSecret);
      setPublishableKey(res.data.publishableKey);
      toast.success("Tạo yêu cầu thanh toán thành công!");
    } catch (err) {
      console.error(err);
      toast.error("Tạo yêu cầu thất bại");
    } finally {
      setLoading(false);
    }
  };

  if (clientSecret && publishableKey) {
    const stripePromise = loadStripe(publishableKey);
    return (
      <div className="h-[45dvh]">
        <Elements stripe={stripePromise}>
          <div className="max-w-md mx-auto mt-10 bg-gray-50 p-6 rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Thanh toán</h2>
            <PaymentForm clientSecret={clientSecret} form={form} />
          </div>
        </Elements>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-12 bg-gradient-to-b from-white to-green-50 p-8 rounded-3xl shadow-lg border border-green-100 space-y-6 transition-all duration-300 hover:shadow-xl">
      <h2 className="text-3xl font-bold text-center text-green-700">
        Ủng hộ dự án 💚
      </h2>

      <form onSubmit={handleDonate} className="space-y-5">
        {/* Số tiền */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Số tiền (VND)
          </label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            className="w-full border border-green-200 rounded-xl px-4 py-3 outline-none bg-white focus:border-green-400 focus:ring-2 focus:ring-green-200 transition-all"
            placeholder="Nhập số tiền muốn ủng hộ"
            min="1000"
            required
          />
        </div>

        {/* Ẩn danh */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="isAnonymous"
            checked={form.isAnonymous}
            onChange={handleChange}
            className="w-5 h-5 accent-green-600 rounded focus:ring-green-400"
          />
          <label className="text-gray-700">Ẩn danh khi ủng hộ</label>
        </div>

        {/* Lời nhắn */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Lời nhắn
          </label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={3}
            className="w-full border border-green-200 rounded-xl px-4 py-3 outline-none bg-white focus:border-green-400 focus:ring-2 focus:ring-green-200 transition-all resize-none"
            placeholder="Gửi lời nhắn cho dự án..."
          />
        </div>

        {/* Nút submit */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center items-center text-white font-semibold py-3 rounded-xl 
        transition-all duration-300 
        ${
          loading
            ? "bg-green-400 cursor-not-allowed"
            : "bg-gradient-to-r from-green-500 cursor-pointer to-green-600 hover:from-green-600 hover:to-green-700 active:scale-95 shadow-md"
        }`}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            <>
              💚 <span className="ml-2">Ủng hộ ngay</span>
            </>
          )}
        </button>
      </form>

      {/* Text footer nhỏ */}
      <p className="text-center text-sm text-gray-500 mt-4">
        Mọi ủng hộ của bạn giúp dự án phát triển bền vững hơn 🌱
      </p>
    </div>
  );
}

export default DonateWeb;
