import { useEffect, useState } from "react";
import PublicApi from "../../services/PublicApi";
import ProjectCard from "../projectCard.jsx/ProjectCard";
import { motion } from "framer-motion";

function Game() {
  const [gameList, setGameList] = useState();

  const getGameList = async () => {
    try {
      const response = await PublicApi.getProjectList();
      const games = response.data.filter((item) => item.category === "game");
      setGameList(games);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGameList();
  }, []);
  return (
    <div className="p-[2rem]">
      <div className="bg-[rgb(254,250,231)] p-[5rem]">
        <p className="text-center font-bold text-5xl mb-[5rem]">
          Các dự án về mảng game
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {gameList?.map((g) => (
            <motion.div
              key={g.id}
              initial={{ scale: 0.85, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ type: "spring", stiffness: 200, damping: 30 }}
            >
              <ProjectCard
                image={g.image}
                title={g.title}
                fundRate={g.fundRate}
                category={g.category}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Game;
