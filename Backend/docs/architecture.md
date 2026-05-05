# Architecture

This finance dashboard backend is organized to separate concerns clearly and support future growth.

## Core Layers

- `src/index.ts`
  - Initializes the Express application
  - Configures JSON parsing and custom response middleware
  - Mounts the API routes and error handlers

- `src/modules/`
  - Each feature area has its own submodule (`auth`, `user`, `record`)
  - Routes, controllers, services, validation, and repository logic are kept together

- `src/middlewares/`
  - `authentication.middleware.ts` verifies JWT tokens and attaches user context
  - `authorization.middleware.ts` checks role permissions for protected routes
  - `validation.middleware.ts` validates request payloads using Zod
  - `response.middleware.ts` standardizes JSON success/error responses
  - `error.middleware.ts` centralizes error handling and status codes

- `src/configs/env.config.ts`
  - Loads environment variables with `dotenv`
  - Exposes `PORT`, `DATABASE_URL`, and `JWT_SECRET`

- `drizzle/`
  - Contains database schema definitions and migration SQL files
  - Supports Neon Postgres via Drizzle ORM

## Request Flow

1. Incoming request is parsed by Express JSON middleware.
2. Request reaches route handlers under `src/modules/api.routes.ts`.
3. Validation middleware verifies request data and normalizes inputs.
4. Authentication middleware verifies the JWT from `Authorization: Bearer <token>`.
5. Authorization middleware enforces role-based access.
6. Controller handlers call service functions.
7. Service functions coordinate business logic and repository access.
8. Responses are returned with a consistent JSON schema.

## Authentication & Authorization

- Authentication is stateless and uses JSON Web Tokens.
- Tokens contain `userId`, `username`, `email`, and `role`.
- Role definitions are declared in `src/utils/constants.util.ts`.

### Roles

- `Admin` - full access to users and records
- `Analyst` - data read access and records summary
- `Viewer` - read-only access for record listings

## Data Validation

Validation is performed using Zod:

- Authentication payloads in `src/modules/auth/auth.validation.ts`
- User payloads in `src/modules/user/user.validation.ts`
- Record payloads in `src/modules/record/record.validation.ts`
- Pagination and search payloads in `src/shared/listing.validation.ts`

## Database

- The project uses Drizzle ORM to interact with a Neon Postgres database.
- Database schema and migrations are managed under `drizzle/`.
- The repository layer is responsible for direct DB access, while service code handles business logic.
