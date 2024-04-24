import React from "react";
import { Button } from "../components";
import "./welcome.css";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();
  return (
    <div className="app__welcome">
      <h2>University Omar Bongo</h2>
      {/* <div className="container"> */}
      <Button
        text="Let's started"
        onClick={() => navigate("/connection/login")}
      />
      {/* </div> */}
      <span className="blur"></span>
    </div>
  );
};

export default Welcome;
