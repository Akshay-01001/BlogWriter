import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email : {
      type : String,
      required : true,
      unique : true
    },
    profile_pic: {
      type: String,
    },
    mobileno: {
      type: String,
      unique: true,
      minlength: 10,
      maxlength: 10,
    },
    profile_pic : {
        type : String,
    }
  },
  { timestamps: true }
);

const userModel = mongoose.models.users || mongoose.model("users", userSchema);
export default userModel;