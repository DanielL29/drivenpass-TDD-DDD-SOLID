import { BaseController } from "@core/infra/base-controller";
import { CardDTO } from "@shared/dtos/cards/card.dto";
import { UserDecoded } from "@shared/infra/http/middlewares/token-validator";
import { Request, Response } from "express";
import { FindAllCardUseCase } from "./find-all-card.use-case";

export class FindAllCardController extends BaseController {
  constructor(private readonly useCase: FindAllCardUseCase) {
    super();
  }

  protected async executeImpl(req: Request, res: Response): Promise<void> {
    const user: UserDecoded = res.locals.user;

    const cards = await this.useCase.execute(undefined, user._id);

    this.ok<CardDTO>(res, cards);
  }
}
