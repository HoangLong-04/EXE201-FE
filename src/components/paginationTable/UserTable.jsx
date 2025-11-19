import React from "react";
import CloseIcon from "@mui/icons-material/Close";

function UserTable({
  users,
  currentPage,
  totalPages,
  onPageChange,
  onApprove,
  onReject,
  onView,
  loading,
  FullName,
  setFullName,
  Phone,
  setPhone,
}) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">
        Danh sách người dùng
      </h2>

      <div className="mb-4 flex justify-end gap-10">
        <div className="flex items-center gap-2">
          <label>Phone:</label>
          <input
            className="bg-blue-100 rounded-lg py-1 outline-0 pl-1"
            type="tel"
            value={Phone}
            onChange={(e) => {
              setPhone(e.target.value);
              onPageChange(1);
            }}
          />
        </div>
        <div className="flex items-center gap-2">
          <label>Name:</label>
          <input
            className="bg-blue-100 rounded-lg py-1 outline-0 pl-1"
            type="text"
            value={FullName}
            onChange={(e) => {
              setFullName(e.target.value);
              onPageChange(1);
            }}
          />
        </div>
        <button
          onClick={() => {
            setFullName("");
            setPhone("");
            onPageChange(1)
          }}
          className="bg-gray-400 p-1 text-white rounded-full cursor-pointer hover:bg-gray-500 transition"
        >
          <CloseIcon />
        </button>
      </div>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            {/* <th className="py-3 px-4 border-b">Id</th> */}
            {/* <th className="py-3 px-4 border-b">Email</th> */}
            <th className="py-3 px-4 border-b">Tên</th>
            {/* <th className="py-3 px-4 border-b">Địa chỉ</th>
            <th className="py-3 px-4 border-b text-center">Trường học</th> */}
            <th className="py-3 px-4 border-b">Số điện thoại</th>
            <th className="py-3 px-4 border-b">Vai trò</th>
            {/* <th className="py-3 px-4 border-b">Hoạt dộng</th> */}
            {/* <th className="py-3 px-4 border-b">Ngày tạo</th> */}
            <th className="py-3 px-4 border-b flex justify-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((p) => (
              <tr
                key={p.id}
                className="hover:bg-gray-50 transition-colors duration-150 border-b"
              >
                {/* <td className="py-3 px-4">{p.id}</td> */}
                {/* <td className="py-3 px-4 font-medium">{p.email}</td> */}
                <td className="py-3 px-4">{p.fullName}</td>
                {/* <td className="py-3 px-4">{p.address}</td>
                <td className="py-3 px-4">{p.school}</td> */}
                <td className="py-3 px-4">{p.phone}</td>
                <td className="py-3 px-4">{p.role}</td>
                {/* <td className="py-3 px-4">
                  {p.isActive === true ? (
                    <div className="bg-green-400 rounded-full text-white py-1 px-2 flex justify-center items-center">
                      Đang hoạt động
                    </div>
                  ) : (
                    <div className="bg-red-400 rounded-full text-white py-1 px-2 flex justify-center items-center">
                      Không hoạt động
                    </div>
                  )}
                </td> */}
                {/* <td className="py-3 px-4">
                  {new Date(p.createdAt).toLocaleDateString("vi-VN")}
                </td> */}
                <td className="py-3 px-4 text-center flex justify-center gap-2">
                  <button
                    disabled={loading}
                    onClick={() => onView(p.id)}
                    className="bg-gray-500 text-white px-3 py-1 rounded-lg hover:bg-gray-600 transition cursor-pointer"
                  >
                    Xem
                  </button>
                  {/* <button
                    disabled={loading}
                    onClick={() => onApprove(p.id)}
                    className="bg-blue-500 cursor-pointer text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition"
                  >
                    Duyệt
                  </button>
                  <button
                    disabled={loading}
                    onClick={() => onReject(p.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition cursor-pointer"
                  >
                    Từ chối
                  </button> */}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center py-4 text-gray-500">
                Không có người dùng nào nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          ← Trước
        </button>
        <span className="text-gray-700 font-medium">
          Trang {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Sau →
        </button>
      </div>
    </div>
  );
}

export default UserTable;
