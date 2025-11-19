import React, { useEffect, useState } from "react";
import PrivateApi from "../../../services/PrivateApi";
import Table from "../../../components/paginationTable/Table";
import { toast } from "react-toastify";

function PostManagement() {
  const [Page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [project, setProject] = useState([]);
  const [PageSize] = useState(10);
  const [loading, setLoading] = useState(false)

  const [selectedId, setSelectedId] = useState(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [note, setNote] = useState("");
  const [detail, setDetail] = useState(null);

  const getPendingProject = async () => {
    try {
      const response = await PrivateApi.getPendingProject({ Page, PageSize });
      setProject(response.data.projects);
      setTotalPage(response.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPendingProject();
  }, [Page, PageSize]);

  const handleApprove = async (id) => {
    setLoading(true)
    try {
      await PrivateApi.approveProject(id);
      getPendingProject();
      toast.success("Duyệt thành công");
    } catch (error) {
      toast.error("Duyệt thất bại");
    } finally {
      setLoading(false)
    }
  };

  const handleReject = (id) => {
    setSelectedId(id);
    setShowRejectModal(true);
  };

  const confirmReject = async () => {
    setLoading(true)
    try {
      await PrivateApi.rejectProject(selectedId, { note });
      toast.success("Đã từ chối dự án");
      setShowRejectModal(false);
      setNote("");
      getPendingProject();
    } catch (error) {
      toast.error("Từ chối thất bại");
    } finally {
      setLoading(false)
    }
  };

  const handleView = async (id) => {
    setLoading(true)
    try {
      const res = await PrivateApi.getDetailProjectAdmin(id);
      setDetail(res.data);
      setShowDetailModal(true);
    } catch (error) {
      toast.error("Không tải được chi tiết");
    } finally {
      setLoading(false)
    }
  };
  return (
    <div className="p-8">
      <Table
        projects={project}
        currentPage={Page}
        totalPages={totalPage}
        onPageChange={setPage}
        onApprove={handleApprove}
        onReject={handleReject}
        onView={handleView}
        loading={loading}
      />

      {/* --- Modal Từ chối --- */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-[400px] shadow-lg">
            <h3 className="text-xl font-semibold mb-3 text-gray-700">
              Nhập lý do từ chối
            </h3>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Nhập ghi chú..."
              className="w-full border rounded-lg p-2 h-24 outline-none focus:ring focus:ring-red-300"
            />
            <div className="flex justify-end mt-4 gap-2">
              <button
                onClick={() => setShowRejectModal(false)}
                className="px-4 py-2 cursor-pointer rounded-lg bg-gray-200 hover:bg-gray-300"
              >
                Hủy
              </button>
              <button
                onClick={confirmReject}
                className="px-4 py-2 rounded-lg bg-red-500 text-white cursor-pointer hover:bg-red-600"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- Modal Chi tiết --- */}
      {showDetailModal && detail && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-[500px] max-h-[80vh] overflow-y-auto shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">{detail.title}</h3>
            <img
              src={detail.mediaCoverUrl}
              alt={detail.title}
              className="rounded-lg mb-4"
            />
            <p><strong>Tóm tắt:</strong> {detail.summary}</p>
            <p><strong>Mô tả:</strong> {detail.description}</p>
            <p><strong>Mục tiêu:</strong> {detail.goal.toLocaleString()} VND</p>
            <p><strong>Đã đạt:</strong> {detail.currentAmount.toLocaleString()} VND</p>
            <p><strong>Trạng thái:</strong> {detail.status}</p>
            <p>
              <strong>Ngày tạo:</strong>{" "}
              {new Date(detail.createdAt).toLocaleDateString("vi-VN")}
            </p>

            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostManagement;
