import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import StudentLogin from "./StudentLogin";
import TeacherLogin from "./TeacherLogin";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();

  const [loginRole, setLoginRole] = useState(true);

  const handleLoginRole = (role) => {
    if (role === "teacher") {
      setLoginRole(true);
    } else if (role === "student") {
      setLoginRole(false);
    }
  };

  return (
    <div className="app__login">
      <div className="app__login-form">
        <div className="intro">
          <h2>Score management system</h2>
          <h3>Login</h3>
        </div>
        <div className="wrapper-role">
          <div
            className={loginRole ? "role active-role" : "role"}
            onClick={() => handleLoginRole("teacher")}
          >
            <span>Teacher</span>
          </div>
          <div
            className={!loginRole ? "role active-role" : "role"}
            onClick={() => handleLoginRole("student")}
          >
            <span>Student</span>
          </div>
        </div>
        {loginRole && <TeacherLogin />}

        {!loginRole && <StudentLogin />}
      </div>

      <div className="app__login-content">
        <h2>
          Welcome <br /> To Score managem- <br />
          ent system
        </h2>
        <h3>Login</h3>
        <p>-- Or --</p>

        <button className="google-btn" type="button">
          <FaGoogle size={18} color="#0000000" />
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
