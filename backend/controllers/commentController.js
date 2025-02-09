import commentModel from "../models/comments.model.js";

const createComment = async (req, res, next) => {
  try {
    const { blog_id, user_id } = req.params;
    const { comment } = req.body;

    if (!blog_id || !user_id || !comment) {
      return res
        .status(400)
        .json({ success: false, message: "Missing Details" });
    }

    const newComment = await commentModel.create({blog_id,user_id, comment });

    if (!newComment) {
      return res
        .status(400)
        .json({ success: false, message: "failed to create comment" });
    }

    return res
      .status(200)
      .json({ success: true, message: "comment added successfully" });
  } catch (error) {
    next(error);
  }
};

const getComments = async (req, res, next) => {
    try {
        const {blog_id} = req.params

        if(!blog_id){
            return res.status(400).json({success : false, message : "Invalid Blog"})
        }

        const comments = await commentModel.find({blog_id}).populate("user_id","username profile_pic")

        if(comments.length == 0){
          return res.status(200).json({success : true, message : "No comments to show be first to comment"})
        }

        return res.status(200).json({success : true,message : "comments fetched",comments})

    } catch (error) {
        next(error)
    }
};


export {getComments,createComment}