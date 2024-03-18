import { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import { About, Home, Welcome, Connection, Student } from "./pages";
import { Login, Register } from "./components";
import AddScore from "./containers/scores/AddScore";
import { AuthProvider } from "./hooks/AuthContext";
import { AddStudent, EditStudent } from "./containers";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/connection" element={<Connection />}>
              <Route path="/connection/register" element={<Register />} />
              <Route path="/connection/login" element={<Login />} />
            </Route>
            <Route path="/student" element={<Student />}>
              <Route path="/student/addStudent" element={<AddStudent />} />
              <Route path="/student/editStudent" element={<EditStudent />} />
            </Route>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/addScore" element={<AddScore />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
