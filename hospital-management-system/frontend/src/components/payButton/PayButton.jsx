import axios from "axios";
import React from "react";
// import { UseSelector } from "react-redux";
// import {url}

const PayButton = ({ bill }) => {
  const handleCheckout = () => {
    console.log("the bill is", bill);
  };
  return (
    <>
      <button onClick={() => handleCheckout()}>Check out</button>
    </>
  );
};

export default PayButton;
