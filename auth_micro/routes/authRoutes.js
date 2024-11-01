import {Router} from "express"
import { getUser, login, register, user } from "../controller/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router=Router()
router.post("/auth/register",register)
router.post("/auth/login",login)
router.get("/auth/user",authMiddleware,user)
router.get("/auth/user/:id",getUser)
export default router;  