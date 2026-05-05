import { verifyToken } from "@/utils/jwt.util.js";
import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        const decoded = verifyToken(token);

        req.user = {
            userId: (decoded as JwtPayload).userId,
            email: (decoded as JwtPayload).email,
            username: (decoded as JwtPayload).username,
            role: (decoded as JwtPayload).role,
        };
        next();
    } catch (error) {
        next(error);
    }
}