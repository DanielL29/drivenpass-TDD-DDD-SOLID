import { BaseController } from "@core/infra/base-controller";
import { CardDTO } from "@shared/dtos/cards/card.dto";
import { CreateCardDTO } from "@shared/dtos/cards/create-card.dto";
import { UserDecoded } from "@shared/infra/http/middlewares/token-validator";
import { Request, Response } from "express";
import { CreateCardUseCase } from "./create-card.use-case";

export class CreateCardController extends BaseController {
  constructor(private readonly useCase: CreateCardUseCase) {
    super();
  }

  protected async executeImpl(req: Request, res: Response): Promise<void> {
    const cardReq: CreateCardDTO = req.body;
    const user: UserDecoded = res.locals.user;

    const card = await this.useCase.execute(cardReq, user._id);

    this.created<CardDTO>(res, card);
  }
}
