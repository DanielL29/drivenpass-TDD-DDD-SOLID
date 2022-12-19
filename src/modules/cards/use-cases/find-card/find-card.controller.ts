import { BaseController } from "@core/infra/base-controller";
import { CardDTO } from "@shared/dtos/cards/card.dto";
import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { FindCardUseCase } from "./find-card.use-case";

export class FindCardController extends BaseController {
  constructor(private readonly useCase: FindCardUseCase) {
    super();
  }

  protected async executeImpl(req: Request, res: Response): Promise<void> {
    const { cardId } = req.params;

    const card = await this.useCase.execute(cardId);

    this.ok<CardDTO>(res, card);
  }
}
