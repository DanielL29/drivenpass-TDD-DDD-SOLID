import { Card } from "@modules/cards/domain/card";
import { CardMapper } from "@modules/cards/mappers/card-mapper";
import { CardPersistence, CardRepo } from "../interfaces/card-repo";

export class InMemoryCardRepo implements CardRepo {
  private cards: CardPersistence[];
  private readonly mapper: CardMapper;

  constructor() {
    this.mapper = new CardMapper();
    this.cards = [];
  }

  public async findByTitle(
    title: string,
    userId: string
  ): Promise<Card | null> {
    const isCard = this.cards.find(
      (card) => card.title === title && card.userId === userId
    );

    if (!isCard) {
      return null;
    }

    return this.mapper.toDomain(isCard);
  }

  public async create(data: Card): Promise<Card> {
    const cardPersistence = this.mapper.toPersistence(data);

    this.cards.push(cardPersistence);

    return this.mapper.toDomain(cardPersistence);
  }

  public async findAll(userId: string): Promise<Card[]> {
    const cardPersistences = this.cards.filter(
      (card) => card.userId === userId
    );

    return this.mapper.bulkToDomain(cardPersistences);
  }

  public async find(id: string): Promise<Card | null> {
    const isCard = this.cards.find((card) => card.id === id);

    if (!isCard) {
      return null;
    }

    return this.mapper.toDomain(isCard);
  }

  public async remove(id: string): Promise<Card | null> {
    throw new Error("Method not implemented.");
  }
}
