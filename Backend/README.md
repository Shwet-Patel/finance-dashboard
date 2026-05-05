# Finance Dashboard Backend

A clean, modular backend API for a finance dashboard built with **Node.js**, **TypeScript**, **Express**, **Drizzle ORM**, and a **serverless Neon PostgreSQL** database.

This project supports role-based access for three user types: **Admin**, **Analyst**, and **Viewer**. It is designed for user management and finance record management with stateless **JWT authentication**, secure password hashing, request validation, and scalable architecture.

## Key Features

- Role-based access control (RBAC) with `Admin`, `Analyst`, and `Viewer` roles
- User management API for creating, reading, updating, and deleting users
- Record management API for listing, creating, updating, deleting, and summarizing finance records
- Stateless JWT authentication with `Bearer` token support
- Zod validation for request payloads, query parameters, and route params
- Clean error and response middleware for standardized JSON output
- Drizzle ORM mapping to a PostgreSQL database hosted on Neon
- Modular structure for easy maintenance and scaling

## Tech Stack

- Node.js + TypeScript
- Express
- Drizzle ORM
- Neon serverless PostgreSQL
- Zod validation
- JSON Web Tokens (`jsonwebtoken`)
- `bcryptjs` for password hashing

## Architecture Overview

- `src/index.ts` initializes the Express app and global middlewares
- `src/modules/` contains feature modules for authentication, users, and records
- `src/middlewares/` handles authentication, authorization, validation, errors, and response formatting
- `src/configs/env.config.ts` centralizes environment configuration
- `drizzle/` contains schema definitions and migrations for database management
- `scripts/` contains SQL scripts for table and relation generation

## Documentation

See the `docs/` folder for additional documentation:

- `docs/architecture.md` - architecture and module overview
- `docs/api-reference.md` - detailed API reference with roles and request shapes
- `docs/setup.md` - installation and environment setup guide

## Future Improvements

- **Initial Admin Seeding**: The current implementation assumes the first admin user is already created. For a fresh system, implement a seed script that automatically inserts a default admin user if no active users exist in the database. Store dummy credentials in environment variables for initial setup.

- **Enhanced Pagination**: Improve pagination to support advanced filters (e.g., date ranges, categories) and create a reusable pagination utility that can be shared across all listing endpoints in user and record modules.

- **Database Error Handling**: Add a utility to catch and transform generic database errors into more descriptive, user-friendly error responses, improving debugging and API reliability.

- **Proper Logout Implementation**: Currently, the logout endpoint is a placeholder. Implement token blacklisting or short-lived tokens to properly handle logout and prevent token reuse.

- **Comprehensive Logging**: Integrate a logging library (e.g., Winston) to track requests, errors, and key events for better monitoring and debugging in production.

- **API Documentation**: Add Swagger/OpenAPI integration to generate interactive API documentation, making it easier for frontend developers to understand and test endpoints.

- **Testing Suite**: Implement unit tests for services and controllers, and integration tests for API endpoints to ensure code reliability and facilitate refactoring.
