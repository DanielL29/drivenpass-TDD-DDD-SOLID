import httpStatus from "http-status";
import { Errors, ErrorType } from "@core/logic/error";
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

interface ErrorHandlerObject extends ErrorRequestHandler, Error {
  type: ErrorType;
  message: string;
}

export class ErrorHandler {
  public static async handleExceptions(
    error: ErrorHandlerObject,
    _res: Request,
    res: Response,
    _next: NextFunction
  ) {
    const { message, type } = error;

    if (Errors[type]) {
      const { status, name } = Errors[type];

      return res.status(status).json({ name, message });
    }

    console.log(error);

    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
