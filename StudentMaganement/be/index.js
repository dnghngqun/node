const express = require("express");
const Student = require("./models/Student");

const app = express();
const port = 3000;

// Middleware để parse JSON bodies
app.use(express.json());

// API để liệt kê tất cả các sinh viên
app.get("/students", async (req, res) => {
  try {
    const studentsList = await Student.getAll();
    res.json(studentsList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// API: Lấy sinh viên theo ID
app.get("/student/:id", async (req, res) => {
  try {
    const student = await Student.getById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// API: Tạo một sinh viên mới
app.post("/students", async (req, res) => {
  const { name, age, grade } = req.body;
  try {
    const newStudent = await Student.create({ name, age, grade });
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// API: Cập nhật sinh viên theo ID
app.put("/student/:id", async (req, res) => {
  try {
    const updatedStudent = await Student.update(req.params.id, req.body);
    res.json(updatedStudent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// API: Xóa sinh viên theo ID
app.delete("/student/:id", async (req, res) => {
  try {
    const result = await Student.delete(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Thiết lập server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
