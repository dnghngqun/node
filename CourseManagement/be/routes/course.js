const express = require("express");
const {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} = require("../models/course");
const { registerCourse } = require("../models/registration");
const { adminOnly, userOnly } = require("../middlewares/auth");
const router = express.Router();

// Thêm khóa học (chỉ admin)
router.post("/", adminOnly, async (req, res) => {
  const courseData = req.body;
  try {
    const courseId = await createCourse(courseData);
    res.status(201).json({ id: courseId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Lấy danh sách khóa học
router.get("/", async (req, res) => {
  try {
    const courses = await getCourses();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Lấy chi tiết khóa học (user và admin)
router.get("/:id", userOnly, async (req, res) => {
  const { id } = req.params;
  try {
    const course = await getCourseById(id);
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Lấy danh sách khóa học (user và admin)
router.get("/", userOnly, async (req, res) => {
  try {
    const courses = await getCourses();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Cập nhật khóa học (chỉ admin)
router.put("/:id", adminOnly, async (req, res) => {
  const { id } = req.params;
  const courseData = req.body;
  try {
    await updateCourse(id, courseData);
    res.status(200).send("Course updated successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Xóa khóa học (chỉ admin)
router.delete("/:id", adminOnly, async (req, res) => {
  const { id } = req.params;
  try {
    await deleteCourse(id);
    res.status(200).send("Course deleted successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Đăng ký khóa học (user và admin)
router.post("/:id/register", userOnly, async (req, res) => {
  const { id } = req.params;
  const { uid } = req.body;
  try {
    await registerCourse(id, uid);
    res.status(200).send("Course registered successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
