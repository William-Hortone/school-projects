import React, { useState } from "react";
import "./register.css";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "./../../hooks/config";

const Register = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    username: "",
    name: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}register`, {
        name: inputs.name,
        password: inputs.password,
        username: inputs.username,
        email: inputs.email,
      });
      console.log("Response:", response.data);

      navigate("/connection/login");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="app__register">
      <div className="app__register-content">
        <h2>Welcome To University Omar Bongo</h2>
        <h3>Register</h3>
        <p>-- Or --</p>

        <button className="google-btn" type="button">
          <FaGoogle size={20} color="#0000000" />
          Register with Google
        </button>
        <p>
          You have an account ?
          <span onClick={() => navigate("/connection/login")}>Login</span>
        </p>
      </div>
      {/* <span></span> */}
      <div className="app__register-form">
        <form onSubmit={handleSubmit}>
          <div className="field-wrapper">
            <label htmlFor="name">Your Full Name</label>
            <input
              type="text"
              value={inputs.name}
              name="name"
              placeholder="Your full name"
              id="name"
              required
              className="input"
              onChange={handleOnChange}
            />
          </div>
          <div className="field-wrapper">
            <label htmlFor="username"> Your Username</label>
            <input
              type="text"
              placeholder="Your Username"
              id="username"
              value={inputs.username}
              name="username"
              className="input"
              required
              onChange={handleOnChange}
            />
          </div>

          <div className="field-wrapper">
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              placeholder="Your email"
              id="email"
              value={inputs.email}
              name="email"
              className="input"
              required
              onChange={handleOnChange}
            />
          </div>
          <div className="field-wrapper">
            <label htmlFor="password">Your Password</label>

            <input
              id="password"
              className="input"
              type="password"
              value={inputs.password}
              name="password"
              placeholder="Your Password"
              required
              onChange={handleOnChange}
            />
          </div>
          <button
            onClick={() => {}}
            // onClick={() => navigate("/connection/login")}
            className="submit-btn"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
