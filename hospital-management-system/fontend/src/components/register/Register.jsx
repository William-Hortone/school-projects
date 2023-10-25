import React, { useState } from "react";
import "./register.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== cPassword) {
      toast.error("Password do not match");
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        toast.success("Registration successful");
        navigate("/login");
      })
      .catch((error) => {
        toast.success(error.message);
      });
  };

  return (
    <div className="app__register">
      <div className="app__register-section">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          {/* <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Your name"
            name="name"
            onChange={(e) => setName(e.target.value)}
          /> */}
          <label htmlFor="email">Email</label>
          <input
            type="text"
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
          <label htmlFor="password">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm password"
            name="password"
            onChange={(e) => setCPassword(e.target.value)}
          />

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
  );
};

export default Register;
