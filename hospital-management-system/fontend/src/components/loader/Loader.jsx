import React from "react";
import ReactDOM from "react-dom";
import loaderImg from "../../assets/loader.gif";
import "./loader.css";

const Loader = () => {
  // ReactDOM.createPortal
  return (
    <div className="app__loader">
      <div className="loader">
        <img src={loaderImg} alt="Loader..." />
      </div>
    </div>
    // document.getElementById("loader")
  );
};

export default Loader;
