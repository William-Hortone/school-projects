import React, { useContext } from "react";
import "./navBar.css";
import { NavLink } from "react-router-dom";
import images from "../../constants/images";
import Menu from "./Menu";
import { AuthContext } from "../../hooks/AuthContext";
import { scoreInfos, studentInfos } from "../../constants/data";

const NavBar = () => {
  const { userInfo, errorMessage, isLoading } = useContext(AuthContext);

  return (
    <nav className="app__navBar">
      <NavLink to="/home" className="link">
        <div className="app__logo">
          <div className="app__logo-image">
            <img src={images.logo} alt="university logo" />
          </div>
          <h4>University Omar Bongo</h4>
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
        <h4>Hi, {userInfo ? userInfo.username : ""}</h4>
      </div>
    </nav>
  );
};

export default NavBar;
