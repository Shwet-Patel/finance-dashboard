import type { Meta } from '@/types/response.type';

declare global {
    namespace Express {
        interface Request {
            user?: {
                userId: string;
                username: string;
                email: string;
                role: string;
            }
            validatedQuery?: Record<string, any>;
        }

        interface Response {
            success: (statusCode: number, message: string, data: unknown, meta?: Meta) => Response;
            error: (statusCode: number, message: string, error?: unknown) => Response;
        }
    }
}

export { };
