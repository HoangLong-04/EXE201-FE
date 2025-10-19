import React, { useEffect, useState } from "react";
import PrivateApi from "../../../services/PrivateApi";
import Table from "../../../components/paginationTable/Table";
import { toast } from "react-toastify";

function PostManagement() {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [project, setProject] = useState([]);
  const [pageSize] = useState(10);

  const getPendingProject = async () => {
    try {
      const response = await PrivateApi.getPendingProject({ page, pageSize });
      setProject(response.data.projects);
      setTotalPage(response.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPendingProject();
  }, [page, pageSize]);

  const handleApprove = async (id) => {
    try {
      await PrivateApi.approveProject(id);
      getPendingProject();
      toast.success("Duyệt thành công");
    } catch (error) {
      toast.error("Duyệt thất bại");
    }
  };
  return (
    <div className="p-8">
      <Table
        projects={project}
        currentPage={page}
        totalPages={totalPage}
        onPageChange={setPage}
        onApprove={handleApprove}
        // onView={handleView}
        // onEdit={handleEdit}
        // onDelete={handleDelete}
      />
    </div>
  );
}

export default PostManagement;
