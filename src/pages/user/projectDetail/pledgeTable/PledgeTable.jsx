import React from "react";

function PledgeTable({
  pledges,
  currentPage,
  totalPages,
  onPageChange,
}) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">
        Danh sách người ủng hộ
      </h2>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="py-3 px-4 border-b">Người ủng hộ</th>
            <th className="py-3 px-4 border-b">Email</th>
            <th className="py-3 px-4 border-b">Số tiền</th>
            <th className="py-3 px-4 border-b">Trạng thái</th>
            <th className="py-3 px-4 border-b text-center">Ngày tạo</th>
          </tr>
        </thead>
        <tbody>
          {pledges.length > 0 ? (
            pledges.map((p) => (
              <tr
                key={p.id}
                className="hover:bg-gray-50 transition-colors duration-150 border-b"
              >
                <td className="py-3 px-4">{p.backer.fullName}</td>
                <td className="py-3 px-4 font-medium">{p.backer.email}</td>
                <td className="py-3 px-4">{(p.amount).toLocaleString("vi-VN")}đ</td>
                <td className="py-3 px-4">{p.status}</td>
                <td className="py-3 px-4">
                  {new Date(p.createdAt).toLocaleDateString("vi-VN")}
                </td>
                
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
}

export default PledgeTable;
