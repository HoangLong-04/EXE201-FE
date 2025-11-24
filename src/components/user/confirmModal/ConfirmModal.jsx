import React from "react";

function ConfirmModal({ open, title, message, onConfirm, onCancel }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-10">
      <div className="bg-white p-6 rounded-xl shadow-xl w-80">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-600 mt-2">{message}</p>

        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded-lg cursor-pointer hover:bg-gray-400 transition"
          >
            Hủy
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-lg cursor-pointer hover:bg-red-600 transition"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
