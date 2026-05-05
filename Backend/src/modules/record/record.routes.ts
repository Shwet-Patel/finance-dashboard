import { Router } from "express";
import { validate } from "@/middlewares/validation.middleware.js";
import { authenticate } from "@/middlewares/authentication.middleware.js";
import { authorize } from "@/middlewares/authorization.middleware.js";
import { ROLES } from "@/utils/constants.util.js";
import { asyncHandler } from "@/utils/asyncHandler.util.js";
import { createRecordSchema, recordIdSchema, summaryQuerySchema } from "@/modules/record/record.validation.js";
import * as recordHandler from "@/modules/record/record.controller.js";
import { listingSchema } from "@/shared/listing.validation.js";

const recordRoutes = Router();
recordRoutes.use(authenticate);

// summary API
recordRoutes.get('/summary', authorize([ROLES.ADMIN, ROLES.ANALYST]), validate(summaryQuerySchema, "query"), asyncHandler(recordHandler.getRecordsSummaryHandler));

// standard CRUD Routes
recordRoutes.get('/list', authorize([ROLES.ADMIN, ROLES.ANALYST, ROLES.VIEWER]), validate(listingSchema, 'query'), asyncHandler(recordHandler.getRecordsListHandler));
recordRoutes.post('/', authorize([ROLES.ADMIN]), validate(createRecordSchema, "body"), asyncHandler(recordHandler.createRecordHandler));
recordRoutes.get('/:id', authorize([ROLES.ADMIN, ROLES.ANALYST]), validate(recordIdSchema, "params"), asyncHandler(recordHandler.getRecordByIdHandler));
recordRoutes.put('/:id', authorize([ROLES.ADMIN]), validate(recordIdSchema, "params"), validate(createRecordSchema, "body"), asyncHandler(recordHandler.updateRecordByIdHandler));
recordRoutes.delete('/:id', authorize([ROLES.ADMIN]), validate(recordIdSchema, "params"), asyncHandler(recordHandler.deleteRecordByIdHandler));


export default recordRoutes;