import dayjs from "dayjs";
import { useAuth } from "../../../../hooks/useAuth";
import PrivateApi from "../../../../services/PrivateApi";
import { toast } from "react-toastify";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "../../../../components/paymentForm/PaymentForm";

function DoFund({
  currentAmount,
  goal,
  creatorName,
  id,
  createAt,
  endAt,
  backer,
  status,
  tiers,
  getProjectDetail,
}) {
  // const [clientSecret, setClientSecret] = useState(null);
  // const [publishableKey, setPublishableKey] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [amountDonate, setAmountDonate] = useState(0);
  const [donate, setDonate] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    amount: "",
    quantity: "",
    deliveryDate: "",
  });
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTier = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await PrivateApi.addTierReward(id, {
        title: form.title,
        description: form.description,
        deliveryDate: form.deliveryDate,
        amount: Number(form.amount),
        quantity: Number(form.quantity),
      });
      getProjectDetail();
      setOpen(false);
      setForm({
        title: "",
        description: "",
        amount: "",
        quantity: "",
        deliveryDate: "",
      });
      toast.success("Tạo thành công");
    } catch (error) {
      console.log(error);

      toast.error("Tạo thất bại");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (id) => {
    setLoading(true);
    try {
      await PrivateApi.submitProject(id);
      getProjectDetail();
      toast.success("Gửi thành công");
    } catch (error) {
      console.log(error);
      toast.error("Gửi thất bại");
    } finally {
      setLoading(false);
    }
  };

  const handleDonate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await PrivateApi.donateProject(id, {
        amount: amountDonate,
      });
      if (res?.data?.paymentUrl) {
        toast.success("Tạo yêu cầu thanh toán thành công!");
        window.location.href = res.data.paymentUrl;
      } else {
        toast.error("Không tìm thấy liên kết thanh toán.");
      }
      // setClientSecret(res.data.clientSecret);
      // setPublishableKey(res.data.publishableKey);
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
  //       className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
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
    <div className="w-full md:w-[350px] bg-white rounded-2xl shadow-md p-6 ">
      <div className="flex flex-col items-center mb-10">
        <h2 className="text-xl font-semibold mb-4">
          {user.userProfile.fullName === creatorName
            ? "Đây là dự án của bạn"
            : "Ủng hộ dự án"}
        </h2>

        <p className="text-gray-700 mb-2">
          <span className="font-bold text-green-600">
            {currentAmount?.toLocaleString("vi-VN")}đ
          </span>{" "}
          /{goal?.toLocaleString("vi-VN")}đ
        </p>

        <div className="w-full h-5 bg-gray-200 rounded-lg overflow-hidden mb-4">
          <div
            className="h-full bg-green-500 transition-all duration-500 flex justify-center items-center text-white font-semibold"
            style={{
              width: `${Math.floor((currentAmount / goal) * 100, 100)}%`,
            }}
          >
            {Math.floor((currentAmount / goal) * 100, 100)}%
          </div>
        </div>
        {user.userProfile.fullName === creatorName ? null : (
          <button
            onClick={() => setDonate(true)}
            className="relative overflow-hidden group bg-green-600 cursor-pointer text-white px-6 py-2 rounded-full text-lg font-semibold transition hover:bg-green-700"
          >
            Quyên góp
            <span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent
               translate-x-[-100%] group-hover:translate-x-[100%]
               transition-transform duration-700 ease-in-out"
            ></span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-5 mb-15">
        <div className="font-semibold">Nhà sáng tạo:</div>
        <div>{creatorName}</div>
        <div className="font-semibold">Bắt đầu:</div>
        <div>{dayjs(createAt).format("DD/MM/YYYY")}</div>
        <div className="font-semibold">Kết thúc:</div>
        <div>{dayjs(endAt).format("DD/MM/YYYY")}</div>
        <div className="font-semibold">Số người đã quyên góp:</div>
        <div>{backer}</div>
        {user.userProfile.fullName === creatorName ? (
          <>
            <div className="font-semibold">Trạng thái:</div>
            <div>{status}</div>
          </>
        ) : null}
      </div>

      {status === "Published" || status === "Submitted" ? null : user
          .userProfile.fullName === creatorName ? (
        <div className="flex justify-center">
          {tiers?.length === 0 ? (
            <div className="flex flex-col">
              <span className="text-gray-500 text-center">
                Hãy thêm các gói trước khi gửi yêu cầu duyệt
              </span>
              <button
                onClick={() => setOpen(!open)}
                className="bg-blue-500 rounded-full p-1 text-white cursor-pointer hover:bg-blue-600 transition"
              >
                Thêm gói
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              <button
                disabled={loading}
                onClick={() => handleSubmit(id)}
                className="relative overflow-hidden group bg-green-600 cursor-pointer text-white px-6 py-2 rounded-full text-lg font-semibold transition hover:bg-green-700"
              >
                {loading ? (
                  <CircularProgress color="inherit" size={24} />
                ) : (
                  "Gửi yêu cầu duyệt"
                )}
                <span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent
               translate-x-[-100%] group-hover:translate-x-[100%]
               transition-transform duration-700 ease-in-out"
                ></span>
              </button>
              <button
                onClick={() => setOpen(!open)}
                className="bg-blue-500 rounded-full p-1 text-white cursor-pointer hover:bg-blue-600 transition"
              >
                Thêm gói
              </button>
            </div>
          )}
        </div>
      ) : null}

      {/* Form quyên góp */}
      <Dialog
        open={donate}
        onClose={() => setDonate(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          className: "rounded-2xl shadow-lg bg-white",
        }}
      >
        <DialogTitle className="text-xl font-semibold text-center border-b pb-2">
          Nhập số tiền bạn muốn ủng hộ
        </DialogTitle>

        <DialogContent dividers className="space-y-4 mt-2">
          <form
            id="subscription-form"
            onSubmit={handleDonate}
            className="space-y-4"
          >
            <div>
              <label className="block font-medium mb-1 text-gray-700">
                Số tiền (VND)
              </label>
              <input
                type="number"
                name="amount"
                value={amountDonate}
                onChange={(e) => setAmountDonate(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
                min={10000}
              />
            </div>
          </form>
        </DialogContent>

        <DialogActions className="px-6 py-3 border-t bg-gray-50">
          <Button
            onClick={() => setDonate(false)}
            variant="outlined"
            color="inherit"
            className="rounded-full px-5"
          >
            Hủy
          </Button>
          <Button
            type="submit"
            form="subscription-form"
            variant="contained"
            color="primary"
            className="!bg-pink-500 hover:!bg-pink-600 rounded-full px-5 flex justify-center items-center"
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Tiếp tục"
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Form thêm tier */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          className: "rounded-2xl shadow-lg bg-white",
        }}
      >
        <DialogTitle className="text-xl font-semibold text-center border-b pb-2">
          Tạo gói
        </DialogTitle>

        <DialogContent dividers className="space-y-4 mt-2">
          <form
            id="subscription-form"
            onSubmit={handleAddTier}
            className="space-y-4"
          >
            <div>
              <label className="block font-medium mb-1 text-gray-700">
                Tên gói
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
                placeholder="Nhập tên gói"
              />
            </div>

            <div>
              <label className="block font-medium mb-1 text-gray-700">
                Mô tả
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
                rows={3}
                placeholder="Nhập mô tả về gói này"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1 text-gray-700">
                  Số tiền (VND)
                </label>
                <input
                  type="number"
                  name="amount"
                  value={form.amount}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
                  min="20000"
                />
              </div>

              <div>
                <label className="block font-medium mb-1 text-gray-700">
                  Số lượng
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={form.quantity}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
                  min="0"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium mb-1 text-gray-700">
                Ngày giao dự kiến
              </label>
              <input
                type="date"
                name="deliveryDate"
                value={form.deliveryDate}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
              />
            </div>
          </form>
        </DialogContent>

        <DialogActions className="px-6 py-3 border-t bg-gray-50">
          <Button
            onClick={() => setOpen(false)}
            variant="outlined"
            color="inherit"
            className="rounded-full px-5"
          >
            Hủy
          </Button>
          <Button
            type="submit"
            form="subscription-form"
            variant="contained"
            color="primary"
            className="!bg-pink-500 hover:!bg-pink-600 rounded-full px-5 flex justify-center items-center"
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Tạo"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DoFund;
