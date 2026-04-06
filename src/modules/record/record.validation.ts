import z from "zod";

export const recordIdSchema = z.object({
    id: z.coerce.number().int().positive('record ID should be positive integer'),
});

export const createRecordSchema = z.object({
    amount: z.coerce.number().positive('amount should be a positive number'),
    type: z.enum(['Income', 'Expense']),
    category: z.string().min(1, 'category is required'),
    note: z.string().optional(),
});


export const summaryQuerySchema = z.object({
    type: z.enum(['Income', 'Expense']).optional(),
    category: z.string().optional(),

    startDate: z.coerce.date().default(() => {
        const d = new Date();
        return new Date(d.getFullYear(), d.getMonth(), 1);
    }),

    endDate: z.coerce.date().default(() => {
        const d = new Date();
        const end = new Date(d.getFullYear(), d.getMonth() + 1, 0);
        end.setHours(23, 59, 59, 999);
        return end;
    }),
})
    .refine(data => data.startDate <= data.endDate, {
        message: "startDate must be before or equal to endDate",
        path: ["startDate"],
    });

//types
export type RecordIdSchema = z.infer<typeof recordIdSchema>;
export type CreateRecordSchema = z.infer<typeof createRecordSchema>;
export type SummaryQuerySchema = z.infer<typeof summaryQuerySchema>;