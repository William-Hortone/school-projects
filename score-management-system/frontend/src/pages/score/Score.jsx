import React from "react";
// import "./Score.css";
import { Header, NavBar } from "../../components";
import { Outlet } from "react-router-dom";

const Score = () => {
  return (
    <>
      <Header />
      <NavBar />
      <div className="app__Score">
        <Outlet />
      </div>
    </>
  );
};

export default Score;
