import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import config from "@/configs/env.config.js";
import * as schema from "@drizzle/schema.js";

const sql = neon(config.databaseUrl);
const db = drizzle({ client: sql, schema });

export default db;