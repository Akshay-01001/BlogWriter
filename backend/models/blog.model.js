import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "users", 
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    total_likes: {
      type: Number,
      default: 0,
    },
    total_dislikes: {
      type: Number,
      default: 0,
    },
    thumbnail: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const blogModel = mongoose.models.blogs || mongoose.model("blogs", blogSchema);

export default blogModel;