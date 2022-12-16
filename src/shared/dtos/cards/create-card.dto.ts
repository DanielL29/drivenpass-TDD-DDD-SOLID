import { CardTypes } from "@modules/cards/domain/card";

export interface CreateCardDTO {
  title: string;
  number: string;
  name: string;
  securityCode: string;
  expirationDate: string;
  password: string;
  isVirtual: boolean;
  type: CardTypes;
}
