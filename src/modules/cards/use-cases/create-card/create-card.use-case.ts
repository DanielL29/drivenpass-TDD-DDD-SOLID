import { UseCase } from "@core/domain/use-case";
import { CustomError } from "@core/logic/error";
import { Card } from "@modules/cards/domain/card";
import { CardMapper } from "@modules/cards/mappers/card-mapper";
import { CardRepo } from "@modules/cards/repositories/interfaces/card-repo";
import { CardDTO } from "@shared/dtos/cards/card.dto";
import { CreateCardDTO } from "@shared/dtos/cards/create-card.dto";

export class CreateCardUseCase implements UseCase<CreateCardDTO, CardDTO> {
  private readonly repo: CardRepo;
  private readonly mapper: CardMapper;

  constructor(repo: CardRepo) {
    this.repo = repo;
    this.mapper = new CardMapper();
  }

  private async findExistingCard(title: string, userId: string): Promise<void> {
    const isCard = await this.repo.findByTitle(title, userId);

    if (isCard) {
      throw new CustomError(
        "error_conflict",
        "user card[title] is already registered"
      );
    }
  }

  public async execute(
    useCaseReq: CreateCardDTO,
    userId: string
  ): Promise<CardDTO> {
    await this.findExistingCard(useCaseReq.title, userId);

    const domain = Card.create(useCaseReq, userId);

    const createdCard = await this.repo.create(domain);

    return this.mapper.toDTO(createdCard);
  }
}
