const router = require("express").Router();
const Post = require("../models/Post");

// Create
router.post("/create", async (req, res, next) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(404).json("you can not create post with (((same title))) ~!!");
  }
});

// Update
router.put("/update/:id", async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (error) {
        res.status(404).json(error.message);
      }
    } else res.status(500).json("you can update only your post ~~!");
  } catch (error) {
    res.status(404).json(error.message);
  }
});

// Delete
router.delete("/delete/:id", async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json("Post deleted Successful ☻♥");
      } catch (error) {
        res.status(404).json(error.message);
      }
    } else res.status(403).json("you can delete only your post ~~!");
  } catch (error) {
    res.status(404).json(error.message);
  }
});

// Get Post
router.get("/get/:id", async (req, res, next) => {
  try {
    const getPost = await Post.findById(req.params.id);
    res.status(200).json(getPost);
  } catch (error) {
    res.status(404).json(error.message);
  }
});

// Get All Posts
router.get("/get", async (req, res, next) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) posts = await Post.find({ username });
    else if (catName)
      posts = await Post.find({ categories: { $in: [catName] } });
    else posts = await Post.find();

    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json(error.message);
  }
});

module.exports = router;
