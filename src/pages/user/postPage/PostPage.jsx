import React, { useEffect, useState } from "react";
import PrivateApi from "../../../services/PrivateApi";
import ProjectCard from "../../../components/projectCard.jsx/ProjectCard";
import CircularProgress from "@mui/material/CircularProgress";

function PostPage() {
  const [project, setProject] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(4);
  const [totalPage, setTotalPage] = useState(1);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getMyProject = async () => {
      setLoading(true);
      try {
        const response = await PrivateApi.getMyProject({
          page,
          pageSize,
          status,
        });
        setProject(response.data.projects);
        setTotalPage(response.data.totalPages);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getMyProject();
  }, [page, pageSize, status]);
  return (
    <div className="pb-10">
      <h2 className="text-center text-5xl my-10 font-semibold">
        Dự án của bạn
      </h2>
      
        <div className="flex justify-between items-center mb-3 ml-3">
          <div>
            <label className="mr-2 font-medium text-gray-600">
              Trạng thái:
            </label>
            <select
              className="border border-gray-300 rounded-md px-2 py-1"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
            >
              <option value="">Tất cả</option>
              <option value="Draft">Bản nháp</option>
              <option value="Submitted">Chờ duyệt</option>
              <option value="Published">Công khai</option>
            </select>
          </div>
        </div>
      

      {loading ? (
        <div className="flex justify-center items-center">
          <CircularProgress />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2">
          {project.length === 0 && (
            <div className="text-gray-500 flex justify-center items-center col-span-2">
              Bạn chưa có dự án nào
            </div>
          )}
          {project?.map((p) => (
            <div key={p.id} className="scale-90">
              <ProjectCard
                currentAmount={p.currentAmount}
                goal={p.goal}
                mediaCoverUrl={p.mediaCoverUrl}
                title={p.title}
                category={p.categoryName}
              />
            </div>
          ))}
        </div>
      )}

      {project.length === 0 ? null : 
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
        >
          Prev
        </button>
        <span>
          {page} / {totalPage}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPage))}
          disabled={page === totalPage}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
        >
          Next
        </button>
      </div>}

      
    </div>
  );
}

export default PostPage;
