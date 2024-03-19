import React, { useContext } from "react";
import "./navBar.css";
import { NavLink } from "react-router-dom";
import images from "../../constants/images";
import Menu from "./Menu";
import { AuthContext } from "../../hooks/AuthContext";

const NavBar = () => {
  const { userInfo, errorMessage, isLoading } = useContext(AuthContext);

  const scoreInfos = [
    { title: "Add score", link: "/score/addScore" },
    { title: "Edit score", link: "/score/addScore" },
    { title: "View all scores", link: "/score/viewScore" },
    { title: "Delete score", link: "/score/addScore" },
  ];
  const studentInfos = [
    { title: "Add student", link: "/student/addStudent" },
    { title: "Edit student infos", link: "/student/editStudent" },
    { title: "View all Students", link: "/student/viewStudents" },
    { title: "Delete student", link: "/student/deleteStudent" },
  ];

  return (
    <nav className="app__navBar">
      <NavLink to="/home" className="link">
        <div className="app__logo">
          <img src={images.logo} alt="university logo" />
        </div>
      </NavLink>

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
        <h4>{userInfo ? userInfo.username : ""}</h4>
      </div>
    </nav>
  );
};

export default NavBar;
