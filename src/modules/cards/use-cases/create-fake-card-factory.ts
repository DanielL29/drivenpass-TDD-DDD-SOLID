import { faker } from "@faker-js/faker";
import { CreateCardDTO } from "@shared/dtos/cards/create-card.dto";
import dayjs from "dayjs";

export function createFakeCardDTO(): CreateCardDTO {
  return {
    title: faker.lorem.word(5),
    number: faker.finance.creditCardNumber("################"),
    name: faker.lorem.word(4),
    securityCode: faker.finance.creditCardCVV(),
    expirationDate: dayjs().format("MM/YY"),
    password: faker.random.numeric(4),
    isVirtual: false,
    type: "CREDIT",
  };
}
