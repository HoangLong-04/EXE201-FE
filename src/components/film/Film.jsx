import { motion } from "framer-motion";
import FilmCard from "./FilmCard";
import { useEffect, useState } from "react";
import PublicApi from "../../services/PublicApi";

function Film() {
  const [filmList, setFilmList] = useState([]);

  const getFilmList = async () => {
    try {
      const response = await PublicApi.getFilmList();
      setFilmList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFilmList();
  }, []);
  return (
    <div className="p-[2rem]">
      <div className="bg-[rgb(254,250,231)] p-[5rem]">
        <p className="text-center font-bold text-5xl mb-[5rem]">
          Các dự án về mảng phim
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {filmList.map((f) => (
            <motion.div
              key={f.id}
              initial={{ scale: 0.85, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ type: "spring", stiffness: 200, damping: 30 }}
            >
              <FilmCard image={f.image} title={f.title} fundRate={f.fundRate} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Film;
