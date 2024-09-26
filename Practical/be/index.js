const express = require("express");
const studentRoutes = require("./routes/studentRoutes");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors()); // Cho phép các yêu cầu từ các nguồn gốc khác nhau

app.use("/students", studentRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
