const { db } = require("../config");

// Đăng ký khóa học
const registerCourse = async (courseId, userId) => {
  try {
    await db.collection("courseRegistrations").add({ courseId, userId });
  } catch (error) {
    throw new Error(error.message);
  }
};

// Lấy danh sách khóa học của người dùng
const getUserRegistrations = async (userId) => {
  try {
    const registrationsSnapshot = await db
      .collection("courseRegistrations")
      .where("userId", "==", userId)
      .get();
    return registrationsSnapshot.docs.map((doc) => doc.data());
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { registerCourse, getUserRegistrations };
