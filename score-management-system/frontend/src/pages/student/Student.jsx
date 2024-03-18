import React from "react";
import "./student.css";
import { Header, NavBar } from "../../components";
import { Outlet } from "react-router-dom";

const Student = () => {
  return (
    <>
      <Header />
      <NavBar />
      <div className="app__student">
        <Outlet />
      </div>
    </>
  );
};

export default Student;
