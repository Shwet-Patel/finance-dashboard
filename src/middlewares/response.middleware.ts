import type { Request, Response, NextFunction } from 'express';
import type { ErrorResponse, Meta, SuccessResponse } from '@/types/response.type.js';

export const responseMiddleware = (
  _req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.success = (
    statusCode: number,
    message: string,
    data: unknown,
    meta?: Meta,
  ): Response => {
    const response: SuccessResponse = {
      success: true,
      statusCode,
      message,
      data,
      meta
    };

    return res.status(statusCode).json(response);
  };

  res.error = (statusCode, message: string, error?: unknown): Response => {
    const response: ErrorResponse = {
      success: false,
      statusCode,
      message,
      error
    };

    return res.status(statusCode).json(response);
  };

  next();
};
