import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { Outlet } from "react-router";

function UserLayout() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-99">
        <Navbar />
      </header>
      <section>
        <Outlet />
      </section>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default UserLayout;
