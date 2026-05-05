import { AppError } from "@/utils/appError.util.js";
import { Request, Response, NextFunction } from "express";

export const authorize = (roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user;
        if (!user) {
            throw new AppError(401, 'Authentication Required');
        }

        if (!roles.includes(user.role)) {
            throw new AppError(403, 'you are not authorized to access this resource');
        }

        next();
    } catch (error) {
        next(error);
    }
}