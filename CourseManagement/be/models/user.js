const { admin, db } = require("../config");

// Đăng ký người dùng
const createUser = async (email, password, role = "user") => {
  try {
    const userRecord = await admin.auth().createUser({ email, password });
    console.log("userRecord: ", userRecord);
    if (!userRecord.uid) {
      throw new Error("User UID is missing");
    }
    await db.collection("users").doc(userRecord.uid).set({ role });
    return userRecord;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Tạo tài khoản admin
const createAdmin = async (email, password) => {
  return await createUser(email, password, "admin");
};

// Lấy thông tin người dùng
const getUserRole = async (uid) => {
  try {
    const userDoc = await db.collection("users").doc(uid).get();
    if (!userDoc.exists) {
      throw new Error("User not found");
    }
    return userDoc.data().role;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Đăng nhập người dùng
const getUserByEmail = async (email) => {
  try {
    const userRecord = await admin.auth().getUserByEmail(email);
    return userRecord;
  } catch (error) {
    throw new Error("Invalid credentials");
  }
};

// Đăng xuất
const revokeTokens = async (uid) => {
  try {
    await admin.auth().revokeRefreshTokens(uid);
  } catch (error) {
    throw new Error("Error logging out");
  }
};

module.exports = {
  createUser,
  createAdmin,
  getUserByEmail,
  revokeTokens,
  getUserRole,
};
