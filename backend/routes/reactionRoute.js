import {updateBlogReaction} from "../controllers/reactionController.js"
import express from "express"

const router = express.Router()

router.post("/update-reaction/:blog_id/:user_id",updateBlogReaction)

export default router