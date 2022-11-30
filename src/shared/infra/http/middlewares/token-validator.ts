import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { CustomError } from "@core/logic/error";

export interface UserDecoded {
  _id: string;
}

export class TokenValidator {
  public static validateToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    if (!req.headers.authorization) {
      throw new CustomError(
        "error_unauthorized",
        "missing headers authorization"
      );
    }

    const token = req.headers.authorization?.replace("Bearer ", "");
    let decoded;

    try {
      decoded = jwt.verify(token!, process.env.JWT_SECRET!);
    } catch (error) {
      const jwtError = error as JsonWebTokenError;

      throw new CustomError(
        "error_unauthorized",
        `${jwtError.name}: ${jwtError.message}`
      );
    }

    res.locals.user = decoded as UserDecoded;

    return next();
  }
}
