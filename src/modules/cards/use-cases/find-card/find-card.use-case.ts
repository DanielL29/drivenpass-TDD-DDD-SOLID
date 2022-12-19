import { UseCase } from "@core/domain/use-case";
import { CustomError } from "@core/logic/error";
import { Card } from "@modules/cards/domain/card";
import { CardMapper } from "@modules/cards/mappers/card-mapper";
import { CardRepo } from "@modules/cards/repositories/interfaces/card-repo";
import { CardDTO } from "@shared/dtos/cards/card.dto";

export class FindCardUseCase implements UseCase<string, CardDTO> {
  private readonly repo: CardRepo;
  private readonly mapper: CardMapper;

  constructor(repo: CardRepo) {
    this.repo = repo;
    this.mapper = new CardMapper();
  }

  private async findCardOrFail(cardId: string): Promise<Card> {
    const isCard = await this.repo.find(cardId);

    if (!isCard) {
      throw new CustomError(
        "error_not_found",
        "user card not found or does not belong to user"
      );
    }

    return isCard;
  }

  public async execute(cardId: string): Promise<CardDTO> {
    const card = await this.findCardOrFail(cardId);

    return this.mapper.toDTO(card);
  }
}
