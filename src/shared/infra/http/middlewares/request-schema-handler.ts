import { CustomError } from "@core/logic/error";
import { BodySchemas } from "@shared/infra/schemas";
import { NextFunction, Request, Response } from "express";

export type BodySchemaType = keyof typeof BodySchemas;

export class SchemaValidator {
  public static validateSchema(validator: BodySchemaType) {
    return (req: Request, _res: Response, next: NextFunction) => {
      const { error } = BodySchemas[validator].validate(req.body, {
        abortEarly: false,
      });

      if (error) {
        const message = error.details.map((detail) => detail.message).join();

        throw new CustomError("error_bad_request", message);
      }

      return next();
    };
  }
}
