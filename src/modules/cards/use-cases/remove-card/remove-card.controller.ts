import { BaseController } from "@core/infra/base-controller";
import { CardDTO } from "@shared/dtos/cards/card.dto";
import { Request, Response } from "express";
import { RemoveCardUseCase } from "./remove-card.use-case";

export class RemoveCardController extends BaseController {
  constructor(private readonly useCase: RemoveCardUseCase) {
    super();
  }

  protected async executeImpl(req: Request, res: Response): Promise<void> {
    const { cardId } = req.params;

    const card = await this.useCase.execute(cardId);

    this.ok<CardDTO>(res, card);
  }
}
