# Setup Guide

This document covers local installation and environment configuration for the finance dashboard backend.

## Prerequisites

- Node.js 18+ installed
- npm available
- Neon PostgreSQL database connection string
- `JWT_SECRET` value for token signing

## Install Dependencies

From the project root:

```bash
npm install
```

## Database Setup

To set up the database schema with tables and relations, execute the SQL script provided in the `scripts/` folder:

```bash
# Run the table generation script from scripts/tableScripts.sql
# This will create the user and record tables with proper foreign key relations
```

You can execute this script directly on your Neon PostgreSQL database using a query tool or your database client.

Alternatively, if you're using Drizzle migrations, run:

```bash
npm run build
```

Then apply pending migrations to your development database.

## Environment Configuration

Create a `.env` file in the project root with the values below:

```env
PORT=3000
DATABASE_URL=postgres://username:password@host:port/dbname
JWT_SECRET=your-secret-key
```

### Environment Variable details

- `PORT`: Express server listening port
- `DATABASE_URL`: Neon PostgreSQL connection string
- `JWT_SECRET`: secret used for JWT signing and verification

## Run the Application

### Development mode

```bash
npm run dev
```

### Production build

```bash
npm run build
npm start
```

## Notes

- The backend loads environment variables using `dotenv`.
- If you change `tsconfig` path aliases, ensure the build still resolves `@/...` imports.
- The `drizzle/` directory contains database schema and migration artifacts.
