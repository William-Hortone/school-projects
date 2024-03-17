import React from "react";
import "./navBar.css";
import { NavLink } from "react-router-dom";
import images from "../../constants/images";
import Menu from "./Menu";

const NavBar = () => {
  const scoreInfos = [
    { title: "Add score", link: "/addScore" },
    { title: "Edit score", link: "/addScore" },
    { title: "View all scores", link: "/addScore" },
    { title: "Delete score", link: "/addScore" },
  ];
  const studentInfos = [
    { title: "Add student", link: "/addScore" },
    { title: "Edit student infos", link: "/addScore" },
    { title: "View all Students", link: "/addScore" },
    { title: "Delete student", link: "/addScore" },
  ];

  return (
    <nav className="app__navBar">
      <div className="app__logo">
        <img src={images.logo} alt="university logo" />
      </div>

      <ul className="app__navBar-links">
        <NavLink to="/about" className="link">
          About
        </NavLink>
        <NavLink className="link">
          Scores
          <div className="show-links">
            <Menu options={scoreInfos} />
          </div>
        </NavLink>
        <NavLink className="link">
          Student
          <div className="show-links">
            <Menu options={studentInfos} />
          </div>
        </NavLink>
      </ul>
      <div className="app__navBar-profile">
        <img
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
          alt="profile picture"
        />
        <h4>WWilliam Hortone</h4>
      </div>
    </nav>
  );
};

export default NavBar;
