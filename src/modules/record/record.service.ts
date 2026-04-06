import { AppError } from "@/utils/appError.util.js";
import { ListingInput } from "@/shared/listing.validation.js";
import * as recordRepository from "@/modules/record/record.repository.js";
import { CreateRecordSchema, SummaryQuerySchema } from "./record.validation.js";

export const getRecordByIdService = async (id: number) => {
    const record = await recordRepository.getRecordById(id);
    if (!record) {
        throw new AppError(404, 'record not found');
    }

    return record;
}

export const getRecordsListService = async (query: ListingInput) => {
    const result = await recordRepository.getRecordsList(query);
    return result;
}

export const createRecordService = async (body: CreateRecordSchema, userId: number) => {
    const result = await recordRepository.createRecord(body, userId);
    return result;
}

export const updateRecordByIdService = async (id: number, body: CreateRecordSchema, userId: number) => {
    // check if record exists
    const record = await recordRepository.getRecordById(id);
    if (!record) {
        throw new AppError(404, 'record not found');
    }

    const result = await recordRepository.updateRecordById(id, body, userId);
    return result;
}

export const deleteRecordByIdService = async (id: number, userId: number) => {
    // check if record exists
    const record = await recordRepository.getRecordById(id);
    if (!record) {
        throw new AppError(404, 'record not found');
    }

    const result = await recordRepository.deleteRecordById(id, userId);
    return result;
}

export const getRecordsSummaryService = async (query: SummaryQuerySchema) => {
    const summary = await recordRepository.getSummaryData(query);

    const totalIncome = summary?.totalIncome ?? 0;
    const totalExpense = summary?.totalExpense ?? 0;

    return {
        totalIncome,
        totalExpense,
        net: totalIncome - totalExpense,
    };
}