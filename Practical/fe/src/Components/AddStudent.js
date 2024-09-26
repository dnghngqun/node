import axios from "axios";
import React, { useState } from "react";
import "./Css/Student.css";
import Nav from "./Nav";
import SideBar from "./Sidebar";

const AddStudent = () => {
  // Khởi tạo với các trường mặc định
  const [fields, setFields] = useState([
    { name: "name", value: "" },
    { name: "age", value: "" },
    { name: "gender", value: "" },
    { name: "major", value: "" },
  ]);

  const handleAddField = () => {
    setFields([...fields, { name: "", value: "" }]);
  };

  const handleFieldChange = (index, event) => {
    const { name, value } = event.target;
    const newFields = fields.map((field, i) =>
      i === index ? { ...field, [name]: value } : field
    );
    console.log("New field: ", newFields);
    setFields(newFields);
  };

  const handleRemoveField = (index) => {
    // Không cho phép xóa tất cả các trường nếu chỉ còn lại một trường
    if (fields.length > 1) {
      setFields(fields.filter((_, i) => i !== index));
    } else {
      alert("Không thể xóa trường cuối cùng.");
    }
  };

  const handleSubmit = async () => {
    // Tạo đối tượng data từ các trường hợp lệ
    const data = {};
    fields.forEach((field) => {
      if (field.name.trim() != null && field.value.trim() != null) {
        data[field.name] = field.value;
      }
    });
    console.log("data: ", data);

    // Kiểm tra xem có dữ liệu hợp lệ để gửi không
    if (Object.keys(data).length === 0) {
      alert("Không có trường nào có giá trị hợp lệ để gửi.");
      return;
    }

    try {
      const response = await axios.post(
        "https://studentmanagementnode.onrender.com/students",
        data
      );
      alert("Sinh viên đã được tạo thành công!");
      console.log(response.data);
    } catch (error) {
      alert("Đã xảy ra lỗi!");
      console.error(error);
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
              <h1 className="mb-4">Tạo Sinh Viên</h1>
              <table
                style={{ width: "95%" }}
                className="table table-bordered mx-auto">
                <thead>
                  <tr>
                    <th>Tên Trường</th>
                    <th>Giá Trị</th>
                    <th>Hành Động</th>
                  </tr>
                </thead>
                <tbody>
                  {fields.map((field, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          value={field.name}
                          onChange={(e) => handleFieldChange(index, e)}
                          placeholder="Tên trường"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          name="value"
                          value={field.value}
                          onChange={(e) => handleFieldChange(index, e)}
                          placeholder="Giá trị"
                        />
                      </td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleRemoveField(index)}>
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                className="btn btn-primary mb-3 mx-auto"
                style={{ width: "95%" }}
                onClick={handleAddField}>
                Thêm Trường
              </button>
              <button
                className="btn btn-success mx-auto"
                style={{ width: "95%" }}
                onClick={handleSubmit}>
                Gửi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
