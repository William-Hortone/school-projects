import React, { useContext, useState } from "react";
import { FaAlignRight, FaWindowClose } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { scoreInfos, studentInfos } from "../../constants/data";
import { AuthContext } from "../../hooks/AuthContext";
import Menu from "./Menu";
import "./navBar.css";

const NavBar = () => {
  const { userInfo } = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <nav className="app__navBar">
        <NavLink to="/home" className="logo">
          <div className="app__logo">
            <h4>Score Management</h4>
            <h4>System</h4>
          </div>
        </NavLink>

        <ul className="app__navBar-links bigScreen">
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
        <div className="displayFlex">
          <div className="app__navBar-profile">
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
              alt="profile "
            />
            <h4>Hi, {userInfo ? userInfo.username : ""}</h4>
          </div>

          <div className="burger-menu" onClick={() => setShowMenu(true)}>
            <FaAlignRight size={24} color="#72141b" />
          </div>
        </div>
      </nav>

      {/* links on responsive */}
      {showMenu && (
        <div
          className={showMenu ? "wrapper-links show-menu " : "wrapper-links"}
        >
          <ul className="smallScreen-links">
            <NavLink to="/home" className="title">
              Home
            </NavLink>
            <p className="title">Scores</p>
            <NavLink
              to="/score/addScore"
              onClick={() => setShowMenu(false)}
              className="link"
            >
              Add Scores
            </NavLink>
            <NavLink
              to="/score/viewScore"
              onClick={() => setShowMenu(false)}
              className="link"
            >
              View Scores
            </NavLink>
            <NavLink
              to="/score/editScore"
              onClick={() => setShowMenu(false)}
              className="link"
            >
              Edit Scores
            </NavLink>
            <NavLink to="" onClick={() => setShowMenu(false)} className="link">
              Delete Scores
            </NavLink>

            <p className="title">Students</p>
            <NavLink
              to="/score/addScore"
              onClick={() => setShowMenu(false)}
              className="link"
            >
              Add student
            </NavLink>
            <NavLink
              to="/student/viewStudents"
              onClick={() => setShowMenu(false)}
              className="link"
            >
              View Students
            </NavLink>
            <NavLink
              to="/student/editStudent"
              onClick={() => setShowMenu(false)}
              className="link"
            >
              Edit Student Infos
            </NavLink>
            <NavLink
              to="/student/deleteStudent"
              onClick={() => setShowMenu(false)}
              className="link"
            >
              Delete Student
            </NavLink>
          </ul>
          <div className="closeBtn" onClick={() => setShowMenu(false)}>
            <FaWindowClose size={25} color="white" />
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
