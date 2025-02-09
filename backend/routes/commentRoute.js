import { createComment,getComments } from "../controllers/commentController.js";
import express from "express"

const router = express.Router()

router.post("/create-comment/:blog_id/:user_id",createComment)

router.get("/get-comments/:blog_id",getComments)

export default router