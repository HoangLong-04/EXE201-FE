import dayjs from "dayjs";
import { User, Mail, Phone, MapPin, School, X } from "lucide-react";

function UserModal({ user, onClose, open, changeStatus }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      {/* Modal box */}
      <div className="max-w-xl w-[90%] bg-white shadow-xl rounded-2xl border border-gray-100 p-6 relative animate-fadeIn">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 transition"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="text-gray-500 w-10 h-10" />
            )}
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              {user.fullName}
            </h2>
            <p className="text-gray-500">{user.role}</p>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-gray-700">
            <Mail className="w-5 h-5 text-blue-500" />
            <span>{user.email}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-700">
            <Phone className="w-5 h-5 text-green-500" />
            <span>{user.phone || "Chưa cập nhật"}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-700">
            <MapPin className="w-5 h-5 text-red-500" />
            <span>{user.address || "Chưa cập nhật"}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-700">
            <School className="w-5 h-5 text-purple-500" />
            <span>{user.school || "Chưa cập nhật"}</span>
          </div>

          {/* Status */}
          <div>
            <span
              className={`px-3 py-1 text-sm rounded-full ${
                user.isActive
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {user.isActive ? "Đang hoạt động" : "Không hoạt động"}
            </span>
          </div>

          {/* Created At */}
          <div className="text-sm text-gray-500">
            Ngày tạo: {dayjs(user.createdAt).format("DD/MM/YYYY")}
          </div>
        </div>

        {/* Bottom close button */}
        <div className="mt-6 flex justify-end gap-5 items-center">
          {/* Label */}
          <span className="text-gray-700 font-medium">Trạng thái:</span>

          {/* Switch toggle */}
          <div
            onClick={() => changeStatus(user.id)}
            className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition 
      ${user.isActive ? "bg-green-500" : "bg-gray-400"}`}
          >
            <div
              className={`bg-white w-6 h-6 rounded-full shadow-md transform transition 
        ${user.isActive ? "translate-x-7" : "translate-x-0"}`}
            ></div>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserModal;
