import React, { useEffect, useState } from "react";
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
import Loader from "../loader/Loader";
import { IS_USER_LOGIN } from "../../redux/slice/userSlide";
import { useDispatch } from "react-redux";
// import jwt_decode from "jwt-decode";
// const jwt_decode = require("jwt-decode");
// import * as jwt_decode from "jwt-decode";
// import jwt_decode from "jwt-decode";
// const jwt_decode = require("jwt-decode");
import Cookies from "js-cookie";

const Login = ({ setUserName, setUserRole, setUserEmail }) => {
  const dispatch = useDispatch();
  const [userInfosEmail, setUserInfosEmail] = useState("");
  const [userInfosRole, setUserInfosRole] = useState("");
  const [userInfosName, setUserInfosName] = useState("");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // axios.defaults.withCredentials = true;
  // const handleLogin = (e) => {
  //   e.preventDefault();

  //   axios
  //     .post("http://localhost:3001/userLogin", { email, password })
  //     .then((res) => {
  //       console.log(res.data);
  //       toast.success("login success");
  //       navigate("/adminDashboard/dashboard");
  //     })
  //     .catch((error) => {
  //       toast.error(error.message);
  //       setIsLoading(false);
  //     });
  // };

  // useEffect(() => {
  //   const storedToken = localStorage.getItem("token");
  //   if (storedToken) {
  //     // Decode the token to get user details
  //     // const decodedToken = jwt_decode.default(storedToken);

  //     dispatch(
  //       IS_USER_LOGIN({
  //         userStatus: true,
  //         email: decodedToken.email,
  //         name: decodedToken.name,
  //         role: decodedToken.role,
  //       })
  //     );
  //   }
  //   // console.log("User logged in", userName, userRole, userEmail);
  // }, [dispatch]);

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

        // Handle successful login
        // localStorage.setItem("token", response.data.token);

        // Handle successful login

        // Handle successful login
        Cookies.set("token", response.data.token);
        Cookies.set("userDetails", JSON.stringify({ name, email, role }));

        console.log("Login successful");
        toast.success("login success");
        // Log user information
        console.log("User Information:", {
          name,
          email,
          role,
        });

        dispatch(
          IS_USER_LOGIN({
            // userStatus: true,
            email: email,
            name: name,
            role: role,
          })
        );

        // const storedToken = localStorage.getItem("token");
        // if (storedToken) {
        //   dispatch(
        //     IS_USER_LOGIN({
        //       userStatus: true,
        //       email: email,
        //       name: name,
        //       role: role,
        //     })
        //   );
        // }

        setUserEmail(email);
        setUserName(name);
        setUserRole(role);

        navigate("/adminDashboard/dashboard");
      } else {
        console.log("User not logged in");
        console.error("Login failed. No data in the response:", response);
      }
    } catch (error) {
      console.error("Login failed", error.response?.data || error.message);
    }
  };

  // // Use this effect to check for user details on page load
  // useEffect(() => {
  //   const storedToken = Cookies.get("token");
  //   const storedUserDetails = Cookies.get("userDetails");

  //   if (storedToken && storedUserDetails) {
  //     const { email, name, role } = JSON.parse(storedUserDetails);

  //     dispatch(
  //       IS_USER_LOGIN({
  //         userStatus: true,
  //         email: email,
  //         name: name,
  //         role: role,
  //       })
  //     );

  //     setUserEmail(email);
  //     setUserName(name);
  //     setUserRole(role);
  //     console.log("info are here", name, email, role);
  //   }
  // }, [dispatch, setUserEmail, setUserName, setUserRole]);

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
