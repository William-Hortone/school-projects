import React, { useContext, useState } from "react";
import { AuthContext } from "../../hooks/AuthContext";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TeacherLogin = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

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
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    login(inputs);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
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

        <div className="login-content">
          <p>-- Or --</p>

          <button className="google-btn" type="button">
            <FaGoogle size={18} color="#0000000" />
            Login with Google
          </button>
          <p>
            You do not have an account yet?
            <span onClick={() => navigate("/connection/register")}>
              Register
            </span>
          </p>
        </div>
      </form>
    </>
  );
};

export default TeacherLogin;
