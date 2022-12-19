import { CustomError } from "@core/logic/error";
import { faker } from "@faker-js/faker";
import { Card } from "@modules/cards/domain/card";
import { InMemoryCardRepo } from "@modules/cards/repositories/implements/in-memory-card-repo";
import { CardRepo } from "@modules/cards/repositories/interfaces/card-repo";
import { createFakeCardDTO } from "../create-fake-card-factory";
import { FindCardUseCase } from "./find-card.use-case";

describe("find card use case", () => {
  let repo: CardRepo;
  let sut: FindCardUseCase;

  beforeEach(() => {
    repo = new InMemoryCardRepo();
    sut = new FindCardUseCase(repo);
  });

  it("should find a user card", async () => {
    const createCardReq = createFakeCardDTO();
    const userId = faker.datatype.uuid();
    const card = Card.create(createCardReq, userId);
    await repo.create(card);

    const result = await sut.execute(card._id);

    expect(result).toHaveProperty("id");
    expect(result.id).toEqual(card._id);
  });

  it("should throw an error if not found user card", async () => {
    const createCardReq = createFakeCardDTO();
    const userId = faker.datatype.uuid();
    const card = Card.create(createCardReq, userId);

    await expect(sut.execute(card._id)).rejects.toEqual(
      new CustomError(
        "error_not_found",
        "user card not found or does not belong to user"
      )
    );
  });
});
