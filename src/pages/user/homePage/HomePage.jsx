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
    <div className="min-h-screen">
      <div className="fixed bottom-10 right-4 md:right-6 z-50 flex flex-col items-end gap-3 group">
        <div
          className={`flex flex-col absolute bottom-30 items-end gap-3 transition-all duration-300 ease-in-out origin-right
            ${
              open
                ? "translate-x-0 opacity-100 visible"
                : "translate-x-[150%] opacity-0 invisible"
            }
          `}
        >
          <button
            onClick={() => navigate("/donate-web")}
            className="relative cursor-pointer inline-flex items-center justify-center px-4 py-2 font-semibold text-white text-sm 
                       bg-gradient-to-r from-green-500 to-green-700 rounded-full shadow-lg overflow-hidden 
                       transition-all duration-300 ease-out group/donate active:scale-95 whitespace-nowrap min-w-[150px]"
          >
            <span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent 
                        translate-x-[-100%] group-hover/donate:translate-x-[100%] 
                        transition-transform duration-700 ease-in-out pointer-events-none"
            ></span>
            <span className="relative z-10 flex items-center">
              <span className="ml-1">Ủng hộ web</span>
            </span>
          </button>

          <div
            onClick={() => navigate("/user/add-project")}
            className="bg-black rounded-full px-4 py-2 text-white flex items-center gap-2 cursor-pointer text-sm 
                       hover:bg-yellow-500 hover:text-black transition-all duration-300 shadow-lg 
                       active:scale-95 min-w-[150px]"
          >
            <AddCircleOutlineIcon className="w-5 h-5" />
            <p>Thêm dự án</p>
          </div>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="bg-black text-white rounded-full p-3 cursor-pointer shadow-xl 
                     hover:bg-gray-700 transition-all duration-200 active:scale-95 absolute bottom-15"
          aria-expanded={open}
          aria-label={open ? "Đóng menu tiện ích" : "Mở menu tiện ích"}
        >
          {open ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <section className="mt-16 md:mt-[8rem] px-4" id="home">
        <Home />
      </section>

      <section className="mt-10 md:mt-16 px-4" id="info">
        <Introduction />
      </section>

      <section className="mt-10 md:mt-16 px-4" id="film">
        <Film />
      </section>

      <section className="mt-10 md:mt-16 px-4" id="design">
        <Design />
      </section>

      <section className="mt-10 md:mt-16 px-4" id="game">
        <Game />
      </section>
    </div>
  );
}

export default HomePage;
