const express = require("express");
const mongoose = require("mongoose");
const Item = require("./models/Item");

const app = express();
const port = 3000;

mongoose
  .connect("mongodb://localhost:27017/ecommerceDB")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Err to connect: ", err));

app.use(express.json()); //middleware để parse JSON
//API để liệt kê tất cả các item
app.get("/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Lấy API theo ID
app.get("/item/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    console.log("Found: ", item);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//API: Create
app.post("/items", async (req, res) => {
  const { name, description, price } = req.body;
  const item = new Item({
    name,
    description,
    price,
  });

  try {
    const newItem = await item.save();
    res.status(201).json({ newItem });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//API: update
app.put("/item/:id", async (req, res) => {
  try {
    let item = await Item.findById(req.params.id);
    console.log("Found: ", item);
    if (!item) return res.status(404).json({ message: "Item not found" });

    // Cập nhật tất cả các field được truyền từ req.body
    Object.assign(item, req.body);

    // Lưu item đã cập nhật
    const updatedItem = await item.save();
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// API: Delete
app.delete("/item/:id", async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    console.log("Deleted: ", item);
    
    if (!item) return res.status(404).json({ message: "Item not found" });

    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


//Thiết lập server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
