import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userModel from "../models/user.model.js";

const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username) {
      return res
        .status(400)
        .json({ status: false, message: "Username required" });
    }

    if (!email) {
      return res.status(400).json({ status: false, message: "Email required" });
    }

    if (!password) {
      return res
        .status(400)
        .json({ status: false, message: "Password required" });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ status: false, message: "User already exists" });
    }

    // Hash password (Use async version)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser._id, username: newUser.username, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Set token in cookies
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      status: true,
      message: "Registered Successfully",
      token,
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username) {
      return res
        .status(400)
        .json({ success: false, message: "username is required" });
    }

    if (!password) {
      return res
        .status(400)
        .json({ success: false, message: "password is required" });
    }

    const existingUser = await userModel.findOne({ username });

    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "user not exist" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect password" });
    }

    const token = jwt.sign(
      {
        id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Set token in cookies
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      status: true,
      message: "Login Successfull",
      token,
    });
  } catch (error) {
    next(error);
  }
};

const addProfilePic = async (req, res, next) => {
  try {
    const { email } = req.params;
    const file = req.file?.path;

    if (!file) {
      return res
        .status(404)
        .json({ success: false, message: "No file uploaded" });
    }

    const updatedUser = await userModel.findOneAndUpdate(
      { email },
      { profile_pic: file },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res
      .status(200)
      .json({
        success: true,
        message: "Profile picture updated",
        user: updatedUser,
      });
  } catch (error) {
    next(error);
  }
};

export { registerUser, loginUser, addProfilePic};
