import React from "react";
import { Header, NavBar } from "../components";

const About = () => {
  return (
    <>
      <Header title="Teacher" />
      <NavBar />
      <div className="app__addStudent section-padding">
        <h2 className="about-title">Engineering Education Certification</h2>
        <p>
          Engineering education certification refers to the specialized
          certification implemented by professional certification bodies for
          engineering professional education offered by higher education
          institutions. It is carried out by professional associations or trade
          associations (federations) and professional associations together with
          educational experts in the field and enterprise experts in related
          industries, aiming to provide quality assurance for preparatory
          education for relevant engineering talents to enter the industrial
          industry.
        </p>
        <h2 className="about-title">
          Training Objectives of Software Engineering
        </h2>
        <p>
          Cultivate students with high scientific and humanistic accomplishment,
          social responsibility and professional ethics, solid mathematical
          knowledge, basic knowledge and professional skills of software
          engineering, strong ability to analyze, design, develop, test and
          maintain computer software systems, a certain sense of innovation,
          scientific research ability and strong ability to put into engineering
          practice. High-quality applied software engineering professionals with
          international vision, insight into the development of the software
          industry and the frontier of technology, strong team spirit,
          expression ability and certain organizational management ability,
          dedication, spirit of responsibility and awareness of exerting
          influence, and lifelong learning ability.
        </p>
      </div>
    </>
  );
};

export default About;
