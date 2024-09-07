const admin = require("firebase-admin");
const serviceAccount = require("./studentmanagement-2952f-firebase-adminsdk-ghdbf-cf953ef0ed.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = { db };
