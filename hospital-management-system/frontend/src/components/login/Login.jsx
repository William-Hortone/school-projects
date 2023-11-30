import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../../firebase/config";
import { IS_USER_LOGIN } from "../../redux/slice/userSlide";
import Loader from "../loader/Loader";
import "./login.css";

import Cookies from "js-cookie";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/userLogin",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      if (response.data && response.data.success) {
        const { name, email, role } = response.data.user;
        // localStorage.setItem("token", response.data.token);
        Cookies.set("token", response.data.token);
        Cookies.set("userDetails", JSON.stringify({ name, email, role }));

        console.log("Login successful");
        toast.success("login success");

        dispatch(
          IS_USER_LOGIN({
            email: email,
            name: name,
            role: role,
          })
        );
        navigate("/adminDashboard/dashboard");
      } else {
        console.log("User not logged in");
        console.error("Login failed. No data in the response:", response);
      }
    } catch (error) {
      console.error("Login failed", error.response?.data || error.message);
    }
  };

  // useEffect(() => {
  //   console.log("MY   ---User logged in", userName, userRole, userEmail);
  // }, [userName, userRole, userEmail]);
  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   setIsLoading(true);

  //   signInWithEmailAndPassword(auth, email, password)
  //     .then((userCredential) => {
  //       const user = userCredential.user;
  //       toast.success("login success");
  //       setIsLoading(false);

  //       navigate("/adminDashboard/dashboard");
  //     })
  //     .catch((error) => {
  //       toast.error(error.message);
  //       setIsLoading(false);
  //     });
  // };

  // login with google
  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        toast.success("login successful");
        navigate("/adminDashboard/dashboard");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="app__register">
        <div className="app__register-section">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
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
    </>
  );
};

export default Login;
