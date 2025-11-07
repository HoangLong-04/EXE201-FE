import Button from "@mui/material/Button";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { useLocation, useNavigate } from "react-router";

function SuccessPayment() {
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const code = query.get("code");
  const id = query.get("id");
  const cancel = query.get("cancel");
  const status = query.get("status");
  const orderCode = query.get("orderCode");

  const isPaid = status === "PAID" && code === "00" && cancel === "false";

  return (
    <div className="min-h-[100vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        {isPaid ? (
          <>
            <CheckCircle2 className="text-green-500 mx-auto w-20 h-20 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Thanh toán thành công!
            </h2>
            <p className="text-gray-600 mb-6">
              Cảm ơn bạn đã ủng hộ dự án ❤️
            </p>
            <div className="text-left bg-gray-50 rounded-lg p-4 text-sm mb-6">
              <p>
                <strong>Mã giao dịch:</strong> {id}
              </p>
              <p>
                <strong>Mã đơn hàng:</strong> {orderCode}
              </p>
              <p>
                <strong>Trạng thái:</strong>{" "}
                <span className="text-green-600 font-medium">{status}</span>
              </p>
            </div>
            <Button
              className="w-full bg-green-500 hover:bg-green-600 text-white"
              onClick={() => navigate("/")}
            >
              Quay lại trang chủ
            </Button>
          </>
        ) : cancel === "true" ? (
          <>
            <XCircle className="text-red-500 mx-auto w-20 h-20 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Giao dịch đã bị hủy
            </h2>
            <p className="text-gray-600 mb-6">
              Bạn đã hủy quá trình thanh toán. Vui lòng thử lại sau.
            </p>
            <Button
              className="w-full bg-gray-500 hover:bg-gray-600 text-white"
              onClick={() => navigate("/")}
            >
              Quay lại trang chủ
            </Button>
          </>
        ) : (
          <>
            <Loader2 className="animate-spin text-yellow-500 mx-auto w-16 h-16 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Đang xử lý thanh toán...
            </h2>
            <p className="text-gray-600">
              Vui lòng chờ vài giây để hoàn tất giao dịch.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default SuccessPayment;
