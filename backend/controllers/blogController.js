import mongoose from "mongoose";
import blogModel from "../models/blog.model.js";

const createBlog = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { title, description, content, category } = req.body;
    const thumbnail = req.file?.path;
    console.log(title, description, content, category);

    if (!title || !description || !content || !category || !thumbnail) {
      return res
        .status(400)
        .json({ success: false, message: "missing details" });
    }

    const newBlog = {
      user_id: id,
      title,
      description,
      content,
      category,
      thumbnail,
    };

    const blog = await blogModel.create(newBlog);

    if (!blog) {
      return res
        .status(400)
        .json({ success: false, message: "failed to create blgo" });
    }

    return res
      .status(200)
      .json({ success: true, message: "blog created successfully" });
  } catch (error) {
    next(error);
  }
};

const getBlogById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const blog = await blogModel
      .findById(id)
      .populate("user_id", "username email profile_pic");

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    res.status(200).json({ success: true, blog });
  } catch (error) {
    next(error);
  }
};

const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await blogModel
      .find()
      .populate("user_id", "username email profile_pic");

    if (blogs.length == 0) {
      return res
        .status(201)
        .json({ sucess: true, message: "No blogs to show" });
    }

    return res
      .status(200)
      .json({ success: true, message: "blogs fetched succesfully", blogs });
  } catch (error) {
    next(error);
  }
};

const updateBlogReaction = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { action, type } = req.body;
  
      if (!id || !["like", "dislike"].includes(action) || !["increase", "decrease"].includes(type)) {
        return res.status(400).json({
          success: false,
          message: "Invalid or missing parameters",
        });
      }
  
      const updatedFields =
        type === "increase"
          ? action === "like"
            ? { $inc: { total_likes: 1 } }
            : { $inc: { total_dislikes: 1 } }
          : action === "like"
          ? { $inc: { total_likes: -1 } } // Decrease likes
          : { $inc: { total_dislikes: -1 } }; // Decrease dislikes
  
      // Update the blog post
      const updatedBlog = await blogModel.findByIdAndUpdate(id, updatedFields, { new: true }).populate("user_id","username");
  
      if (!updatedBlog) {
        return res.status(404).json({ success: false, message: "Blog not found" });
      }
  
      return res.status(200).json({
        success: true,
        message: "Reaction updated successfully",
        blog: updatedBlog,
      });
  
    } catch (error) {
      next(error);
    }
  };

export { createBlog, getBlogById, getAllBlogs, updateBlogReaction };
