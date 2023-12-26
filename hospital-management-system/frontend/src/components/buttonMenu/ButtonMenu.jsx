import React, { useEffect, useRef, useState } from "react";
import "./buttonMenu.css";
import { Link, useLocation } from "react-router-dom";

const ButtonMenu = ({
  setShowList,
  initialShowList,
  title,
  title1,
  title2,
  title3,
  link1,
  link2,
  link3,
}) => {
  const location = useLocation();
  const [showList, setShowListLocal] = useState(initialShowList);

  const handleShowList = () => {
    setShowListLocal(!showList);
  };

  const handleOutsideClick = (event) => {
    const buttonMenu = buttonMenuRef.current;

    if (buttonMenu && !buttonMenu.contains(event.target)) {
      setShowListLocal(false);
    }
  };

  const buttonMenuRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    setShowList(showList);
  }, [showList, setShowList]);

  const isActive = (link) => link === location.pathname;

  const handleHideList = () => {
    setShowListLocal(!showList);
  };

  return (
    <div ref={buttonMenuRef} className="app__buttonMenu">
      <span
        onClick={handleShowList}
        className={`app_buttonMenu-title ${
          isActive(link1) || isActive(link2) || isActive(link3)
            ? "activeSection"
            : ""
        }`}
      >
        {title}
      </span>
      {showList && (
        <ul className="app__buttonMenu-list">
          <Link
            onClick={handleHideList}
            className={`buttonMenu-list ${isActive(link1) ? "activeLink" : ""}`}
            to={link1}
          >
            {title1}
          </Link>
          <Link
            onClick={handleHideList}
            className={`buttonMenu-list ${isActive(link2) ? "activeLink" : ""}`}
            to={link2}
          >
            {title2}
          </Link>
          <Link
            onClick={handleHideList}
            className={`buttonMenu-list ${isActive(link3) ? "activeLink" : ""}`}
            to={link3}
          >
            {title3}
          </Link>
        </ul>
      )}
    </div>
  );
};

export default ButtonMenu;
