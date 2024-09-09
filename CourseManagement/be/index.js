const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const courseRoutes = require("./routes/course");
const lectureRoutes = require("./routes/lecture");

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors()); // Cho phép các yêu cầu từ các nguồn gốc khác nhau

// Sử dụng các route
app.use("/auth", authRoutes);
app.use("/courses", courseRoutes);
app.use("/lectures", lectureRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
