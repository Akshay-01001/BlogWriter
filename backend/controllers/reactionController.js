import blogModel from "../models/blog.model.js";
import reactionModel from "../models/reaction.model.js";

const updateBlogReaction = async (req, res, next) => {
  try {
    const { blog_id,user_id } = req.params; 
    const { action } = req.body; 

    if (!["like", "dislike"].includes(action)) {
      return res.status(400).json({
        success: false,
        message: "Invalid action",
      });
    }

    const existingReaction = await reactionModel.findOne({ blog_id, user_id });

    if (existingReaction) {
      if (existingReaction.type === action) {
        return res.status(400).json({
          success: false,
          message: `You have already ${action}d this blog`,
        });
      }

      // If switching reaction, update it
      await reactionModel.updateOne({ _id: existingReaction._id }, { type: action });

      // Update blog counts
      const updateFields =
        action === "like"
          ? { $inc: { total_likes: 1, total_dislikes: -1 } }
          : { $inc: { total_dislikes: 1, total_likes: -1 } };

      await blogModel.findByIdAndUpdate(blog_id, updateFields);
    } else {
      // If no reaction exists, create a new one
      await reactionModel.create({ user_id, blog_id, type: action });

      // Increase like/dislike count
      const updateFields =
        action === "like"
          ? { $inc: { total_likes: 1 } }
          : { $inc: { total_dislikes: 1 } };

      await blogModel.findByIdAndUpdate(blog_id, updateFields);
    }

    return res.status(200).json({
      success: true,
      message: `Blog ${action}d successfully`,
    });

  } catch (error) {
    next(error);
  }
};

export { updateBlogReaction };
