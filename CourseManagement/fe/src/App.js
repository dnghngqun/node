import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import CourseManagement from "./components/Admin/CourseManagement";
import Course from "./components/Course";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import RegisteredCourses from "./components/RegisteredCourses";
import LectureManagement from "./components/Admin/LectureManagement";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<CourseManagement />} />
        <Route path="/course" element={<Course />} />
        <Route path="/course/register" element={<RegisteredCourses />} />
        <Route path="/admin/lecture" element={<LectureManagement />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
