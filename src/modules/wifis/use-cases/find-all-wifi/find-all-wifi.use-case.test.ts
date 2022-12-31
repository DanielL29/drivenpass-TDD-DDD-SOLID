import { faker } from "@faker-js/faker";
import { Wifi } from "@modules/wifis/domain/wifi";
import { InMemoryWifiRepo } from "@modules/wifis/repositories/implements/in-memory-wifi-repo";
import { WifiRepo } from "@modules/wifis/repositories/interfaces/wifi-repo";
import { createFakeWifiDTO } from "../create-fake-wifi-factory";
import { FindAllWifiUseCase } from "./find-all-wifi.use-case";

describe("find all wifi use case", () => {
  let repo: WifiRepo;
  let sut: FindAllWifiUseCase;

  beforeEach(() => {
    repo = new InMemoryWifiRepo();
    sut = new FindAllWifiUseCase(repo);
  });

  it("should find all user wifis", async () => {
    const createWifiReq = createFakeWifiDTO();
    const userId = faker.datatype.uuid();
    const wifi = Wifi.create(createWifiReq, userId);
    await repo.create(wifi);

    const result = await sut.execute(undefined, userId);

    expect(result).toBeInstanceOf(Array);
    expect(result[0].id).toEqual(wifi._id);
  });
});
