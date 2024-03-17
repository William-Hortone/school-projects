import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import BASE_URL from "./config";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Login Function
  const login = (inputs) => {
    console.log("inputs is", inputs);

    setIsLoading(true);
    axios
      .post(`${BASE_URL}login`, {
        email: inputs.email,
        password: inputs.password,
      })
      .then((response) => {
        setUserToken(response.data.token);
        localStorage.setItem("userToken", response.data.token);
        console.log("the res from back", response.data);

        setUserInfo(response.data);
        localStorage.setItem("userInfo", JSON.stringify(response.data));
        setIsLoading(false);
        navigate("/home");
      })
      .catch((error) => {
        setIsLoading(false);
        setErrorMessage(error.message);
        console.error("Login Error:", error.message);
      });
  };

  // LogOut function
  const logOut = () => {
    setIsLoading(true);
    setUserToken(null);
    localStorage.removeItem("userToken");
    localStorage.removeItem("userInfo");

    setIsLoading(false);
    navigate("/");
    console.log("the  userInfo", userInfo);
  };

  const isLoggedIn = () => {
    setIsLoading(true);

    const userToken = localStorage.getItem("userToken");
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (userInfo) {
      setUserToken(userToken);
      setUserInfo(userInfo);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{ login, logOut, userInfo, isLoading, userToken, errorMessage }}
    >
      {children}
    </AuthContext.Provider>
  );
};
