import db from "@/db/client.js";
import { user } from "@drizzle/schema.js";
import { and, eq } from "drizzle-orm";

export const findUserByEmail = async (email: string) => {
    const userData = await db
        .select()
        .from(user)
        .where(and(eq(user.email, email), eq(user.isDeleted, false)))
        .limit(1);

    return userData.length > 0 ? userData[0] : null;
}