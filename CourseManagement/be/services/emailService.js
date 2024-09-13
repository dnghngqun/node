// services/emailService.js
const nodemailer = require("nodemailer");
require("dotenv").config();
const validator = require("validator");
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
// Hàm gửi email thông báo tới tất cả người dùng
const sendEmailToUsers = async (courseName, users) => {
  // Lọc các user có email không null và hợp lệ
  const validUsers = users.filter(
    (user) => user.email && validator.isEmail(user.email)
  );

  // Nếu không có email hợp lệ, dừng
  if (validUsers.length === 0) {
    console.log("No valid emails found. Skipping email sending.");
    return;
  }
  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: validUsers.map((user) => user.email),
    subject: "New Course Created!",
    text: `A new course titled "${courseName}" has been created. Check it out now!`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Emails sent successfully!");
  } catch (error) {
    console.error("Error sending emails:", error);
  }
};

module.exports = { sendEmailToUsers };
