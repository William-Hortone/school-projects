import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { FaGoogle } from "react-icons/fa";
// import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        toast.success("login success");

        navigate("/home");
      })
      .catch((error) => {
        toast.error(error.message);
      });

    // axios
    //   .post("http://localhost:3001/login", { email, password })
    //   .then((res) => {
    //     if (res.data === "success") {
    //       toast.success("Login Success");
    //       navigate("/");
    //     } else {
    //       if (res.data === "wrongPassword") {
    //         toast.error("Wrong password");
    //       } else if (res.data === "unknown email") {
    //         toast.error("Unknown email");
    //       }
    //     }
    //   })
    //   .catch((err) => toast.error(err));
  };

  // login with google
  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        toast.success("login successful");
        navigate("/home");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="app__register">
      <div className="app__register-section">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="Your email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Your password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link className="link" to="/reset">
            Reset the password
          </Link>

          <button className="btn--primary" type="submit">
            Login
          </button>
        </form>

        <p> -- Or --</p>

        <button onClick={signInWithGoogle} className="login-with-google">
          <FaGoogle size={18} /> Login With Google
        </button>
        <p>
          Don't have an account ?
          <Link className="link" to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
