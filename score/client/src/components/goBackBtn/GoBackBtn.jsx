import React from "react";
import { FaArrowLeft } from "react-icons/fa";

const GoBackBtn = () => {
  const goBack = () => {
    window.history.back();
  };

  return (
    <button className="goBackBtn displayFlex" onClick={goBack}>
      <FaArrowLeft color="white" size={15} />
      Go Back
    </button>
  );
};

export default GoBackBtn;
