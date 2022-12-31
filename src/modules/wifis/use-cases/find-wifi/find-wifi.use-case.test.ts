import { CustomError } from "@core/logic/error";
import { faker } from "@faker-js/faker";
import { Wifi } from "@modules/wifis/domain/wifi";
import { InMemoryWifiRepo } from "@modules/wifis/repositories/implements/in-memory-wifi-repo";
import { WifiRepo } from "@modules/wifis/repositories/interfaces/wifi-repo";
import { createFakeWifiDTO } from "../create-fake-wifi-factory";
import { FindWifiUseCase } from "./find-wifi.use-case";

describe("find wifi use case", () => {
  let repo: WifiRepo;
  let sut: FindWifiUseCase;

  beforeEach(() => {
    repo = new InMemoryWifiRepo();
    sut = new FindWifiUseCase(repo);
  });

  it("should find a user wifi", async () => {
    const createUserReq = createFakeWifiDTO();
    const userId = faker.datatype.uuid();
    const wifi = Wifi.create(createUserReq, userId);
    await repo.create(wifi);

    const result = await sut.execute(wifi._id);

    expect(result).toHaveProperty("id");
    expect(result.id).toEqual(wifi._id);
  });

  it("should throw an error if not found user wifi", async () => {
    const wifiId = faker.datatype.uuid();

    await expect(sut.execute(wifiId)).rejects.toEqual(
      new CustomError(
        "error_not_found",
        "user wifi not found or wifi does not belong to user"
      )
    );
  });
});
