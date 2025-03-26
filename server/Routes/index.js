import { Router } from "express";

import userRouter from "./userRoutes.js"
import metaRouter from "./metaRoutes.js"

const router = Router()
router.use("/users", userRouter)
router.use("/meta", metaRouter)



export default router