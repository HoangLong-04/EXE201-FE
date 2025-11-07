import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import PrivateApi from "../../services/PrivateApi";
import { toast } from "react-toastify";
// import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "../paymentForm/PaymentForm";
import CircularProgress from "@mui/material/CircularProgress";

function TierReward({
  title,
  description,
  amount,
  quantity,
  tierId,
  projectId,

  creatorName,
}) {
  // const [clientSecret, setClientSecret] = useState(null);
  // const [publishableKey, setPublishableKey] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const handleDonateTier = async () => {
    setLoading(true);
    try {
      const response = await PrivateApi.donateProject(projectId, {
        rewardTierId: tierId,
      });
      if (response?.data?.paymentUrl) {
        toast.success("Tạo yêu cầu thanh toán thành công!");
        window.location.href = response.data.paymentUrl;
      } else {
        toast.error("Không tìm thấy liên kết thanh toán.");
      }
      // setClientSecret(response.data.clientSecret);
      // setPublishableKey(response.data.publishableKey);
      toast.success("Tạo yêu cầu thanh toán thành công!");
    } catch (error) {
      console.error(error);
      toast.error("Tạo yêu cầu thất bại");
    } finally {
      setLoading(false);
    }
  };
  // if (clientSecret && publishableKey) {
  //   const stripePromise = loadStripe(publishableKey);

  //   return (
  //     <div
  //       className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
  //       onClick={() => {
  //         // Khi click ra ngoài => hủy form thanh toán
  //         setClientSecret(null);
  //         setPublishableKey(null);
  //       }}
  //     >
  //       <div
  //         className="bg-white/50 rounded-2xl shadow-xl max-w-md w-full p-6 relative"
  //         onClick={(e) => e.stopPropagation()} // Ngăn sự kiện click lan ra ngoài
  //       >
  //         <button
  //           onClick={() => {
  //             setClientSecret(null);
  //             setPublishableKey(null);
  //           }}
  //           className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition"
  //         >
  //           ✕
  //         </button>

  //         <Elements stripe={stripePromise}>
  //           <div className="text-center mb-6">
  //             <h2 className="text-2xl font-bold text-gray-800">Thanh toán</h2>
  //             <p className="text-sm text-gray-500">
  //               Nhập thông tin thẻ để hoàn tất ủng hộ
  //             </p>
  //           </div>

  //           <PaymentForm clientSecret={clientSecret} />
  //         </Elements>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="border border-pink-200 rounded-2xl shadow-md p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-semibold text-pink-600 mb-2">{title}</h3>
        <p className="text-gray-700 text-sm mb-3">{description}</p>

        <div className="space-y-1 text-sm text-gray-600">
          <p>
            💰 <span className="font-medium">Mức donate:</span>{" "}
            {amount?.toLocaleString("vi-VN")} VND
          </p>
          <p>
            📦 <span className="font-medium">Số lượng:</span> {quantity}
          </p>
        </div>
      </div>

      {user.userProfile.fullName === creatorName ? null : (
        <button
          disabled={loading}
          onClick={handleDonateTier}
          className="mt-4 bg-pink-500 text-white font-medium py-2 flex items-center justify-center rounded-full hover:bg-pink-600 transition cursor-pointer"
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Ủng hộ ngay"
          )}
        </button>
      )}
    </div>
  );
}

export default TierReward;
