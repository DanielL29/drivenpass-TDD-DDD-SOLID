import { faker } from "@faker-js/faker";
import { Card } from "@modules/cards/domain/card";
import { InMemoryCardRepo } from "@modules/cards/repositories/implements/in-memory-card-repo";
import { createFakeCardDTO } from "../create-fake-card-factory";
import { FindAllCardUseCase } from "./find-all-card.use-case";

describe("find all card use case", () => {
  let repo: InMemoryCardRepo;
  let sut: FindAllCardUseCase;

  beforeEach(() => {
    repo = new InMemoryCardRepo();
    sut = new FindAllCardUseCase(repo);
  });

  it("should find all user cards in an array", async () => {
    const createCardReq = createFakeCardDTO();
    const userId = faker.datatype.uuid();
    const card = Card.create(createCardReq, userId);
    await repo.create(card);

    const result = await sut.execute(undefined, userId);

    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(1);
    expect(result[0]).toHaveProperty("id");
    expect(result[0].id).toEqual(card._id);
  });
});
