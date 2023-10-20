import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Login, Register } from "./components";
import { HomeAdmin } from "./pages";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomeAdmin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
