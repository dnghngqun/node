import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const RegisteredCourses = () => {
  const [courses, setCourses] = useState([]);
  const [lectures, setLectures] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const navigate = useNavigate();

  // Kiểm tra trạng thái đăng nhập
  useEffect(() => {
    const checkLoginStatus = () => {
      const uid = localStorage.getItem("uid");
      const expiresAt = localStorage.getItem("expiresAt");
      if (uid && expiresAt) {
        if (Date.now() < expiresAt) {
          // token hợp lệ
        } else {
          // token đã hết hạn
          localStorage.clear();
          navigate("/login");
        }
      } else {
        navigate("/login");
      }
    };

    checkLoginStatus();
    const intervalId = setInterval(checkLoginStatus, 1000); // Cập nhật mỗi giây

    return () => clearInterval(intervalId);
  }, [navigate]);

  // Lấy danh sách bài giảng của khóa học
  const fetchLectures = async (courseId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/courses/${courseId}/lectures`
      );
      setLectures((prevLectures) => ({
        ...prevLectures,
        [courseId]: response.data,
      }));
    } catch (error) {
      console.error("Error fetching lectures:", error);
    }
  };

  // Xử lý khi nhấn vào khóa học để xem bài giảng
  const handleCourseClick = (courseId) => {
    fetchLectures(courseId);
    setSelectedCourse(courseId);
  };

  // Lấy danh sách khóa học đã đăng ký
  const fetchCourses = async () => {
    try {
      const uid = localStorage.getItem("uid"); // Lấy uid từ localStorage
      const response = await axios.get(
        `http://localhost:8080/courses/user-courses/${uid}`
      );
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching registered courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div>Loading...</div>
      </>
    );
  }

  return (
    <div>
      <Navbar />
      <div
        className="container text-center"
        style={{ maxWidth: "1200px", margin: "0 auto", marginTop: "20px" }}>
        <div className="row">
          {courses.map((course) => (
            <div className="col-lg-3" key={course.id}>
              <div className="card">
                <img
                  src={course.imageLink}
                  className="card-img-top"
                  alt="..."
                  style={{
                    height: "250px",
                    objectFit: "cover",
                    width: "100%",
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">{course.name}</h5>
                  <p className="card-text">
                    <span>Study Time: </span> {course.studyTime}
                    <br />
                    {course.description}
                  </p>
                  <button
                    onClick={() => handleCourseClick(course.id)}
                    className="btn btn-primary">
                    View Lecture
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedCourse && lectures[selectedCourse] && (
          <div className="row mt-4">
            <h3>
              Bài giảng cho khóa học{" "}
              {courses.find((course) => course.id === selectedCourse)?.name}
            </h3>
            <table className="table ">
              <thead className="table-info">
                <tr>
                  <th scope="col">Index</th>
                  <th scope="col">Lesson</th>
                  <th scope="col">Title</th>
                  <th scope="col">Description</th>
                </tr>
              </thead>
              <tbody>
                {lectures[selectedCourse].map((lecture, index) => (
                  <tr key={lecture.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{lecture.lesson}</td>
                    <td>{lecture.title}</td>
                    <td>{lecture.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisteredCourses;
