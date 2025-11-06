import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import PublicApi from "../../services/PublicApi";
import ProjectCard from "../projectCard.jsx/ProjectCard";

function Film() {
  const [project, setProject] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(50);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    const getProject = async () => {
      try {
        const response = await PublicApi.getProjectList({ page, pageSize });
        const film = response.data.projects.filter(
          (item) => item.categoryName === "Film"
        );
        setProject(film);
        setTotalPage(response.data.totalPages);
      } catch (error) {
        console.log(error);
      }
    };
    getProject();
  }, [page, pageSize]);
  // const totalPages = project.length / pageSize

  return (
    <div className="p-[2rem]">
      <div className="bg-[rgb(254,250,231)] p-[5rem]">
        <p className="text-center font-bold text-5xl mb-[5rem]">
          Các dự án về mảng phim
        </p>
        {project.length === 0 ? (
          <p className="text-center text-gray-500">Chưa có dự án nào</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {project?.map((f) => (
              <motion.div
                key={f.id}
                initial={{ scale: 0.85, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ type: "spring", stiffness: 200, damping: 30 }}
              >
                <ProjectCard
                  id={f.id}
                  mediaCoverUrl={f.mediaCoverUrl}
                  title={f.title}
                  currentAmount={f.currentAmount}
                  goal={f.goal}
                  category={f.categoryName}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Film;
