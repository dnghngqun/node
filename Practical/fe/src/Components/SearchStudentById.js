import axios from "axios";
import React, { useState } from "react";
import "./Css/Student.css";
import Nav from "./Nav";
import SideBar from "./Sidebar";

const SearchStudentById = () => {
  const [studentId, setStudentId] = useState("");
  const [student, setStudent] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Hàm xử lý khi nhấn nút tìm kiếm
  const handleSearch = async () => {
    if (!studentId) {
      setError("Vui lòng nhập ID");
      return;
    }

    setLoading(true);
    setError(null);
    setStudent(null);

    try {
      const response = await axios.get(
        `https://studentmanagementnode.onrender.com/student/${studentId}`
      );
      setStudent(response.data);
    } catch (err) {
      setError("Không tìm thấy sinh viên với ID này");
    } finally {
      setLoading(false);
    }
  };

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
              <h1 className="mb-4">Tìm Sinh Viên Theo ID</h1>

              {/* Input để nhập ID sinh viên */}
              <div className="mb-3">
                <label htmlFor="studentId" className="form-label">
                  Nhập ID Sinh Viên
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="studentId"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="VD: abc123"
                />
              </div>

              {/* Nút tìm kiếm */}
              <button className="btn btn-primary mb-3" onClick={handleSearch}>
                Tìm kiếm
              </button>

              {/* Hiển thị kết quả tìm kiếm */}
              {loading && <p>Đang tải dữ liệu...</p>}
              {error && <p className="text-danger">{error}</p>}
              {student && (
                <div>
                  <h2>Thông Tin Sinh Viên:</h2>
                  <table className="table table-bordered">
                    <thead>
                      <tr className="table-primary">
                        {Object.keys(student).map((field, index) => (
                          <th key={index}>{field}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {Object.values(student).map((value, index) => (
                          <td key={index}>{value}</td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchStudentById;
