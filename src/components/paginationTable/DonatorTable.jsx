import React from 'react'

function DonatorTable({data, currentPage, totalPages, onPageChange, onApprove, onEdit, onDelete}) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Danh sách người ủng hộ web</h2>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="py-3 px-4 border-b">Name</th>
            <th className="py-3 px-4 border-b">Email</th>
            {/* <th className="py-3 px-4 border-b">Id</th> */}
            <th className="py-3 px-4 border-b">Số tiền</th>
            <th className="py-3 px-4 border-b">Ngày tạo</th>
            <th className="py-3 px-4 border-b">Tin nhắn</th>
            <th className="py-3 px-4 border-b text-center">Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((p) => (
              <tr
                key={p.id}
                className="hover:bg-gray-50 transition-colors duration-150 border-b"
              >
                <td className="py-3 px-4">{p.donor ? p.donor?.fullName : 'Ẩn danh'}</td>
                <td className="py-3 px-4">{p.donor ? p.donor?.email : 'Ẩn danh'}</td>
                {/* <td className="py-3 px-4">{p.id}</td> */}
                <td className="py-3 px-4">{(p.amount).toLocaleString("vi-VN")} đ</td>
                <td className="py-3 px-4">{new Date (p.donationDate).toLocaleDateString("vi-VN")}</td>
                <td className="py-3 px-4">{p.message}</td>
                <td className="py-3 px-4">{p.status}</td>
                {/* <td className="py-3 px-4 text-center flex justify-center gap-2">
                  <button
                    onClick={() => onApprove(p.id)}
                    className="bg-blue-500 cursor-pointer text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition"
                  >
                    Duyệt
                  </button>
                  <button
                    onClick={() => onEdit(p.id)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => onDelete(p.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                  >
                    Xóa
                  </button>
                </td> */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center py-4 text-gray-500">
                Không có người ủng hộ nào.
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
};

export default DonatorTable