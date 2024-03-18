import React from "react";

const SlideCard = ({ img }) => {
  return (
    <div className="app__slideCard">
      <img src={img} alt="university photo" />
    </div>
  );
};

export default SlideCard;
