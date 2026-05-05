import config from '@/configs/env.config.js';
import { AppError } from '@/utils/appError.util.js';
import jwt from 'jsonwebtoken';

export const generateToken = (payload: object, options?: jwt.SignOptions) => {
    const token = jwt.sign(payload, config.jwtSecret, options);
    return token;
}

export const verifyToken = (token: string | undefined) => {
    try {
        if (!token) {
            throw new AppError(404, 'token is required');
        }

        const decoded = jwt.verify(token, config.jwtSecret);
        return decoded as jwt.JwtPayload;
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            throw new AppError(401, 'Token has expired');
        }

        // typical error
        throw new AppError(401, 'Invalid token');
    }
};