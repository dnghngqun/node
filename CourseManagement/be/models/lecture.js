const { db } = require("../config");

// Thêm bài giảng
const addLecture = async (courseId, lectureData) => {
  try {
    const lectureRef = db
      .collection("courses")
      .doc(courseId)
      .collection("lectures")
      .doc();
    await lectureRef.set(lectureData);
    return lectureRef.id;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Lấy danh sách bài giảng của khóa học
const getLecturesByCourseId = async (courseId) => {
  try {
    const lecturesSnapshot = await db
      .collection("courses")
      .doc(courseId)
      .collection("lectures")
      .get();
    return lecturesSnapshot.docs.map((doc) => doc.data());
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { addLecture, getLecturesByCourseId };
