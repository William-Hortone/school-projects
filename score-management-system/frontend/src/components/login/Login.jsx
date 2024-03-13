import React from "react";
import "./login.css";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="app__login">
      <div className="app__login-form">
        <form>
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
          <button className="submit-btn" type="submit">
            Login
          </button>
        </form>
      </div>

      <div className="app__login-content">
        <h2>Welcome To University Omar Bongo</h2>
        <h3>Login</h3>
        <p>-- Or --</p>

        <button className="google-btn" type="button">
          <FaGoogle size={20} color="#0000000" />
          Login with Google
        </button>
        <p>
          You do not have an account yet?
          <span onClick={() => navigate("/connection/register")}>Register</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
