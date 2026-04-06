
// Meta data for paginated responses
export interface Meta {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}

// Success response type
export interface SuccessResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: unknown;
    meta?: Meta; // Only for paginated responses
}

// Error response type
export interface ErrorResponse {
    success: boolean;
    statusCode: number;
    message: string;
    error?: unknown; // This can be an object or a string
}
