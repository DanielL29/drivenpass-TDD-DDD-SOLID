import { UseCase } from "@core/domain/use-case";
import { CardMapper } from "@modules/cards/mappers/card-mapper";
import { CardRepo } from "@modules/cards/repositories/interfaces/card-repo";
import { CardDTO } from "@shared/dtos/cards/card.dto";

export class FindAllCardUseCase implements UseCase<undefined, CardDTO[]> {
  private readonly repo: CardRepo;
  private readonly mapper: CardMapper;

  constructor(repo: CardRepo) {
    this.repo = repo;
    this.mapper = new CardMapper();
  }

  public async execute(
    _useCaseReq: undefined,
    userId: string
  ): Promise<CardDTO[]> {
    const cards = await this.repo.findAll(userId);

    return this.mapper.bulkToDTO(cards);
  }
}
