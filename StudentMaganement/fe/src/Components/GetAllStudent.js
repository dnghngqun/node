import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Css/Student.css";
import Nav from "./Nav";
import SideBar from "./Sidebar";

const GetAllStudent = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingIndex, setEditingIndex] = useState(-1); // Chỉ số dòng đang được chỉnh sửa
  const [editData, setEditData] = useState({}); // Dữ liệu đang chỉnh sửa

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          "https://studentmanagementnode.onrender.com/students"
        );
        setStudents(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://studentmanagementnode.onrender.com/student/${id}`
      );
      // Xóa sinh viên khỏi danh sách
      setStudents(students.filter((student) => student.id !== id));
      alert("Sinh viên đã được xoá!");
    } catch (error) {
      alert("Đã xảy ra lỗi khi xoá!");
    }
  };

  const handleEdit = (index, student) => {
    setEditingIndex(index);
    setEditData(student); // Thiết lập dữ liệu ban đầu để sửa
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(
        `https://studentmanagementnode.onrender.com/student/${id}`,
        editData
      );
      const updatedStudents = students.map((student, index) =>
        index === editingIndex ? { ...editData, id: student.id } : student
      );
      setStudents(updatedStudents);
      setEditingIndex(-1); // Dừng việc chỉnh sửa
      alert("Sinh viên đã được cập nhật!");
    } catch (error) {
      alert("Đã xảy ra lỗi khi cập nhật!");
    }
  };

  const handleFieldChange = (event, fieldName) => {
    setEditData({
      ...editData,
      [fieldName]: event.target.value, // Cập nhật giá trị đang sửa
    });
  };

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p>Đã xảy ra lỗi: {error}</p>;

  if (students.length === 0) return <p>Không có sinh viên nào.</p>;

  const allFields = new Set();
  students.forEach((student) => {
    Object.keys(student).forEach((field) => allFields.add(field));
  });

  return (
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
        <SideBar />

        {/* right */}
        <div className="body-wrapper">
          {/* header */}
          <Nav />
          {/* body */}
          <div
            className="container-fluid"
            style={{ maxWidth: "96%", paddingLeft: "0", paddingRight: "0" }}>
            <div className="row">
              <h1 className="mb-4">Danh Sách Sinh Viên</h1>
              <table className="table table-bordered">
                <thead>
                  <tr className="table-primary">
                    {[...allFields].map((field, index) => (
                      <th style={{ fontSize: "15px" }} key={index}>
                        {field}
                      </th>
                    ))}
                    <th>Hành Động</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, rowIndex) => (
                    <tr key={rowIndex}>
                      {[...allFields].map((field, colIndex) => (
                        <td key={colIndex}>
                          {editingIndex === rowIndex && field !== "id" ? (
                            <input
                              type="text"
                              value={editData[field] || ""}
                              onChange={(e) => handleFieldChange(e, field)}
                              className="form-control"
                            />
                          ) : student[field] !== undefined ? (
                            student[field]
                          ) : (
                            "-"
                          )}
                        </td>
                      ))}
                      <td>
                        {editingIndex === rowIndex ? (
                          <button
                            className="btn btn-success btn-sm"
                            onClick={() => handleUpdate(student.id)}>
                            Cập Nhật
                          </button>
                        ) : (
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => handleEdit(rowIndex, student)}>
                            Sửa
                          </button>
                        )}
                        <button
                          className="btn btn-danger btn-sm ms-2"
                          onClick={() => handleDelete(student.id)}>
                          Xóa
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
  );
};

export default GetAllStudent;
