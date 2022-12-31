import { faker } from "@faker-js/faker";
import { InMemoryWifiRepo } from "@modules/wifis/repositories/implements/in-memory-wifi-repo";
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
});
