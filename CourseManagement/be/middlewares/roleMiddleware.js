const { db } = require("../config");

const roleMiddleware = (role) => {
  return async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      const user = await db.collection("users").doc(decodedToken.uid).get();

      if (user.exists && user.data().role === role) {
        next();
      } else {
        res.status(403).send({ message: "Access denied" });
      }
    } catch (error) {
      res.status(401).send({ message: "Unauthorized" });
    }
  };
};

module.exports = roleMiddleware;
