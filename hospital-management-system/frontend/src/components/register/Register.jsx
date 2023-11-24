import React, { useState } from "react";
import Loader from "../loader/Loader";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import axios from "axios";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [name, setUsername] = useState("");

  const navigate = useNavigate();

  const handleRegister = (e) => {
    console.log("here is everything you need", email, password, name);
    e.preventDefault();
    axios
      .post("http://localhost:3001/userRegister", { name, email, password })
      .then(() => {
        alert("Created");
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   if (password !== cPassword) {
  //     toast.error("Password do not match");
  //   }

  //   setIsLoading(true);

  //   createUserWithEmailAndPassword(auth, email, password)
  //     .then((userCredential) => {
  //       const user = userCredential.user;
  //       setIsLoading(false);
  //       toast.success("Registration successful");
  //       navigate("/login");
  //     })
  //     .catch((error) => {
  //       toast.success(error.message);
  //       setIsLoading(false);
  //     });
  // };

  return (
    <>
      {isLoading && <Loader />}
      <div className="app__register">
        <div className="app__register-section">
          <h2>Register</h2>
          <form onSubmit={handleRegister}>
            <label htmlFor="email">Name</label>
            <input
              type="text"
              placeholder="Name"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* <label htmlFor="password">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm password"
              name="password"
              onChange={(e) => setCPassword(e.target.value)}
            /> */}

            <button className="btn--primary" type="submit">
              Register
            </button>
          </form>
          <p>
            Already have an account?
            <Link className="link" to="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
