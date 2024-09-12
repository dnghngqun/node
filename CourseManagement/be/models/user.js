const { admin, db } = require("../config");

// Đăng ký người dùng
const createUser = async (name, email, password, role = "user") => {
  try {
    const userRecord = await admin.auth().createUser({ email, password });
    console.log("userRecord: ", userRecord);
    if (!userRecord.uid) {
      throw new Error("User UID is missing");
    }
    await db.collection("users").doc(userRecord.uid).set({ name, role });
    return userRecord;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Tạo tài khoản admin
const createAdmin = async (name, email, password) => {
  return await createUser(name, email, password, "admin");
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

const deleteUser = async (uid) => {
  try {
    await admin.auth().deleteUser(uid);
    console.log(`Successfully deleted user with UID: ${uid}`);

    // Xóa người dùng khỏi Firestore nếu cần
    await db.collection("users").doc(uid).delete();
    console.log(
      `Successfully deleted user data from Firestore with UID: ${uid}`
    );
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

// Middleware xác thực admin token
const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token không hợp lệ" });
  }

  const idToken = authHeader.split("Bearer ")[1];

  try {
    // Xác thực token sử dụng Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    console.log("Decoded token: ", decodedToken);
    let uid = decodedToken.uid;
    //lấy thông tin người dùng
    const userDoc = await db.collection("users").doc(uid).get();

    if (!userDoc.exists) {
      return res.status(404).send("User not found");
    }

    //lưu thông tin vào request
    req.name = userDoc.data().name;
    req.uid = uid;
    next(); // Tiếp tục request sau khi xác thực thành công
  } catch (error) {
    res
      .status(401)
      .json({ error: "Xác thực token thất bại: " + error.message });
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
  verifyToken,
};
