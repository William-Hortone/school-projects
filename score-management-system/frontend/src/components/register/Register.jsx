import React from "react";
import "./register.css";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

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
        <form>
          <div className="field-wrapper">
            <label htmlFor="name">Your Full Name</label>
            <input
              type="text"
              placeholder="Your full name"
              id="name"
              required
              className="input"
            />
          </div>
          <div className="field-wrapper">
            <label htmlFor="username"> Your Username</label>
            <input
              type="text"
              placeholder="Your Username"
              id="username"
              className="input"
              required
            />
          </div>

          <div className="field-wrapper">
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              placeholder="Your email"
              id="email"
              className="input"
              required
            />
          </div>
          <div className="field-wrapper">
            <label htmlFor="password">Your Password</label>

            <input
              id="password"
              className="input"
              type="password"
              placeholder="Your Password"
              required
            />
          </div>
          <button
            onClick={() => navigate("/connection/login")}
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
