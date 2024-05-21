import React, { useContext } from "react";
import "./header.css";
import { AuthContext } from "../../hooks/AuthContext";

const Header = ({ title }) => {
  const { logOut } = useContext(AuthContext);

  return (
    <div className="app__header">
      <p>{title}</p>
      <p className="logout" onClick={() => logOut()}>
        Logout
      </p>
    </div>
  );
};

export default Header;
