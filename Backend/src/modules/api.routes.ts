import { Router } from "express";
import userRoutes from "@/modules/user/user.routes.js";
import authRoutes from "@/modules/auth/auth.routes.js";
import recordRoutes from "@/modules/record/record.routes.js";

const router = Router();

//define routes here
router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/record', recordRoutes);

export default router;