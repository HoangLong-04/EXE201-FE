import React, { useState } from "react";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { uploadImageToCloudinary } from "../../utils/uploadImage";

function UserInfo({ form, setForm, userInfo, onUpdate }) {
  const [isEdit, setIsEdit] = useState(false);

  const handleChoosePic = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;

      const mediaUrl = await uploadImageToCloudinary(file);
      setForm({ ...form, avatarUrl: mediaUrl });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[80%] bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 bg-gray-100 border-b border-gray-300 flex justify-between">
        <h2 className="text-xl font-semibold text-gray-800">
          Thông tin cơ bản
        </h2>
        <button
          onClick={() => setIsEdit(true)}
          className="hover:bg-gray-300 p-2 rounded-full cursor-pointer transition"
        >
          <BorderColorIcon />
        </button>
      </div>

      {/* Content */}
      <form className="p-8">
        {/* Avatar + ID */}
        <div className="flex items-center gap-6 mb-10">
          <img
            width={100}
            height={100}
            src={form.avatarUrl}
            alt="avatar"
            className="rounded-full object-cover border border-gray-300 shadow-sm"
          />

          {isEdit && (
            <input
              type="file"
              accept="image/*"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
              onChange={handleChoosePic}
              placeholder="ll"
            />
          )}
        </div>

        {/* Grid Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <p className="text-gray-500 mb-1 text-sm">Tên</p>

            <input
              disabled={!isEdit}
              className={`${
                isEdit ? "bg-white" : "bg-gray-200"
              } p-3 rounded-md border border-gray-300 text-gray-800 w-100`}
              type="text"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            />
          </div>

          {/* Address */}
          <div>
            <p className="text-gray-500 mb-1 text-sm">Địa chỉ</p>

            <input
              disabled={!isEdit}
              className={`${
                isEdit ? "bg-white" : "bg-gray-200"
              } p-3 rounded-md border border-gray-300 text-gray-800 w-100`}
              type="text"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
          </div>

          {/* Email */}
          <div>
            <p className="text-gray-500 mb-1 text-sm">Email</p>

            <input
              disabled
              className={`bg-gray-200 p-3 rounded-md border border-gray-300 text-gray-800 w-100`}
              type="text"
              value={form.email}
            />
          </div>

          {/* Phone */}
          <div>
            <p className="text-gray-500 mb-1 text-sm">Số điện thoại</p>

            <input
              disabled={!isEdit}
              className={`${
                isEdit ? "bg-white" : "bg-gray-200"
              } p-3 rounded-md border border-gray-300 text-gray-800 w-100`}
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>

          <div>
            <p className="text-gray-500 mb-1 text-sm">Trường học</p>

            <input
              disabled={!isEdit}
              className={`${
                isEdit ? "bg-white" : "bg-gray-200"
              } p-3 rounded-md border border-gray-300 text-gray-800 w-100`}
              type="text"
              value={form.school}
              onChange={(e) => setForm({ ...form, school: e.target.value })}
            />
          </div>
          {isEdit && (
            <div className="flex justify-end items-end gap-2">
              <button
                onClick={() => {
                  setIsEdit(false);
                  onUpdate();
                }}
                className="bg-blue-500 hover:bg-blue-600 p-2 rounded-lg cursor-pointer transition text-white"
              >
                Cập nhật
              </button>
              <button
                onClick={() => {
                  setIsEdit(false);
                  setForm(userInfo);
                }}
                className="bg-black/60 hover:bg-black p-2 rounded-lg cursor-pointer transition text-white"
              >
                Hủy
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default UserInfo;
