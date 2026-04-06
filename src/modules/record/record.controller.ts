import { Request, Response, NextFunction } from "express";
import { CreateRecordSchema, RecordIdSchema, SummaryQuerySchema } from "@/modules/record/record.validation.js";
import * as recordService from "@/modules/record/record.service.js";
import { ListingInput } from "@/shared/listing.validation.js";

export const getRecordsListHandler = async (req: Request, res: Response, next: NextFunction) => {
    const query = req.validatedQuery as ListingInput;

    const result = await recordService.getRecordsListService(query);
    return res.success(200, "Records fetched successfully", result.recordsList, result.meta);
};

export const createRecordHandler = async (req: Request, res: Response, next: NextFunction) => {
    const userId = Number(req.user?.userId);
    const body = req.body as CreateRecordSchema;

    const result = await recordService.createRecordService(body, userId);
    return res.success(201, 'Record created successfully', result);
};

export const getRecordByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params as unknown as RecordIdSchema;

    const result = await recordService.getRecordByIdService(id);
    return res.success(200, 'Record fetched successfully', result);
};

export const updateRecordByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
    const userId = Number(req.user?.userId);
    const { id } = req.params as unknown as RecordIdSchema;
    const body = req.body as CreateRecordSchema;

    const result = await recordService.updateRecordByIdService(id, body, userId);
    return res.success(200, 'Record updated successfully', result);
};

export const deleteRecordByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
    const userId = Number(req.user?.userId);
    const { id } = req.params as unknown as RecordIdSchema;

    const result = await recordService.deleteRecordByIdService(id, userId);
    return res.success(200, 'Record deleted successfully', result);
};



export const getRecordsSummaryHandler = async (req: Request, res: Response, next: NextFunction) => {
    const query = req.validatedQuery as SummaryQuerySchema;

    const result = await recordService.getRecordsSummaryService(query);
    return res.success(200, "Records summary fetched successfully", result);
};