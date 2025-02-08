import {registerUser,loginUser,addProfilePic} from "../controllers/userController.js"
import express from "express"
import {uploadProfilePic} from "../middleware/multerMiddleware.js"

const router = express.Router()

router.post("/register",registerUser)

router.post("/login",loginUser)

router.put("/upload-profile_pic/:email",uploadProfilePic,addProfilePic)

export default router