import { useEffect, useState } from "react";
import PublicApi from "../../services/PublicApi";
import ProjectCard from "../projectCard.jsx/ProjectCard";
import { motion } from "framer-motion";

function Design() {
  const [designList, setDesignList] = useState([]);

  const getDesignList = async () => {
    try {
      const response = await PublicApi.getProjectList();
      const designs = response.data.filter(
        (item) => item.category === "design"
      );
      setDesignList(designs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDesignList();
  }, []);
  return (
    <div className="p-[2rem]">
      <div className="bg-[rgb(254,250,231)] p-[5rem]">
        <p className="text-center font-bold text-5xl mb-[5rem]">
          Các dự án về mảng thiết kế
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {designList?.map((d) => (
            <motion.div
              key={d.id}
              initial={{ scale: 0.85, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ type: "spring", stiffness: 200, damping: 30 }}
            >
              <ProjectCard
                image={d.image}
                title={d.title}
                fundRate={d.fundRate}
                category={d.category}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Design;
