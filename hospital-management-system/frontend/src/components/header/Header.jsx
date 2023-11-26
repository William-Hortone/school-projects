import React, { useEffect, useState } from "react";
import "./header.css";
import { NavLink, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../../firebase/config";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  SET_ACTIVE_USER,
  REMOVE_ACTIVE_USER,
} from "../../redux/slice/authSlice";
import ShowOnLogin, { ShowOnLogout } from "../hiddenLinks/HiddenLinks";
import Loader from "../loader/Loader";
import axios from "axios";

const Header = () => {
  const [displayName, setDisplayName] = useState("");
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [signInDate, setSignInDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const activeLink = ({ isActive }) =>
    isActive ? "linkActive" : "navbar-link";

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Get the current date and time
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();
  const currentHour = currentDate.getHours();
  const currentMinute = currentDate.getMinutes();
  const currentSecond = currentDate.getSeconds();

  // Monitor currently sign in user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.displayName == null) {
          const u1 = user.email.slice(0, -10);
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
          setDisplayName(uName);
          setSignInDate(user.metadata.lastSignInTime);
        } else {
          setDisplayName(user.displayName);
        }

        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName ? user.displayName : displayName,
            userID: user.uid,
          })
        );
      } else {
        setDisplayName("");
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, [dispatch, displayName]);

  const handleLogout = () => {
    setIsLoading(true);

    signOut(auth)
      .then(() => {
        toast.success("Logout successful");
        setIsLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };

  const handleShowUserProfile = () => {
    setShowUserProfile(!showUserProfile);
  };

  const handleLogoutNow = async () => {
    try {
      // Make a request to the backend to clear the token
      await axios.post("http://localhost:3001/userLogout");

      // Clear the token on the client side (e.g., remove it from localStorage)
      localStorage.removeItem("token");

      console.log("Logout successful");
    } catch (error) {
      console.error("Logout failed", error.response?.data || error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="app__header">
        <h2>
          <span> LBV.</span>HOSPITAL
        </h2>
        <nav className="app__navbar">
          <ul>
            <ShowOnLogin>
              <div className="user-profile">
                <div onClick={handleShowUserProfile} className="user-icon">
                  <FaUserCircle size={16} />
                  Hi, {displayName}
                </div>
                {showUserProfile && (
                  <div className="user-container">
                    <div className="user-container-section">
                      <h2>
                        <FaUserCircle size={16} /> User Infos
                      </h2>
                      <p>User name: {displayName}</p>
                      <p>Logged in as: Admin </p>
                    </div>
                    <div className="user-container-section">
                      <h2>Time Log-in</h2>
                      <p>{signInDate}</p>
                    </div>
                    <div className="user-container-section">
                      <h2>Today</h2>
                      <p>
                        Date: {currentDay}/{currentMonth}/{currentYear} <br />
                        Time: {currentHour}:{currentMinute}:{currentSecond}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </ShowOnLogin>
            <ShowOnLogout>
              <NavLink to="/login" className={activeLink}>
                Login
              </NavLink>
            </ShowOnLogout>
            <ShowOnLogout>
              <NavLink to="/register" className="navbar-link">
                Register
              </NavLink>
            </ShowOnLogout>
            <ShowOnLogin>
              <NavLink
                to="/home"
                onClick={handleLogout}
                className="navbar-link"
              >
                Logout
              </NavLink>
            </ShowOnLogin>
            <button onClick={handleLogoutNow}>Logout Now</button>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Header;
