import React from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/slice/userSlide";

const ShowOnLogin = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (isLoggedIn) {
    return children;
  }
  return null;
};

export default ShowOnLogin;

const ShowOnLogout = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (!isLoggedIn) {
    return children;
  }
  return null;
};

export { ShowOnLogout };
