import { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import { About, Home, Welcome, Connection } from "./pages";
import { Login, Register } from "./components";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/connection" element={<Connection />}>
            <Route path="/connection/register" element={<Register />} />
            <Route path="/connection/login" element={<Login />} />
          </Route>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
