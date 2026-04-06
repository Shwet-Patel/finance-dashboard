import type { Request, Response, NextFunction } from 'express';
import { AppError } from '@/utils/appError.util.js';
import { ZodError, treeifyError } from "zod";

export const errorMiddleware = (err: unknown, _req: Request, res: Response, _next: NextFunction) => {

    // known structured app error thrown using AppError class
    if (err instanceof AppError) {
        return res.error(err.statusCode, err.message, err.details);
    }

    // data validation error thrown by zod
    if (err instanceof ZodError) {
        const formatedError = treeifyError(err);
        return res.error(400, "Validation Error", formatedError);
    }

    //.... we can add more if we have more classified sets of errors

    // unknown errors
    console.error('Unexpected Error: ', err);
    return res.error(500, 'Internal Server Error', err);
};