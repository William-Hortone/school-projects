import React from "react";
import { Header, NavBar, SlideCard } from "../components";
import Carousel from "react-elastic-carousel";
import images from "../constants/images";

const Home = () => {
  return (
    <div className="app__home">
      <Header />
      <NavBar />

      {/* <div className="container"> */}
      <Carousel itemsToShow={1} className="container">
        <SlideCard img={images.img1} />
        <SlideCard img={images.img2} />
        <SlideCard img={images.img3} />
        <SlideCard img={images.img1} />
        <SlideCard img={images.img1} />
        <SlideCard img={images.img1} />
      </Carousel>
      {/* </div> */}
    </div>
  );
};

export default Home;
