const express = require("express");
const { addLecture, getLecturesByCourseId } = require("../models/lecture");
const { adminOnly, userOnly } = require("../middlewares/auth");
const router = express.Router();

// Thêm bài giảng vào khóa học (chỉ admin)
router.post("/:courseId", adminOnly, async (req, res) => {
  const { courseId } = req.params;
  const lectureData = req.body;
  try {
    const lectureId = await addLecture(courseId, lectureData);
    res.status(201).json({ id: lectureId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Lấy danh sách bài giảng của khóa học (user và admin)
router.get('/:courseId', userOnly, async (req, res) => {
    const { courseId } = req.params;
    try {
      const lectures = await getLecturesByCourseId(courseId);
      res.status(200).json(lectures);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;
