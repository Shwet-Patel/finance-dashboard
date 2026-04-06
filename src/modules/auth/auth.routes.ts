import { Router } from "express";
import * as authHandler from "@/modules/auth/auth.controller.js";
import { asyncHandler } from "@/utils/asyncHandler.util.js";
import { validate } from "@/middlewares/validation.middleware.js";
import { loginSchema } from "@/modules/auth/auth.validation.js";

const authRoutes = Router();

authRoutes.post("/login", validate(loginSchema, "body"), asyncHandler(authHandler.loginHandler));
authRoutes.post("/logout", asyncHandler(authHandler.logoutHandler));

export default authRoutes;