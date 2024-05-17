const router = require("express").Router();
const Category = require("../models/Category");

// Create
router.post("/create", async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    newCategory.save();
    res.status(200).json("Category has been created ☻♥");
  } catch (error) {
    res.status(404).json(error.message);
  }
});

// Get Categories
router.get("/get/all", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(404).json(error.message);
  }
});

module.exports = router;
