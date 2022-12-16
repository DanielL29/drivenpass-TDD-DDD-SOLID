import { Mapper } from "@core/infra/mapper";
import { CardDTO } from "@shared/dtos/cards/card.dto";
import dayjs from "dayjs";
import { Card } from "../domain/card";
import { CardPersistence } from "../repositories/interfaces/card-repo";

export class CardMapper implements Mapper<CardDTO, Card, CardPersistence> {
  public toDTO(domain: Card): CardDTO {
    return {
      id: domain._id,
      title: domain.title,
      number: domain.number,
      name: domain.name,
      securityCode: domain.decrypt("securityCode"),
      expirationDate: domain.expirationDate,
      password: domain.decrypt("password"),
      isVirtual: domain.isVirtual,
      type: domain.type,
      userId: domain.userId,
      registrationDay: dayjs(domain.props.createdAt).format("DD/MM/YYYY"),
    };
  }

  public toPersistence(domain: Card): CardPersistence {
    return {
      id: domain._id,
      title: domain.title,
      number: domain.number,
      name: domain.name,
      securityCode: domain.securityCode,
      expirationDate: domain.expirationDate,
      password: domain.password,
      isVirtual: domain.isVirtual,
      type: domain.type,
      userId: domain.userId,
      createdAt: domain.props.createdAt,
    };
  }

  public toDomain({
    id,
    title,
    number,
    name,
    securityCode,
    expirationDate,
    password,
    isVirtual,
    type,
    userId,
    createdAt,
  }: CardPersistence): Card {
    return new Card(
      {
        title,
        number,
        name,
        securityCode,
        expirationDate,
        password,
        isVirtual,
        type,
        userId,
        createdAt,
      },
      id
    );
  }

  public bulkToDomain(persistences: CardPersistence[]): Card[] {
    const mapper = new CardMapper();

    return persistences.map((persistence) => mapper.toDomain(persistence));
  }
  public bulkToDTO(domains: Card[]): CardDTO[] {
    const mapper = new CardMapper();

    return domains.map((domain) => mapper.toDTO(domain));
  }
}
