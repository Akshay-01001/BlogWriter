import express from "express"
import { createBlog, getBlogById, getAllBlogs, updateBlogReaction } from "../controllers/blogController.js"
import {uploadThumbnail} from "../middleware/multerMiddleware.js"

const router = express.Router()

router.post("/create/:id",uploadThumbnail,createBlog)

router.get("/getblog/:id",getBlogById)

router.get("/get",getAllBlogs)

router.post("/update-reaction/:id",updateBlogReaction)

export default router