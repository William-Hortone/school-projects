import React from "react";
import { Outlet } from "react-router-dom";
import "./connection.css";

const Connection = () => {
  return (
    <div className="app__connection">
      {/* <h2>Connection</h2> */}
      <div className="app__connection-container">
        <Outlet />
      </div>
    </div>
  );
};

export default Connection;
