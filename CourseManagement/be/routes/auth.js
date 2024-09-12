const express = require("express");
const {
  createUser,
  createAdmin,
  getUserByEmail,
  revokeTokens,
  getUserRole,
  verifyToken,
} = require("../models/user");
const { admin } = require("../config");
const router = express.Router();

// Route để kiểm tra xác thực token
router.post("/verifyToken", verifyToken, (req, res) => {
  res.status(200).json({
    message: "Xác thực thành công",
    uid: req.uid,
    name: req.name,
    role: req.role,
  });
});

// Đăng ký người dùng
router.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const userRecord =
      role === "admin"
        ? await createAdmin(name, email, password)
        : await createUser(name, email, password, role);
    res.status(201).json({ uid: userRecord.uid, role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/delete/:uid", async (req, res) => {
  const { uid } = req.params; // Lấy uid từ URL param
  try {
    await admin.auth().deleteUser(uid);
    res.status(200).send("User deleted successfully");
  } catch (error) {
    res.status(500).send("Error deleting user");
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
