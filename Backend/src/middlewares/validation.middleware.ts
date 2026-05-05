import { Request, Response, NextFunction } from "express";
import z from "zod";

type RequestPart = "body" | "query" | "params";

export const validate =
  (schema: z.ZodSchema<any>, part: RequestPart = "body") =>
    (req: Request, _res: Response, next: NextFunction) => {
      try {

        /*
          1. Get the data from request object's respective part,
          2. Parse the data through the schema,
          3. Replace the validated data into the request object. 

          Note : 
          since req.query is a getter, we can't assign to it directly
          so setting it into the validated query object
        */

        let parsedData: unknown;
        switch (part) {
          case "body":
            parsedData = schema.parse(req.body);
            req.body = parsedData as z.infer<typeof schema>;
            break;
          case "query":
            parsedData = schema.parse(req.query);
            req.validatedQuery = parsedData as z.infer<typeof schema>;
            break;
          case "params":
            parsedData = schema.parse(req.params);
            req.params = parsedData as z.infer<typeof schema>;
            break;
          default:
            // This case should not be reachable.
            throw new Error("Invalid validation part specified");
        }

        next();
      } catch (error) {
        next(error);
      }
    };
