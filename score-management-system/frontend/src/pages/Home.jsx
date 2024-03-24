import React from "react";
import { Header, NavBar, SlideCard } from "../components";
import Carousel from "react-elastic-carousel";
import images from "../constants/images";
import "./home.css";

const Home = () => {
  return (
    <div className="app__home">
      <Header />
      <NavBar />

      <section className="app__home-container">
        <div className="content">
          <div className="app__slidingText">
            <div className="app__slidingText-container">
              <div className="sliding-content">
                <span>
                  &nbsp;Design and Implementation Of Score Management system of
                  -&nbsp;
                </span>
                <span>Engineering Education -&nbsp;</span>
              </div>
              <div className="sliding-content">
                <span>
                  &nbsp;Design and Implementation Of Score Management system of
                  -&nbsp;
                </span>
                <span>Engineering Education -&nbsp;</span>
              </div>
            </div>
          </div>
        </div>
        <div className="home__wrapper">
          <div className="container-text">
            <h2 className="title-primary">Score</h2>
            <h2 className="title-primary">Manage-</h2>
            <h2>
              <span className="title-primary">ment</span>
              <span className="title-second">&nbsp;System</span>
            </h2>
            {/* <h2 className="title-second">System</h2> */}
          </div>
          <div className="container-image">
            <img
              src="https://s3.amazonaws.com/tns-assets/Media/ParsonNewyork/Content/Home/20180514_Parsons_Festival_451_v2.jpg?n=9443?auto=compress"
              alt="students with wire mesh"
              data-uw-rm-alt-original="students with wire mesh"
              data-uw-rm-alt="ALT"
            ></img>
          </div>
        </div>
      </section>

      {/* <div className="container"> */}
      {/* <Carousel itemsToShow={1} className="container">
        <SlideCard img={images.img1} />
        <SlideCard img={images.img2} />
        <SlideCard img={images.img3} />
        <SlideCard img={images.img1} />
        <SlideCard img={images.img1} />
        <SlideCard img={images.img1} />
      </Carousel> */}
    </div>
  );
};

export default Home;
