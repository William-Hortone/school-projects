import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../hooks/AuthContext";
import { FaAlignRight, FaWindowClose } from "react-icons/fa";

const NavBarStudent = () => {
  const { userInfo } = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <nav className="app__navBar">
        <NavLink to="/HomeStudent" className="logo">
          <div className="app__logo">
            <h4>Score Management</h4>
            <h4>System</h4>
          </div>
        </NavLink>

        <ul className="app__navBar-links bigScreen">
          <NavLink to="/ViewScores" className="link" activeClassName="active">
            View Scores
          </NavLink>
          <NavLink to="/ViewInfos" className="link" activeClassName="active">
            View Infos
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
          <ul className="smallScreen-links small-menu">
            <NavLink to="/HomeStudent" className="link">
              Home
            </NavLink>

            <NavLink
              to="/ViewScores"
              onClick={() => setShowMenu(false)}
              className="link"
            >
              View Scores
            </NavLink>
            <NavLink
              to="/ViewInfos"
              onClick={() => setShowMenu(false)}
              className="link"
            >
              View Infos
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

export default NavBarStudent;
