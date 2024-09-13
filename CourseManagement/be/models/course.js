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

// Lấy danh sách khóa học đã đăng ký của người dùng
const getRegisteredCoursesForUser = async (uid) => {
  try {
    // Tìm tất cả các đăng ký khóa học của người dùng từ collection courseRegistrations
    const registrationsSnapshot = await db.collection("courseRegistrations")
      .where("userId", "==", uid)
      .get();
    
    if (registrationsSnapshot.empty) {
      return []; // Nếu không có đăng ký nào, trả về mảng trống
    }

    // Lấy danh sách các khóa học ID từ các đăng ký
    const courseIds = registrationsSnapshot.docs.map(doc => doc.data().courseId);

    // Nếu không có khóa học nào, trả về mảng trống
    if (courseIds.length === 0) {
      return [];
    }

    // Lấy thông tin chi tiết của các khóa học từ collection courses
    const coursesPromises = courseIds.map(courseId => 
      db.collection("courses").doc(courseId).get()
    );

    const coursesSnapshots = await Promise.all(coursesPromises);

    // Tạo mảng các khóa học từ snapshot
    const courses = coursesSnapshots.map(courseDoc => ({
      id: courseDoc.id,
      ...courseDoc.data()
    }));

    return courses;
  } catch (error) {
    throw new Error(`Error fetching registered courses: ${error.message}`);
  }
};


module.exports = {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  getRegisteredCoursesForUser
};
