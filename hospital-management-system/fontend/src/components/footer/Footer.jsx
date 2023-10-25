import React from "react";
import "./footer.css";

const date = new Date();
const year = date.getFullYear();

const Footer = () => {
  return (
    <div className="app__footer">
      <p>
        <span>LBV.</span>HOSPITAL &copy;
        {year} All rights reserved
      </p>
    </div>
  );
};

export default Footer;
