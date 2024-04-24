import React from "react";
import "./menu.css";
import { Link } from "react-router-dom";

const Menu = ({ options }) => {
  return (
    <div className="navBar_menu">
      <ul>
        {options.map((item, index) => (
          <Link to={item.link} className="menu-link" key={index}>
            {item.title}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
