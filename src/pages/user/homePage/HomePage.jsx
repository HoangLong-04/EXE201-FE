import React from "react";
import Navbar from "../../../components/navbar/Navbar";
import Introduction from "../../../components/introduction/Introduction";
import Film from "../../../components/film/Film";
import Home from "../../../components/home/Home";

function HomePage() {
  return (
    <div>
      <section className="mt-[8rem]" id="home">
        <Home />
      </section>

      <section className="mt-[2rem]" id="info">
        <Introduction />
      </section>

      <section className="mt-[2rem]" id="film">
        <Film />
      </section>
    </div>
  );
}

export default HomePage;
