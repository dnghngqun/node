const express = require("express");
const {
  createUser,
  createAdmin,
  getUserByEmail,
  revokeTokens,
  getUserRole,
} = require("../models/user");
const { admin } = require("../config");
const router = express.Router();

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
      req.uid = decodedToken.uid; // Lưu UID vào req để sử dụng sau này
      next(); // Tiếp tục request sau khi xác thực thành công
    } catch (error) {
      res.status(401).json({ error: "Xác thực token thất bại: " + error.message });
    }
  };
  
  // Route để kiểm tra xác thực token
  router.post("/verifyToken", verifyToken, (req, res) => {
    res.status(200).json({ message: "Xác thực thành công", uid: req.uid });
  });
  

// Đăng ký người dùng
router.post("/signup", async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const userRecord =
      role === "admin"
        ? await createAdmin(email, password)
        : await createUser(email, password, role);
    res.status(201).json({ uid: userRecord.uid, role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Đăng nhập người dùng
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await getUserByEmail(email);
    const role = await getUserRole(user.uid);
    res.status(200).json({ uid: user.uid, role });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

// Đăng xuất
router.post("/logout", async (req, res) => {
  const { uid } = req.body;
  try {
    await revokeTokens(uid);
    res.status(200).send("Logged out successfully");
  } catch (error) {
    res.status(500).send("Error logging out");
  }
});

module.exports = router;
