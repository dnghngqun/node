import axios from "axios";
import React, { useEffect, useState } from "react";
import "../css/admin/AdminFw.css";
import "../css/admin/admin.css";
import Nav from "./Nav";
import Sidebar from "./Sidebar";

const LectureManagement = () => {
  const [courses, setCourses] = useState([]);
  const [lectures, setLectures] = useState({});
  const [showLecturesForCourse, setShowLecturesForCourse] = useState(null);
  const [courseId, setCourseId] = useState("");
  const [lesson, setLesson] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isShowCreate, setIsShowCreate] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [lectureTitle, setLectureTitle] = useState("");
  const [lectureDescription, setLectureDescription] = useState("");
  const [editingLecture, setEditingLecture] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, [isLoad]);

  // Fetch danh sách khóa học
  const fetchCourses = async () => {
    try {
      const response = await axios.get("https://coursemanagement-be.onrender.com/courses/");
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  // Fetch bài giảng của từng khóa học
  const fetchLectures = async (courseId) => {
    try {
      const response = await axios.get(
        `https://coursemanagement-be.onrender.com/courses/${courseId}/lectures`
      );
      setLectures((prevLectures) => ({
        ...prevLectures,
        [courseId]: response.data,
      }));
    } catch (error) {
      console.error("Error fetching lectures:", error);
    }
  };

  // Xử lý tạo mới bài giảng
  const handleCreateLecture = async () => {
    if (!courseId || !lesson || !title || !description) {
      console.log("Please fill out all fields.");
      return;
    }
    alert("Please wait while the lecture is being created...");
    try {
      const token = localStorage.getItem("idToken");
      await axios.post(
        `https://coursemanagement-be.onrender.com/lectures/${courseId}`,
        {
          lesson,
          title,
          description,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsLoad(!isLoad); // Reload list
      alert("Lecture added successfully!");
      setLesson("");
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error creating lecture:", error);
    }
  };

  // Xử lý hiện/ẩn danh sách bài giảng của từng khóa học
  const handleShowLectures = (courseId) => {
    if (showLecturesForCourse === courseId) {
      setShowLecturesForCourse(null); // Ẩn danh sách bài giảng
    } else {
      fetchLectures(courseId); // Nếu chưa có dữ liệu, fetch bài giảng

      setShowLecturesForCourse(courseId); // Hiện danh sách bài giảng
    }
  };

  // Xử lý khi nhấn nút Edit Lecture
  const handleEditLecture = (lecture, courseId) => {
    setEditingLecture(lecture);
    console.log("Editing lecture:", lecture);
    setCourseId(courseId);
    setLesson(lecture.lesson);
    setTitle(lecture.title);
    setDescription(lecture.description);
    setIsShowCreate(true);
    setIsVisible(true);
  };

  // Xử lý khi nhấn nút Update Lecture
  const handleUpdateLecture = async () => {
    if (!editingLecture || !lesson || !title || !description) {
      console.log("Please fill out all fields.");
      return;
    }

    alert("Updating lecture...");
    try {
      const token = localStorage.getItem("idToken");
      await axios.put(
        `https://coursemanagement-be.onrender.com/lectures/${courseId}/lectures/${editingLecture.id}`, // Gửi yêu cầu PUT tới API
        {
          courseId: editingLecture.courseId,
          lesson,
          title,
          description,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsLoad(!isLoad); // Reload lại danh sách sau khi cập nhật
      setEditingLecture(null); // Clear trạng thái chỉnh sửa
      setLesson("");
      setTitle("");
      setDescription("");
      setIsShowCreate(false); // Đóng form
      setShowLecturesForCourse(null);
      alert("Lecture updated successfully!");
    } catch (error) {
      console.error("Error updating lecture:", error);
    }
  };

  // Xử lý khi nhấn nút Delete Lecture
  const handleDeleteLecture = async (lectureId, courseId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this lecture?"
    );
    if (confirmDelete) {
      try {
        const token = localStorage.getItem("idToken");
        await axios.delete(
          `https://coursemanagement-be.onrender.com/lectures/${courseId}/lectures/${lectureId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setIsLoad(!isLoad);
        setShowLecturesForCourse(null);
        alert("Lecture deleted successfully!");
      } catch (error) {
        console.error("Error deleting lecture:", error);
      }
    }
  };
  const handleCreate = () => {
    setIsShowCreate(!isShowCreate); // Thay đổi trạng thái hiển thị form tạo bài giảng
    setIsVisible((value) => !value);
    setCourseId(""); // Xóa dữ liệu đã điền
    setLesson("");
    setTitle("");
    setDescription("");
    setEditingLecture(null); // Đảm bảo không còn trạng thái chỉnh sửa
  };

  console.log("lestures: ", lectures);
  return (
    <>
      <div>
        <div
          className="page-wrapper"
          id="main-wrapper"
          data-layout="vertical"
          data-navbarbg="skin6"
          data-sidebartype="full"
          data-sidebar-position="fixed"
          data-header-position="fixed">
          <Sidebar />
          <div className="body-wrapper">
            <Nav />
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">All Courses</h5>
                      <button className="badge bg-dark" onClick={handleCreate}>
                        {isShowCreate ? "Close" : "Create new lecture"}
                      </button>

                      {isShowCreate && (
                        <div
                          className={`fade-in ${
                            isVisible ? "show" : "hide"
                          } create-update`}>
                          <label>
                            Course ID:
                            <select
                              value={courseId}
                              onChange={(e) => setCourseId(e.target.value)}>
                              <option value="">Select Course</option>
                              {courses.map((course) => (
                                <option key={course.id} value={course.id}>
                                  {course.name}
                                </option>
                              ))}
                            </select>
                          </label>
                          <br />
                          <label>
                            Lesson:
                            <input
                              type="text"
                              value={lesson}
                              onChange={(e) => setLesson(e.target.value)}
                            />
                          </label>
                          <br />
                          <label>
                            Title:
                            <input
                              type="text"
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                            />
                          </label>
                          <br />
                          <label>Description:</label>
                          <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                          />
                          <br />
                          <button
                            className="btn btn-success"
                            onClick={
                              editingLecture
                                ? handleUpdateLecture
                                : handleCreateLecture
                            }>
                            {editingLecture
                              ? "Update Lecture"
                              : "Create Lecture"}
                          </button>
                        </div>
                      )}
                      <div className="table-responsive">
                        <table className="table text-nowrap mb-0 align-middle">
                          <thead className="text-dark fs-4">
                            <tr>
                              <th className="border-bottom-0">
                                <h6 className="fw-semibold mb-0">Index</h6>
                              </th>
                              <th className="border-bottom-0">
                                <h6 className="fw-semibold mb-0">Id</h6>
                              </th>
                              <th className="border-bottom-0">
                                <h6 className="fw-semibold mb-0">Name</h6>
                              </th>
                              <th className="border-bottom-0">
                                <h6 className="fw-semibold mb-0">Action</h6>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {courses.map((course, index) => (
                              <>
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>{course.id}</td>
                                  <td>{course.name}</td>
                                  <td>
                                    <button
                                      className="btn btn-info"
                                      onClick={() =>
                                        handleShowLectures(course.id)
                                      }>
                                      {showLecturesForCourse === course.id
                                        ? "Hide Lectures"
                                        : "Show Lectures"}
                                    </button>
                                  </td>
                                </tr>
                                {showLecturesForCourse === course.id &&
                                  lectures[course.id] && (
                                    <tr>
                                      <td colSpan={4}>
                                        <h5>
                                          Lectures for Course ID: {course.id}
                                        </h5>
                                        <table className="table text-nowrap mb-0 align-middle">
                                          <thead className="text-dark fs-4">
                                            <tr>
                                              <th className="border-bottom-0">
                                                <h6 className="fw-semibold mb-0">
                                                  Index
                                                </h6>
                                              </th>
                                              <th className="border-bottom-0">
                                                <h6 className="fw-semibold mb-0">
                                                  Lesson
                                                </h6>
                                              </th>
                                              <th className="border-bottom-0">
                                                <h6 className="fw-semibold mb-0">
                                                  Title
                                                </h6>
                                              </th>
                                              <th className="border-bottom-0">
                                                <h6 className="fw-semibold mb-0">
                                                  Description
                                                </h6>
                                              </th>
                                              <th className="border-bottom-0">
                                                <h6 className="fw-semibold mb-0">
                                                  Action
                                                </h6>
                                              </th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {lectures[course.id].map(
                                              (lecture, lectureIndex) => (
                                                <tr key={lecture.id}>
                                                  <td>{lectureIndex + 1}</td>
                                                  <td>{lecture.lesson}</td>
                                                  <td>{lecture.title}</td>
                                                  <td>{lecture.description}</td>
                                                  <td>
                                                    <button
                                                      className="btn btn-warning"
                                                      onClick={() =>
                                                        handleEditLecture(
                                                          lecture,
                                                          course.id
                                                        )
                                                      }>
                                                      Edit
                                                    </button>
                                                    <button
                                                      className="btn btn-danger"
                                                      onClick={() =>
                                                        handleDeleteLecture(
                                                          lecture.id,
                                                          course.id
                                                        )
                                                      }>
                                                      Delete
                                                    </button>
                                                  </td>
                                                </tr>
                                              )
                                            )}
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  )}
                              </>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LectureManagement;
