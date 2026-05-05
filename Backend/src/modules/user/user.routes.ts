import { Router } from "express";
import { validate } from "@/middlewares/validation.middleware.js";
import { authenticate } from "@/middlewares/authentication.middleware.js";
import { authorize } from "@/middlewares/authorization.middleware.js";
import { ROLES } from "@/utils/constants.util.js";
import { asyncHandler } from "@/utils/asyncHandler.util.js";
import { listingSchema } from "@/shared/listing.validation.js";
import { userIdSchema, createUserSchema, updateUserSchema } from "@/modules/user/user.validation.js";
import * as userHandler from "@/modules/user/user.controller.js";

const userRoutes = Router();

// only admin can manage users
userRoutes.use(authenticate);
userRoutes.use(authorize([ROLES.ADMIN]));

userRoutes.get("/list", validate(listingSchema, 'query'), asyncHandler(userHandler.getUsersListHandler));
userRoutes.post("/", validate(createUserSchema, "body"), asyncHandler(userHandler.createUserHandler));
userRoutes.get("/:id", validate(userIdSchema, "params"), asyncHandler(userHandler.getUserByIdHandler));
userRoutes.put("/:id", validate(userIdSchema, "params"), validate(updateUserSchema, "body"), asyncHandler(userHandler.updateUserByIdHandler));
userRoutes.delete("/:id", validate(userIdSchema, "params"), asyncHandler(userHandler.deleteUserByIdHandler));

export default userRoutes;