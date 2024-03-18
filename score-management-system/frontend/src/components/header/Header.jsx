import React, { useContext } from "react";
import "./header.css";
import { AuthContext } from "../../hooks/AuthContext";

const Header = () => {
  const { logOut, errorMessage, isLoading } = useContext(AuthContext);

  return (
    <div className="app__header">
      <p>Student</p>
      <button onClick={() => logOut()}>Logout</button>
    </div>
  );
};

export default Header;
