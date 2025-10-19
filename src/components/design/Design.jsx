import { useEffect, useState } from "react";
import PublicApi from "../../services/PublicApi";
import ProjectCard from "../projectCard.jsx/ProjectCard";
import { motion } from "framer-motion";

function Design() {
  const [project, setProject] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(4);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    const getProject = async () => {
      try {
        const response = await PublicApi.getProjectList({ page, pageSize });
        const design = response.data.projects.filter(
          (item) => item.categoryName === "Design"
        );
        setProject(design);
        setTotalPage(response.totalPages);
      } catch (error) {
        console.log(error);
      }
    };

    getProject();
  }, [page, pageSize]);
  return (
    <div className="p-[2rem]">
      <div className="bg-[rgb(254,250,231)] p-[5rem]">
        <p className="text-center font-bold text-5xl mb-[5rem]">
          Các dự án về mảng thiết kế
        </p>
        {project.length === 0 ? (
          <p className="text-center text-gray-500">Chưa có dự án nào</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {project?.map((d) => (
              <motion.div
                key={d.id}
                initial={{ scale: 0.85, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ type: "spring", stiffness: 200, damping: 30 }}
              >
                <ProjectCard
                  id={d.id}
                  mediaCoverUrl={d.mediaCoverUrl}
                  title={d.title}
                  currentAmount={d.currentAmount}
                  goal={d.goal}
                  category={d.categoryName}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Design;
