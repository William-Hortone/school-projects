import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import "./header.css";
import axios from "axios";
import Cookies from "js-cookie";
import {
  REMOVE_ACTIVE_USER,
  selectName,
  selectRole,
} from "../../redux/slice/userSlide";
import ShowOnLogin, { ShowOnLogout } from "../hiddenLinks/HiddenLinks";
import Loader from "../loader/Loader";

const Header = () => {
  // const [displayName, setDisplayName] = useState("");
  const [showUserProfile, setShowUserProfile] = useState(false);
  // const [signInDate, setSignInDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const activeLink = ({ isActive }) =>
    isActive ? "linkActive" : "navbar-link";

  const userName = useSelector(selectName);
  const userRole = useSelector(selectRole);
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

  // Monitor currently sign in user with firebase
  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       if (user.displayName == null) {
  //         const u1 = user.email.slice(0, -10);
  //         const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
  //         setDisplayName(uName);
  //         setSignInDate(user.metadata.lastSignInTime);
  //       } else {
  //         setDisplayName(user.displayName);
  //       }

  //       dispatch(
  //         SET_ACTIVE_USER({
  //           email: user.email,
  //           userName: user.displayName ? user.displayName : displayName,
  //           userID: user.uid,
  //         })
  //       );
  //     } else {
  //       setDisplayName("");
  //       dispatch(REMOVE_ACTIVE_USER());
  //     }
  //   });
  // }, [dispatch, displayName]);

  //Function to logout  with firebase
  // const handleLogout = () => {
  //   setIsLoading(true);

  //   signOut(auth)
  //     .then(() => {
  //       toast.success("Logout successful");
  //       setIsLoading(false);
  //       navigate("/");
  //     })
  //     .catch((error) => {
  //       setIsLoading(false);
  //       toast.error(error.message);
  //     });
  // };

  const handleShowUserProfile = () => {
    setShowUserProfile(!showUserProfile);
  };

  // FUnction to Logout
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3001/userLogout");

      // Remove the token on localStorage)
      // localStorage.removeItem("token");
      Cookies.remove("token");
      Cookies.remove("userDetails");
      navigate("/");
      dispatch(REMOVE_ACTIVE_USER());
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
                  Hi, {userName}
                </div>
                {showUserProfile && (
                  <div className="user-container">
                    <div className="user-container-section">
                      <h2>
                        <FaUserCircle size={16} /> User Infos
                      </h2>
                      <p>User name: {userName}</p>
                      <p>Logged in as: {userRole} </p>
                    </div>
                    <div className="user-container-section">
                      <h2>Time Log-in</h2>
                      {/* <p>{signInDate}</p> */}
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
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Header;
