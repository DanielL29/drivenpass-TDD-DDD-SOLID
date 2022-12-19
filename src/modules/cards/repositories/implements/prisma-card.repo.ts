import { PrismaDatabase } from "@infra/prisma/config";
import { Card } from "@modules/cards/domain/card";
import { CardMapper } from "@modules/cards/mappers/card-mapper";
import { CardRepo } from "../interfaces/card-repo";

export class PrismaCardRepo implements CardRepo {
  private readonly prisma: PrismaDatabase;
  private readonly mapper: CardMapper;

  constructor(prisma: PrismaDatabase) {
    this.prisma = prisma;
    this.mapper = new CardMapper();
  }

  public async findByTitle(
    title: string,
    userId: string
  ): Promise<Card | null> {
    const card = await this.prisma.card.findUnique({
      where: { title_userId: { title, userId } },
    });

    if (!card) {
      return null;
    }

    return this.mapper.toDomain(card);
  }

  public async create(domainCard: Card): Promise<Card> {
    const data = this.mapper.toPersistence(domainCard);

    const card = await this.prisma.card.create({ data });

    return this.mapper.toDomain(card);
  }

  public async findAll(userId: string): Promise<Card[]> {
    const cards = await this.prisma.card.findMany({
      where: { userId },
    });

    return this.mapper.bulkToDomain(cards);
  }

  public async find(id: string): Promise<Card | null> {
    const card = await this.prisma.card.findUnique({
      where: { id },
    });

    if (!card) {
      return null;
    }

    return this.mapper.toDomain(card);
  }

  public async remove(id: string): Promise<Card | null> {
    const card = await this.prisma.card.delete({ where: { id } });

    return this.mapper.toDomain(card);
  }
}
