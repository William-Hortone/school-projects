import React, { useContext } from "react";
import "./header.css";
import { AuthContext } from "../../hooks/AuthContext";

const Header = () => {
  const { logOut, errorMessage, isLoading } = useContext(AuthContext);

  return (
    <div className="app__header">
      <p>Student</p>
      <p className="logout" onClick={() => logOut()}>
        Logout
      </p>
    </div>
  );
};

export default Header;
