import { CustomError } from "@core/logic/error";
import { faker } from "@faker-js/faker";
import { InMemoryCardRepo } from "@modules/cards/repositories/implements/in-memory-card-repo";
import { createFakeCardDTO } from "../create-fake-card-factory";
import { CreateCardUseCase } from "./create-card.use-case";

describe("create card use case", () => {
  let repo: InMemoryCardRepo;
  let sut: CreateCardUseCase;

  beforeEach(() => {
    repo = new InMemoryCardRepo();
    sut = new CreateCardUseCase(repo);
  });

  it("should create a user card", async () => {
    const createCardReq = createFakeCardDTO();
    const userId = faker.datatype.uuid();

    const result = await sut.execute(createCardReq, userId);

    expect(result).toHaveProperty("id");
  });

  it("should throw an error if user card[title] is already registered", async () => {
    const createCardReq = createFakeCardDTO();
    const userId = faker.datatype.uuid();
    await sut.execute(createCardReq, userId);

    await expect(sut.execute(createCardReq, userId)).rejects.toEqual(
      new CustomError(
        "error_conflict",
        "user card[title] is already registered"
      )
    );
  });
});
