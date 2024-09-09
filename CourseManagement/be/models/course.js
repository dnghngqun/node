const { db } = require("../config");

// Thêm khóa học
const createCourse = async (courseData) => {
  try {
    const courseRef = db.collection("courses").doc();
    await courseRef.set(courseData);
    return courseRef.id;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Lấy danh sách khóa học
const getCourses = async () => {
  try {
    const coursesSnapshot = await db.collection("courses").get();
    return coursesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw new Error(error.message);
  }
};

// Lấy chi tiết khóa học
const getCourseById = async (id) => {
  try {
    const courseDoc = await db.collection("courses").doc(id).get();
    if (!courseDoc.exists) {
      throw new Error("Course not found");
    }
    return courseDoc.data();
  } catch (error) {
    throw new Error(error.message);
  }
};

// Cập nhật khóa học
const updateCourse = async (id, courseData) => {
  try {
    await db.collection("courses").doc(id).update(courseData);
  } catch (error) {
    throw new Error(error.message);
  }
};

// Xóa khóa học
const deleteCourse = async (id) => {
  try {
    await db.collection("courses").doc(id).delete();
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};
