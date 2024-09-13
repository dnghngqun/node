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

async function getLecturesByCourseId(courseId) {
  try {
    // Truy vấn bài giảng dựa trên courseId
    const lecturesSnapshot = await db
      .collection("courses")
      .doc(courseId)
      .collection("lectures")
      .get();

    // Kiểm tra nếu không có tài liệu nào
    if (lecturesSnapshot.empty) {
      return [];
    }

    // Tạo danh sách bài giảng từ kết quả truy vấn và bao gồm cả id
    const lectures = lecturesSnapshot.docs.map((doc) => ({
      id: doc.id, // ID của tài liệu
      ...doc.data(), // Dữ liệu của tài liệu
    }));

    return lectures;
  } catch (error) {
    console.error("Error fetching lectures:", error);
    throw new Error("Error fetching lectures");
  }
}
// Cập nhật bài giảng theo lectureId
async function updateLecture(courseId, lectureId, lectureData) {
  try {
    await db
      .collection("courses")
      .doc(courseId)
      .collection("lectures")
      .doc(lectureId)
      .update(lectureData);
  } catch (error) {
    throw new Error("Error updating lecture");
  }
}
// Xóa bài giảng theo lectureId
async function deleteLecture(courseId, lectureId) {
  try {
    await db
      .collection("courses")
      .doc(courseId)
      .collection("lectures")
      .doc(lectureId)
      .delete();
  } catch (error) {
    throw new Error("Error deleting lecture");
  }
}

module.exports = {
  addLecture,
  getLecturesByCourseId,
  updateLecture,
  deleteLecture,
};
