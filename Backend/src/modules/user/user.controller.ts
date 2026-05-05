import { Request, Response, NextFunction } from "express";
import { CreateUserSchema, UserIdSchema, UpdateUserSchema } from "@/modules/user/user.validation.js";
import * as userService from "@/modules/user/user.service.js";
import { ListingInput } from "@/shared/listing.validation.js";


export const getUsersListHandler = async (req: Request, res: Response, next: NextFunction) => {
    const query = req.validatedQuery as ListingInput;

    const result = await userService.getUsersListService(query);
    return res.success(200, "Users fetched successfully", result.usersList, result.meta);
};

export const createUserHandler = async (req: Request, res: Response, next: NextFunction) => {
    const userId = Number(req.user?.userId);
    const data = req.body as CreateUserSchema;

    const result = await userService.createUserService(data, userId);
    return res.success(201, "User created successfully", result);
};

export const getUserByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params as unknown as UserIdSchema;

    const data = await userService.getUserByIdService(id);
    return res.success(200, "User fetched successfully", data);
};

export const updateUserByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
    const userId = Number(req.user?.userId);
    const { id } = req.params as unknown as UserIdSchema;
    const data = req.body as UpdateUserSchema;

    const result = await userService.updateUserService(data, id, userId);
    return res.success(200, "User updated successfully", result);
};

export const deleteUserByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
    const userId = Number(req.user?.userId);
    const { id } = req.params as unknown as UserIdSchema;

    const result = await userService.deleteUserService(id, userId);
    return res.success(200, "User deleted successfully", result);
};