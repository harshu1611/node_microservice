import { Router } from "express";
import { getPosts, newPost } from "../controllers/postController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router=Router()

router.get('/posts/all',getPosts)
router.post('/posts/new',authMiddleware,newPost)


export default router