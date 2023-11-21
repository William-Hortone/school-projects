import React from "react";
import "./home.css";
import Header from "../../components/header/Header";
import { Footer } from "../../components";

const Home = () => {
  return (
    <div className="lbvHospital">
      <Header />
      <div className="lbvHospital-container">
        <h1>
          <span>LBV.</span>HOSPITAL
        </h1>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
