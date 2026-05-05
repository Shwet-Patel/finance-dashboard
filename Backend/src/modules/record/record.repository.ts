import db from "@/db/client.js";
import { ListingInput } from "@/shared/listing.validation.js";
import { Meta } from "@/types/response.type.js";
import { record, user } from "@drizzle/schema.js";
import { and, count, desc, eq, gte, lte, sql } from "drizzle-orm";
import { CreateRecordSchema, SummaryQuerySchema } from "./record.validation.js";

export const getRecordById = async (id: number) => {
    const result = await db
        .select()
        .from(record)
        .where(
            and(
                eq(record.recordId, id),
                eq(record.isDeleted, false)
            )
        )

    return result.length > 0 ? result[0] : null;
}

export const getRecordsList = async (query: ListingInput) => {
    const { page, limit } = query;

    const totalRecords = await db
        .select({ records: count(record.recordId) })
        .from(record)
        .where(
            and(
                eq(record.isDeleted, false)
            )
        )
        .then((res) => res[0].records);

    const recordsList = await db
        .select({
            record_id: record.recordId,
            amount: record.amount,
            type: record.type,
            category: record.category,
            note: record.note
        })
        .from(record)
        .where(
            eq(record.isDeleted, false)
        )
        .orderBy(desc(record.createdDtm))
        .limit(limit)
        .offset((page - 1) * limit);

    const meta: Meta = {
        currentPage: page,
        totalPages: Math.ceil(totalRecords / limit),
        totalItems: totalRecords,
        itemsPerPage: limit,
        hasNextPage: page < Math.ceil(totalRecords / limit),
        hasPreviousPage: page > 1
    }

    return { recordsList, meta };
}

export const createRecord = async (body: CreateRecordSchema, userId: number) => {
    const currentTimestamp = new Date().toISOString();
    const result = await db
        .insert(record)
        .values({
            amount: body.amount,
            type: body.type,
            category: body.category,
            note: body.note,
            createdBy: userId,
            createdDtm: currentTimestamp,
            updatedBy: userId,
            updatedDtm: currentTimestamp,
            isDeleted: false,
        })
        .returning({ record_id: record.recordId });

    return result[0];
}

export const updateRecordById = async (id: number, body: CreateRecordSchema, userId: number) => {
    const currentTimestamp = new Date().toISOString();
    const result = await db
        .update(record)
        .set({
            amount: body.amount,
            type: body.type,
            category: body.category,
            note: body.note,
            updatedBy: userId,
            updatedDtm: currentTimestamp
        })
        .where(
            and(
                eq(record.recordId, id),
                eq(record.isDeleted, false)
            )
        )
        .returning({ record_id: record.recordId });

    return result[0];
}

export const deleteRecordById = async (id: number, userId: number) => {
    const currentTimestamp = new Date().toISOString();
    const result = await db
        .update(record)
        .set({
            isDeleted: true,
            updatedBy: userId,
            updatedDtm: currentTimestamp
        })
        .where(
            and(
                eq(record.recordId, id),
                eq(record.isDeleted, false)
            )
        )
        .returning({ record_id: record.recordId });

    return result[0];
}

export const getSummaryData = async (filters: SummaryQuerySchema) => {
    const { type, category, startDate, endDate } = filters;

    const start = startDate.toISOString();
    const end = endDate.toISOString();

    const conditions = and(
        eq(record.isDeleted, false),

        gte(record.createdDtm, start),
        lte(record.createdDtm, end),

        type ? eq(record.type, type) : undefined,
        category ? eq(record.category, category) : undefined,
    );

    const [result] = await db
        .select({
            totalIncome: sql<number>`
                COALESCE(SUM(
                    CASE 
                        WHEN ${record.type} = 'Income' THEN ${record.amount}
                        ELSE 0
                    END
                ), 0)
            `,
            totalExpense: sql<number>`
                COALESCE(SUM(
                    CASE 
                        WHEN ${record.type} = 'Expense' THEN ${record.amount}
                        ELSE 0
                    END
                ), 0)
            `,
        })
        .from(record)
        .where(conditions);

    return {
        totalIncome: Number(result?.totalIncome ?? 0),
        totalExpense: Number(result?.totalExpense ?? 0),
    };
};