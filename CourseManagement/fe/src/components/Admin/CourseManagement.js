import axios from "axios";
import React, { useEffect, useState } from "react";
import "../css/admin/AdminFw.css";
import "../css/admin/admin.css";
import Nav from "./Nav";
import Sidebar from "./Sidebar";
const CourseManagement = () => {
  const [isShowCreate, setIsShowCreate] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [studyTime, setStudyTime] = useState("");
  const [isLoad, setIsLoad] = useState(false);
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);
  // Hàm upload ảnh lên Imgur
  const uploadImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      const token = localStorage.getItem("idToken");
      const response = await axios.post(
        "http://localhost:8080/courses/upload-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Nếu cần
          },
        }
      );

      return response.data.link; // Nhận link ảnh từ phản hồi của server
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleCreate = () => {
    if (isVisible) {
      // Delay hiding the form to allow CSS transition to finish
      setTimeout(() => setIsShowCreate(false), 1000);
    } else {
      setIsShowCreate(true);
      setEditingCourse(false);
      setName("");
      setPrice("");
      setDescription("");
      setStudyTime("");
    }
    setIsVisible((value) => !value);
  };

  // Hàm xử lý khi nhấn nút Submit
  const handleCreateCourse = async () => {
    if (!name || !price || !description || !studyTime) {
      console.log("Please fill out all fields.");
      return;
    }
    alert("Please waiting a moment...");
    try {
      if (image) {
        const link = await uploadImage(image);
        if (link) {
          const token = localStorage.getItem("idToken");

          await axios.post(
            "http://localhost:8080/courses",
            {
              name,
              price,
              description,
              imageLink: link,
              studyTime,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // Nếu cần
              },
            }
          );
          setIsLoad(!isLoad);
          alert("Course added successfully!");
        }
      } else {
        console.log("Please select an image.");
      }
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };
  // Xóa khóa học
  const handleDeleteCourse = async (courseId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );
    if (confirmDelete) {
      try {
        const token = localStorage.getItem("idToken");
        await axios.delete(`http://localhost:8080/courses/${courseId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsLoad(!isLoad);
        alert("Course deleted successfully!");
      } catch (error) {
        console.error("Error deleting course:", error);
      }
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/courses/")
      .then((response) => {
        console.log("Respon data: ", response.data);
        setCourses(response.data);
      })
      .catch((error) => {
        console.error("Err to fetch course: ", error);
      });
  }, [isLoad]);

  // Hiển thị form cập nhật khóa học
  const handleEditCourse = (course) => {
    setEditingCourse(course);
    setName(course.name);
    setPrice(course.price);
    setDescription(course.description);
    setStudyTime(course.studyTime);
    setIsShowCreate(true);
    setIsVisible(true);
  };
  // Cập nhật khóa học
  const handleUpdateCourse = async () => {
    if (!editingCourse || !name || !price || !description || !studyTime) {
      console.log("Please fill out all fields.");
      return;
    }
    alert("Updating course...");
    try {
      let link = editingCourse.imageLink;
      if (image) {
        link = await uploadImage(image);
      }
      const token = localStorage.getItem("idToken");

      await axios.put(
        `http://localhost:8080/courses/${editingCourse.id}`,
        {
          name,
          price,
          description,
          imageLink: link,
          studyTime,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsLoad(!isLoad);
      setEditingCourse(null);
      alert("Course updated successfully!");
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

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
          {/* left side-bar */}
          <Sidebar />
          {/* right */}
          <div className="body-wrapper">
            {/* header */}
            <Nav />
            {/* body */}
            <div
              className="container-fluid"
              style={{ maxWidth: "100%", paddingLeft: "0", paddingRight: "0" }}>
              <div className="row">
                <div className="col-lg-12 d-flex align-items-stretch">
                  <div className="card w-100">
                    <div className="card-body p-4">
                      <h5 className="card-title fw-semibold mb-1">
                        All Course
                      </h5>
                      {isShowCreate ? (
                        <button
                          className="badge bg-dark"
                          onClick={handleCreate}>
                          Close
                        </button>
                      ) : (
                        <button
                          className="badge bg-dark"
                          onClick={handleCreate}>
                          Create new course
                        </button>
                      )}

                      {isShowCreate && (
                        <div
                          className={`fade-in ${
                            isVisible ? "show" : "hide"
                          } create-update`}>
                          <label>
                            Name:
                            <input
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          </label>
                          <br />
                          <label>
                            Price:
                            <input
                              type="text"
                              value={price}
                              onChange={(e) => setPrice(e.target.value)}
                            />
                          </label>

                          <br />
                          <label>
                            Image:
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => setImage(e.target.files[0])}
                            />
                          </label>
                          <br />
                          <label>
                            Study Time:
                            <input
                              type="text"
                              value={studyTime}
                              onChange={(e) => setStudyTime(e.target.value)}
                            />
                          </label>
                          <br />
                          <label>
                            Description:
                           
                          </label>
                          <textarea
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                            />
                          <br />
                          {editingCourse ? (
                            <button
                              className="btn btn-success"
                              onClick={handleUpdateCourse}>
                              Update Course
                            </button>
                          ) : (
                            <button
                              className="btn btn-success"
                              onClick={handleCreateCourse}>
                              Create Course
                            </button>
                          )}
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
                                <h6 className="fw-semibold mb-0">Image</h6>
                              </th>
                              <th className="border-bottom-0">
                                <h6 className="fw-semibold mb-0">Price</h6>
                              </th>
                              <th className="border-bottom-0">
                                <h6 className="fw-semibold mb-0">Name</h6>
                              </th>
                              <th className="border-bottom-0">
                                <h6 className="fw-semibold mb-0">
                                  Description
                                </h6>
                              </th>

                              <th className="border-bottom-0">
                                <h6 className="fw-semibold mb-0">Study Time</h6>
                              </th>

                              <th className="border-bottom-0">
                                <h6 className="fw-semibold mb-0">Action</h6>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {courses.map((course, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{course.id}</td>
                                <td>
                                  <img
                                    src={course.imageLink}
                                    alt=""
                                    style={{
                                      width: "100px",
                                      height: "100px",
                                      objectFit: "cover",
                                      borderRadius: "10px",
                                    }}
                                  />
                                </td>
                                <td>{course.price}</td>
                                <td>{course.name}</td>
                                <td>{course.description}</td>
                                <td>{course.studyTime}</td>
                                <td>
                                  <button
                                    className="btn btn-primary me-2"
                                    onClick={() => handleEditCourse(course)}>
                                    Edit
                                  </button>
                                  <button
                                    className="btn btn-danger"
                                    onClick={() =>
                                      handleDeleteCourse(course.id)
                                    }>
                                    Delete
                                  </button>
                                </td>
                              </tr>
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

export default CourseManagement;
