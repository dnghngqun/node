const express = require("express");
const {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  getRegisteredCoursesForUser,
} = require("../models/course");
const { registerCourse } = require("../models/registration");
const { adminOnly, userOnly } = require("../middlewares/auth");
const router = express.Router();
const axios = require("axios");
const imgur = require("imgur");
const multer = require("multer");
const { sendEmailToUsers } = require("../services/emailService");
const { getAllUsers } = require("../models/user");
const { getLecturesByCourseId } = require("../models/lecture");

// Cấu hình Imgur API
imgur.ImgurClientID = process.env.IMGUR_CLIENT_ID;

// Thêm khóa học (chỉ admin)
router.post("/", adminOnly, async (req, res) => {
  const courseData = req.body;
  try {
    const courseId = await createCourse(courseData);

    console.log("Course created successfully with ID:", courseId);

    const users = await getAllUsers(); //lấy all danh sách người dùng để gửi email

    await sendEmailToUsers(courseData.name, users);
    console.log("SendEmail to users successfully!");
    res.status(201).json({ id: courseId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Multer cấu hình lưu file tạm thời
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// API upload ảnh lên Imgur
router.post("/upload-image", upload.single("image"), async (req, res) => {
  try {
    const image = req.file.buffer.toString("base64");
    // console.log("image: ", image);
    const response = await axios.post(
      "https://api.imgur.com/3/image",
      {
        image: image,
        type: "base64",
      },
      {
        headers: {
          Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
          "Content-Type": "application/json",
        },
      }
    );

    const imageLink = response.data.data.link;
    res.status(200).json({ link: imageLink });
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
router.get("/", async (req, res) => {
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
    console.log("uid: ", uid);
    console.log("id: ", id);
    await registerCourse(id, uid);
    res.status(200).send("Course registered successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Lấy danh sách khóa học đã đăng ký của người dùng
router.get("/user-courses/:uid", async (req, res) => {
  const { uid } = req.params;
  try {
    // Lấy danh sách khóa học từ DB hoặc từ model tương ứng
    const registeredCourses = await getRegisteredCoursesForUser(uid);
    res.status(200).json(registeredCourses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Lấy danh sách bài giảng của một khóa học
router.get("/:id/lectures", async (req, res) => {
  const { id } = req.params;
  try {
    // Lấy danh sách bài giảng từ DB hoặc từ model tương ứng
    const lectures = await getLecturesByCourseId(id);
    res.status(200).json(lectures);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
