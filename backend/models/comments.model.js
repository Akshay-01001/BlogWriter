import mongoose from "mongoose";

const commentsSchema = mongoose.Schema({
    blog_id : {
        type : mongoose.Types.ObjectId,
        ref : "blogs",
        required : true
    },
    user_id : {
        type : mongoose.Types.ObjectId,
        ref : "users",
        required : true
    },
    comment : {
        type : String,
        required : true,
    },
    created_at : {
        type : String,
        default : Date.now
    }
},{timestamps : true})

const commentModel = mongoose.models.comments || mongoose.model("comments",commentsSchema)

export default commentModel