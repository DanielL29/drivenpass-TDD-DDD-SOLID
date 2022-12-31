import { faker } from "@faker-js/faker";
import { CreateWifiProps } from "../domain/wifi";

export function createFakeWifiDTO(): CreateWifiProps {
  return {
    title: faker.lorem.word(5),
    name: faker.lorem.word(5),
    password: faker.lorem.word(6),
  };
}
