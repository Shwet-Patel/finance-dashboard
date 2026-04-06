import { defineConfig } from "drizzle-kit";
import config from "./src/configs/env.config.js";

export default defineConfig({
    out: "./drizzle",
    schema: "./drizzle/schema.ts",
    dialect: "postgresql",
    dbCredentials: {
        url: config.databaseUrl
    }
});