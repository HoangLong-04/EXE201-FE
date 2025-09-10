import { motion } from "framer-motion";
import FilmCard from "./FilmCard";

function Film() {
  const filmList = [
    {
      image:
        "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/conan_movie_28_lich_chieu_6_f8b79dfe49.jpg",
      title: "SUKKER: Queer Vamps Bite Back",
      fundRate: 20,
    },
    {
      image:
        "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/lich_chieu_thanh_guom_diet_quy_vo_han_thanh_0_e2a347baea.jpg",
      title: "Thanh Gươm Diệt Quỷ: Vô Hạn Thành",
      fundRate: 40,
    },
    {
      image:
        "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/lich_chieu_thanh_guom_diet_quy_vo_han_thanh_0_e2a347baea.jpg",
      title: "Thanh Gươm Diệt Quỷ: Vô Hạn Thành",
      fundRate: 40,
    },
  ];
  return (
    <div className="p-[2rem]">
      <div className="bg-[rgb(254,250,231)] p-[5rem]">
        <p className="text-center font-bold text-5xl mb-[5rem]">
          Các dự án về mảng phim
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {filmList.map((f) => (
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ type: "spring", stiffness: 200, damping: 30 }}
            >
              <FilmCard
                key={f.title}
                image={f.image}
                title={f.title}
                fundRate={f.fundRate}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Film;
