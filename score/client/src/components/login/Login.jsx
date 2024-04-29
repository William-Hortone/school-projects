import React, { useContext, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../hooks/AuthContext";
import "./login.css";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const { login, errorMessage, isLoading } = useContext(AuthContext);

  const [loginRole, setLoginRole] = useState(true);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    studentNumber: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
    console.log(inputs);
  };

  if (isLoading) {
    return <h2>Is Loading....</h2>;
  }
  if (errorMessage) {
    return toast.error("An error has occurred");
  }
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
        <div className="wrapper-role">
          <div
            className={loginRole ? "role active" : "role"}
            onClick={() => handleLoginRole("teacher")}
          >
            <span>Teacher</span>
          </div>
          <div
            className={!loginRole ? "role active" : "role"}
            onClick={() => handleLoginRole("student")}
          >
            <span>Student</span>
          </div>
        </div>
        {loginRole && (
          <form onSubmit={() => login(inputs)}>
            <div className="field-wrapper">
              <label htmlFor="email">Your Email</label>
              <input
                value={inputs.email}
                name="email"
                type="email"
                placeholder="Your email"
                id="email"
                className="input"
                required
                onChange={handleOnChange}
              />
            </div>
            <div className="field-wrapper">
              <label htmlFor="password">Your Password</label>

              <input
                id="password"
                value={inputs.password}
                name="password"
                className="input"
                type="password"
                placeholder="Your Password"
                required
                onChange={handleOnChange}
              />
            </div>
            <button className="submit-btn" type="submit">
              Login
            </button>
          </form>
        )}

        {!loginRole && (
          <form onSubmit={() => login(inputs)}>
            <div className="field-wrapper">
              <label htmlFor="email">Student Number</label>
              <input
                value={inputs.studentNumber}
                name="studentNumber}"
                type="studentNumber}"
                placeholder="Student Number}"
                id="studentNumber}"
                className="input"
                required
                onChange={handleOnChange}
              />
            </div>
            {/* <div className="field-wrapper">
              <label htmlFor="email">Your Email</label>
              <input
                value={inputs.email}
                name="email"
                type="email"
                placeholder="Your email"
                id="email"
                className="input"
                required
                onChange={handleOnChange}
              />
            </div> */}
            <div className="field-wrapper">
              <label htmlFor="password">Your Password</label>

              <input
                id="password"
                value={inputs.password}
                name="password"
                className="input"
                type="password"
                placeholder="Your Password"
                required
                onChange={handleOnChange}
              />
            </div>
            <button className="submit-btn" type="submit">
              Login
            </button>
          </form>
        )}
      </div>

      <div className="app__login-content">
        <h2>
          Welcome <br /> To Score managem- <br />
          ent system
        </h2>
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
