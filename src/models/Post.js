import mongoose, { Schema } from "mongoose";

const postSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500
  }
});

const Post = mongoose.model("Post", postSchema);

export default Post;
