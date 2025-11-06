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
    <div className="px-4 py-8 md:p-12">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
        <img
          className="animate-float w-[100px] h-auto md:w-[200px]" // Kích thước responsive
          src={Painting}
          alt="Painting"
          width={200}
          height={200}
        />

        <motion.div
          className="font-bold text-3xl sm:text-4xl lg:text-[4rem] text-amber-600 leading-tight md:leading-snug text-center"
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
          className="animate-float w-[100px] h-auto md:w-[200px]"
          src={Film}
          alt="Film"
          width={200}
          height={200}
        />
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-[10rem] mt-10 md:mt-[5rem]">
        <img
          src={Logo}
          width={200}
          className="w-[200px] max-w-full h-auto"
          alt="Logo 1"
        />

        <img
          src={Logo}
          width={200}
          className="w-[200px] max-w-full h-auto"
          alt="Logo 2"
        />
      </div>
    </div>
  );
}

export default Home;
