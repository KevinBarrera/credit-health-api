import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";
import { handleHttp } from "../utils/error.handle";

const validateSchema =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const validData = schema.parse({
        body: req.body,
        params: req.params,
        query: req.query
      });
      req.body = validData.body;
      req.params = validData.params;
      req.query = validData.query;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).send({
          message: "Error while data validation.",
          error: error.issues.map((issue) => ({
            path: issue.path,
            message: issue.message
          })),
          data: null
        });
      } else {
        handleHttp(res, error);
      }
    }
  };

export { validateSchema };
