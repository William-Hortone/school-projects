import React, { useContext, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../hooks/AuthContext";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();

  const { login, errorMessage, isLoading } = useContext(AuthContext);

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
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

  return (
    <div className="app__login">
      <div className="app__login-form">
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
