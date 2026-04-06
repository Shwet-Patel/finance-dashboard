# API Reference

The backend exposes a RESTful API under the `/api` prefix.

## Authentication

### POST /api/auth/login

- Body:
  - `email` (string)
  - `password` (string)
- Response: JWT access token and user payload
- Public route

## User Management (Admin only)

### GET /api/user/list

- Query params:
  - `page` (number, default `1`)
  - `limit` (number, default `10`)
  - `search` (string, optional)
- Response: paginated user list with metadata
- Requires `Authorization: Bearer <token>`

### POST /api/user

- Body:
  - `username` (string)
  - `email` (string)
  - `password` (string)
  - `role` (`Admin` | `Analyst` | `Viewer`)
  - `is_active` (boolean)
- Creates a new user
- Requires Admin role

### GET /api/user/:id

- Params:
  - `id` (positive integer)
- Returns user details by ID
- Requires Admin role

### PUT /api/user/:id

- Params:
  - `id` (positive integer)
- Body:
  - `username` (string)
  - `password` (string, optional)
  - `role` (`Admin` | `Analyst` | `Viewer`)
  - `is_active` (boolean)
- Updates user details
- Requires Admin role

### DELETE /api/user/:id

- Params:
  - `id` (positive integer)
- Deletes a user by ID
- Requires Admin role

## Record Management

### GET /api/record/list

- Query params:
  - `page` (number, default `1`)
  - `limit` (number, default `10`)
  - `search` (string, optional)
- Response: paginated finance records with metadata
- Roles: `Admin`, `Analyst`, `Viewer`

### POST /api/record

- Body:
  - `amount` (number)
  - `type` (`Income` | `Expense`)
  - `category` (string)
  - `note` (string, optional)
- Creates a finance record
- Requires Admin role

### GET /api/record/:id

- Params:
  - `id` (positive integer)
- Returns a single record by ID
- Roles: `Admin`, `Analyst`

### PUT /api/record/:id

- Params:
  - `id` (positive integer)
- Body:
  - `amount` (number)
  - `type` (`Income` | `Expense`)
  - `category` (string)
  - `note` (string, optional)
- Updates a record by ID
- Requires Admin role

### DELETE /api/record/:id

- Params:
  - `id` (positive integer)
- Deletes a record by ID
- Requires Admin role

### GET /api/record/summary

- Query params:
  - `type` (`Income` | `Expense`, optional)
  - `category` (string, optional)
  - `startDate` (date, default first day of current month)
  - `endDate` (date, default end of current month)
- Returns aggregated record summary
- Roles: `Admin`, `Analyst`

## Response Format

Standard response structure is enforced by `response.middleware.ts`.

- Success response:
  - `success`: `true`
  - `statusCode`
  - `message`
  - `data`
  - `meta` (optional)

- Error response:
  - `success`: `false`
  - `statusCode`
  - `message`
  - `error`
