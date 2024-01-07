import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const SecondBtnMenu = ({
  setShowList,
  title,
  title1,
  title2,
  title3,
  title4,
  title5,
  title6,
  link1,
  link2,
  link3,
  link4,
  link5,
  link6,
}) => {
  const location = useLocation();
  const buttonMenuRef = useRef(null);
  const isActive = (link) => link === location.pathname;

  const [showList, setShowListLocal] = useState(() => {
    return JSON.parse(localStorage.getItem("showList")) || false;
  });

  const handleShowList = () => {
    setShowListLocal(!showList);
  };

  useEffect(() => {
    localStorage.setItem("showList", JSON.stringify(showList));
    setShowList(showList);
  }, [showList, setShowList]);

  const handleOutsideClick = (event) => {
    const buttonMenu = buttonMenuRef.current;

    if (buttonMenu && !buttonMenu.contains(event.target)) {
      setShowListLocal(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    setShowList(showList);
  }, [showList, setShowList]);

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
          <Link
            onClick={handleHideList}
            className={`buttonMenu-list ${isActive(link4) ? "activeLink" : ""}`}
            to={link4}
          >
            {title4}
          </Link>
          <Link
            onClick={handleHideList}
            className={`buttonMenu-list ${isActive(link5) ? "activeLink" : ""}`}
            to={link5}
          >
            {title5}
          </Link>
          <Link
            onClick={handleHideList}
            className={`buttonMenu-list ${isActive(link6) ? "activeLink" : ""}`}
            to={link6}
          >
            {title6}
          </Link>
        </ul>
      )}
    </div>
  );
};

export default SecondBtnMenu;
