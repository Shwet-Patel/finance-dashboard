import db from "@/db/client.js";
import { Meta } from "@/types/response.type.js";
import { user } from "@drizzle/schema.js";
import { and, count, desc, eq, ilike } from "drizzle-orm";
import { CreateUserSchema, UpdateUserSchema } from "./user.validation.js";
import { ListingInput } from "@/shared/listing.validation.js";

export const getUsersList = async (query: ListingInput) => {
    const { limit, page, search } = query;
    const offset = (page - 1) * limit;

    const totalUsers = await db
        .select({ users: count(user.userId) })
        .from(user)
        .where(eq(user.isDeleted, false)).then(res => res[0].users);

    const usersList = await db
        .select({
            user_id: user.userId,
            username: user.username,
            email: user.email,
            role: user.role,
            is_active: user.isActive,
        })
        .from(user)
        .where(
            and(
                eq(user.isDeleted, false),
                search ? ilike(user.username, `%${search}%`) : undefined,
            )
        )
        .orderBy(desc(user.createdDtm))
        .limit(limit)
        .offset(offset);

    const meta: Meta = {
        currentPage: page,
        itemsPerPage: limit,
        totalItems: totalUsers,
        totalPages: Math.ceil(totalUsers / limit),
        hasPreviousPage: page > 0,
        hasNextPage: page < Math.ceil(totalUsers / limit)
    }

    return { usersList, meta };
}

export const getUserById = async (id: number) => {
    const userData = await db
        .select()
        .from(user)
        .where(eq(user.userId, id));

    return userData;
}

export const getUserByEmail = async (email: string) => {
    const userData = await db
        .select()
        .from(user)
        .where(
            and(
                eq(user.email, email),
                eq(user.isDeleted, false)
            )
        );

    return userData;
}

export const createUser = async (data: CreateUserSchema, userId: number) => {
    const currentTimestamp = new Date().toISOString();
    const createdUser = await db
        .insert(user)
        .values({
            username: data.username,
            email: data.email,
            password: data.password,
            role: data.role,
            isActive: data.is_active,
            createdBy: userId,
            createdDtm: currentTimestamp,
            updatedBy: userId,
            updatedDtm: currentTimestamp,
            isDeleted: false
        })
        .returning({ userId: user.userId });

    return createdUser[0];
}

export const updateUser = async (data: UpdateUserSchema, id: number, userId: number) => {
    const currentTimestamp = new Date().toISOString();
    const updatedUser = await db
        .update(user)
        .set({
            username: data.username,
            role: data.role,
            isActive: data.is_active,
            password: data.password,
            updatedBy: userId,
            updatedDtm: currentTimestamp,
        })
        .where(
            and(
                eq(user.userId, id),
                eq(user.isDeleted, false)
            )
        )
        .returning({ userId: user.userId });

    return updatedUser[0];
}

export const deleteUser = async (id: number, userId: number) => {
    const currentTimestamp = new Date().toISOString();
    const deletedUser = await db
        .update(user)
        .set({
            isDeleted: true,
            updatedBy: userId,
            updatedDtm: currentTimestamp,
        })
        .where(
            and(
                eq(user.userId, id),
                eq(user.isDeleted, false)
            )
        )
        .returning({ userId: user.userId });

    return deletedUser[0];
}