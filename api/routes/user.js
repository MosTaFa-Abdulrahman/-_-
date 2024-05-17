const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

// Update
router.put("/update/:id", async (req, res, next) => {
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// Delete
router.delete("/delete/:id", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    try {
      await Post.deleteMany({ username: user.username });
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Delete User Successful ☻♥");
    } catch (error) {
      res.status(500).json(error.message);
    }
  } catch (error) {
    res.status(403).json("User not found ~!");
  }
});

// Get
router.get("/get/:id", async (req, res, next) => {
  try {
    const getUser = await User.findById(req.params.id);
    const { password, ...others } = getUser._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
