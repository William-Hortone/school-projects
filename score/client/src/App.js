import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { Login, Register } from "./components";
import {
  AddStudent,
  DeleteStudent,
  EditStudent,
  ViewStudents,
  AddScore,
  AddStudentScore,
  ViewStudentScore,
  ViewScore,
  EditScore,
  EditStudentScore,
  DeleteCourse,
  DeleteStudentCourse,
  ViewScores,
  ViewInfos,
} from "./containers";
import { AuthProvider } from "./hooks/AuthContext";
import {
  About,
  Connection,
  Home,
  Score,
  Student,
  StudentHome,
  Welcome,
} from "./pages";

function App() {
  return (
    <>
      <ToastContainer />
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
              <Route path="/student/viewStudents" element={<ViewStudents />} />
              <Route
                path="/student/deleteStudent"
                element={<DeleteStudent />}
              />
            </Route>
            <Route path="/score" element={<Score />}>
              <Route path="/score/addScore" element={<AddScore />} />
              <Route
                path="/score/addStudentScore"
                element={<AddStudentScore />}
              />
              <Route
                path="/score/viewStudentScore"
                element={<ViewStudentScore />}
              />
              <Route path="/score/viewScore" element={<ViewScore />} />
              <Route path="/score/deleteCourse" element={<DeleteCourse />} />
              <Route
                path="/score/deleteStudentCourse"
                element={<DeleteStudentCourse />}
              />
              <Route path="/score/editScore" element={<EditScore />} />
              <Route
                path="/score/editStudentScore"
                element={<EditStudentScore />}
              />
            </Route>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/HomeStudent" element={<StudentHome />} />
            <Route path="/ViewScores" element={<ViewScores />} />
            <Route path="/ViewInfos" element={<ViewInfos />} />
            {/* <Route path="/addScore" element={<AddScore />} /> */}
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
