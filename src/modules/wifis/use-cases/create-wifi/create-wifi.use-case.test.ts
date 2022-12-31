import { CustomError } from "@core/logic/error";
import { faker } from "@faker-js/faker";
import { InMemoryWifiRepo } from "@modules/wifis/repositories/implements/in-memory-wifi-repo";
import Cryptr from "cryptr";
import { createFakeWifiDTO } from "../create-fake-wifi-factory";
import { CreateWifiUseCase } from "./create-wifi.use-case";

describe("create wifi use case", () => {
  let repo: InMemoryWifiRepo;
  let sut: CreateWifiUseCase;

  beforeEach(() => {
    repo = new InMemoryWifiRepo();
    sut = new CreateWifiUseCase(repo);
  });

  it("should create a user wifi", async () => {
    const createWifiReq = createFakeWifiDTO();
    const userId = faker.datatype.uuid();

    const result = await sut.execute(createWifiReq, userId);

    expect(result).toHaveProperty("id");
  });

  it("should throw an error if user wifi[title] is already registered", async () => {
    const createWifiReq = createFakeWifiDTO();
    const userId = faker.datatype.uuid();

    await sut.execute(createWifiReq, userId);

    await expect(sut.execute(createWifiReq, userId)).rejects.toEqual(
      new CustomError(
        "error_conflict",
        "user wifi[title] is already registered"
      )
    );
  });
});
