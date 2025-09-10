import Painting from "../../assets/painting.png";
import Film from "../../assets/film.png";
import Logo from "../../assets/logo-exe.png";
import { motion } from "framer-motion";

function Home() {
  const sentence = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const line = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 15 },
    },
  };
  return (
    <div>
      <div className="flex gap-5 justify-center">
        <img
          className="animate-float"
          src={Painting}
          alt="Painting"
          width={200}
          height={200}
        />
        <motion.div
          className="font-bold text-[3rem] text-amber-600 leading-snug text-center"
          variants={sentence}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          <motion.p variants={line}>Những dự án của bạn</motion.p>
          <motion.p variants={line}>xứng đáng được đón nhận</motion.p>
          <motion.p variants={line}>nhiều hơn thế nữa</motion.p>
        </motion.div>
        <img
          className="animate-float"
          src={Film}
          alt="Film"
          width={200}
          height={200}
        />
      </div>
      <div className="flex justify-center gap-[10rem] mt-[5rem]">
        <img src={Logo} width={400} alt="" />
        <img src={Logo} width={400} alt="" />
      </div>
    </div>
  );
}

export default Home;
