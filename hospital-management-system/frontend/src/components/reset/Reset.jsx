import React, { useState } from "react";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import "./reset.css";
import { auth } from "../../firebase/config";
import Loader from "../loader/Loader";
import forgetImg from "../../assets/forgot.png";

const Reset = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleResetpassword = (e) => {
    e.preventDefault();
    setIsLoading(true);

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setIsLoading(false);
        toast.success("Please check your email");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <section className="app__reset">
        <div className="app__reset-wrapper">
          <div className="app__reset-img">
            <img src={forgetImg} alt="Login" />
          </div>

          <div className="app__reset-container">
            <h2>Reset Password</h2>
            <form onSubmit={handleResetpassword}>
              <input
                type="text"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="btn-container">
                <button type="submit" className="rest-btn">
                  Reset Password
                </button>
              </div>
              <div className="links">
                <Link className="link" to="/login">
                  Login
                </Link>
                <Link className="link" to="/register">
                  Register
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Reset;
