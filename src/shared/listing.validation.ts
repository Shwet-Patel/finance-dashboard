import z from "zod";

export const listingSchema = z.object({
    page: z.coerce.number().default(1),
    limit: z.coerce.number().default(10),
    search: z.string().trim().optional()
});

export type ListingInput = z.infer<typeof listingSchema>;