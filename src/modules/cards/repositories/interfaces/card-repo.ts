import { Repository } from "@core/infra/repository";
import { Card, CardTypes } from "@modules/cards/domain/card";

export interface CardPersistence {
  id: string;
  title: string;
  number: string;
  name: string;
  securityCode: string;
  expirationDate: string;
  password: string;
  isVirtual: boolean;
  type: CardTypes;
  userId: string;
  createdAt: Date;
}

export interface CardRepo extends Repository<Card> {
  findByTitle(title: string, userId: string): Promise<Card | null>;
}
