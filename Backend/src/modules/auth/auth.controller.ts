import { Request, Response, NextFunction } from "express";
import { LoginSchema } from "@/modules/auth/auth.validation.js";
import * as authService from "@/modules/auth/auth.service.js";
import { AppError } from "@/utils/appError.util.js";

export const loginHandler = async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body as LoginSchema;
    const result = await authService.loginService(data);
    return res.success(200, 'Login successful', result);
};

export const logoutHandler = async (req: Request, res: Response, next: NextFunction) => {
    // due to time constraint not managing tokens in cookies.
    // hence, no need to implement this route as of now.
    throw new AppError(500, 'route not implemented');
};