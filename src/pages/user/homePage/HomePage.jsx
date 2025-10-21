import Navbar from "../../../components/navbar/Navbar";
import Introduction from "../../../components/introduction/Introduction";
import Film from "../../../components/film/Film";
import Home from "../../../components/home/Home";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useNavigate } from "react-router";
import Game from "../../../components/game/Game";
import Design from "../../../components/design/Design";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function HomePage() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  return (
    <div>
      <div className="fixed bottom-25 right-6 z-50 flex flex-col items-end gap-3">
      {/* Nút mũi tên toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-black text-white rounded-full p-3 cursor-pointer shadow-lg hover:bg-gray-700 transition-all"
      >
        {open ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>

      {/* Cụm nút trượt ra */}
      <div
        className={`flex flex-col items-end gap-3 transition-all duration-500 ease-in-out transform ${
          open ? "translate-x-0 opacity-100" : "translate-x-24 opacity-0 pointer-events-none"
        }`}
      >
        {/* Nút Ủng hộ web */}
        <button
          onClick={() => navigate("/donate-web")}
          className="relative cursor-pointer inline-flex items-center justify-center px-6 py-3 font-semibold text-white 
                     bg-gradient-to-r from-green-500 to-green-700 rounded-full shadow-lg overflow-hidden 
                     transition-all duration-300 ease-out group active:scale-95 whitespace-nowrap"
        >
          <span
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent 
                     translate-x-[-100%] group-hover:translate-x-[100%] 
                     transition-transform duration-700 ease-in-out pointer-events-none"
          ></span>
          <span className="relative z-10 flex items-center">
            <span className="ml-1">Ủng hộ web</span>
          </span>
        </button>

        {/* Nút Thêm dự án */}
        <div
          onClick={() => navigate("/user/add-project")}
          className="bg-black scale-105 rounded-full px-5 py-3 text-white flex items-center gap-2 cursor-pointer 
               hover:bg-amber-300 hover:text-black transition-all duration-300 shadow-lg"
        >
          <AddCircleOutlineIcon />
          <p>Thêm dự án</p>
        </div>
      </div>
    </div>

      <section className="mt-[8rem]" id="home">
        <Home />
      </section>

      <section className="mt-[2rem]" id="info">
        <Introduction />
      </section>

      <section className="mt-[2rem]" id="film">
        <Film />
      </section>

      <section className="mt-[2rem]" id="design">
        <Design />
      </section>

      <section className="mt-[2rem]" id="game">
        <Game />
      </section>
    </div>
  );
}

export default HomePage;
