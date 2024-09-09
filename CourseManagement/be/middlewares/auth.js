const { getUserRole } = require("../models/user");
const { admin, db } = require("../config");
// Middleware kiểm tra quyền admin
const adminOnly = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ error: "No or invalid token provided" });
  }

  const token = authHeader.split("Bearer ")[1];
  console.log("Token: ", token);
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log("decodedToken: ", decodedToken);
    const userDoc = await db.collection("users").doc(decodedToken.uid).get();
    if (!userDoc.exists) {
      return res.status(404).json({ error: "User not found" });
    }
    const role = userDoc.data().role || "user"; // Lấy vai trò từ token hoặc mặc định là 'user'

    console.log("UID: ", decodedToken.uid);
    console.log("Role: ", role);

    if (role !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }
    next();
  } catch (error) {
    console.log("err: ", error);
    res.status(500).json({ error: "Failed to authenticate token" });
  }
};

// Middleware kiểm tra quyền user
const userOnly = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ error: "No or invalid token provided" });
  }

  const token = authHeader.split("Bearer ")[1];
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log("decodedToken: ", decodedToken);
    const userDoc = await db.collection("users").doc(decodedToken.uid).get();
    if (!userDoc.exists) {
      return res.status(404).json({ error: "User not found" });
    }
    const role = userDoc.data().role || "user"; // Lấy vai trò từ token hoặc mặc định là 'user'

    console.log("UID: ", decodedToken.uid);
    console.log("Role: ", role);

    if (role !== "user" && role !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }
    next();
  } catch (error) {
    res.status(500).json({ error: "Failed to authenticate token" });
  }
};

module.exports = { adminOnly, userOnly };
