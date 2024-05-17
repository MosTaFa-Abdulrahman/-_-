const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    photo: { type: String, default: "" },
    categories: { type: Array },
  },
  { timestamps: true }
);

module.exports = mongoose.model("post", PostSchema);
