import Navbar from "../../../components/navbar/Navbar";
import Introduction from "../../../components/introduction/Introduction";
import Film from "../../../components/film/Film";
import Home from "../../../components/home/Home";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useNavigate } from "react-router";
import Game from "../../../components/game/Game";
import Design from "../../../components/design/Design";

function HomePage() {
  const navigate = useNavigate();
  return (
    <div>
      <div
        onClick={() => navigate("/user/add-project")}
        className="bg-black sticky rounded-4xl top-[89%] left-[89%] p-2 z-9 text-white w-fit flex justify-center items-center gap-2 cursor-pointer hover:bg-amber-300 hover:text-black transition"
      >
        <p>
          <AddCircleOutlineIcon />
        </p>
        <p>Thêm dự án</p>
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
