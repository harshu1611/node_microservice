import { Router } from "express";
import postRoute from './postRoutes.js'

const router = Router();

router.use("/api", postRoute);

export default router