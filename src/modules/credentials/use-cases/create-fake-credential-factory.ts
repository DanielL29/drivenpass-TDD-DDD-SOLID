import { faker } from "@faker-js/faker";
import { CreateCredentialDTO } from "@shared/dtos/credentials/create-credential.dto";

export function createFakeCredentialDTO(): CreateCredentialDTO {
  return {
    title: faker.random.word(),
    url: faker.internet.url(),
    name: faker.lorem.word(),
    password: faker.internet.password(6),
  };
}
