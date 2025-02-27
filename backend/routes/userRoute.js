import {registerUser,loginUser,addProfilePic,validateUser} from "../controllers/userController.js"
import express from "express"
import {uploadProfilePic} from "../middleware/multerMiddleware.js"

const router = express.Router()

router.post("/register",registerUser)

router.post("/login",loginUser)

router.put("/upload-profile_pic/:email",uploadProfilePic,addProfilePic)

router.post('/validate',validateUser)

export default router