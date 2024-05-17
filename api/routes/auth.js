const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const {
  generateTokenAndSetCookie,
} = require("../utils/generateTokenAndSetCookie");

// Register
router.post("/register", async (req, res, next) => {
  try {
    const { email, username } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
    const user = await User.findOne({ $or: [{ email }, { username }] });

    if (user)
      return res.status(400).json({ error: "User already exists 🙄🧐" });
    else {
      const salt = bcrypt.genSalt(10);
      const hashPassword = bcrypt.hashSync(req.body.password, parseInt(salt));
      const newUser = new User({ ...req.body, password: hashPassword });
      await newUser.save();

      if (newUser) {
        generateTokenAndSetCookie(newUser._id, res);

        res.status(200).json({
          _id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          profilePicture: newUser.profilePicture,
        });
      } else res.status(400).json({ error: "Invalid user data 😥" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login
router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) return res.status(400).send("User not Found 🙄🧐");
    else {
      const validatePassword = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!validatePassword) return res.status(404).send("Wrong Password 😥");
      else {
        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
          _id: user._id,
          username: user.username,
          email: user.email,
          profilePicture: user.profilePicture,
        });
      }
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
