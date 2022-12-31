import { CustomError } from "@core/logic/error";
import { faker } from "@faker-js/faker";
import { Wifi } from "@modules/wifis/domain/wifi";
import { InMemoryWifiRepo } from "@modules/wifis/repositories/implements/in-memory-wifi-repo";
import { createFakeWifiDTO } from "../create-fake-wifi-factory";
import { RemoveWifiUseCase } from "./remove-wifi.use-case";

describe("remove wifi use case", () => {
  let repo: InMemoryWifiRepo;
  let sut: RemoveWifiUseCase;

  beforeEach(() => {
    repo = new InMemoryWifiRepo();
    sut = new RemoveWifiUseCase(repo);
  });

  it("should remove a user wifi", async () => {
    const createWifiDTO = createFakeWifiDTO();
    const userId = faker.datatype.uuid();
    const wifi = Wifi.create(createWifiDTO, userId);
    await repo.create(wifi);

    const result = await sut.execute(wifi._id);

    expect(result).toHaveProperty("id");
  });

  it("should throw an error if not found user wifi", async () => {
    const createWifiDTO = createFakeWifiDTO();
    const userId = faker.datatype.uuid();
    const wifi = Wifi.create(createWifiDTO, userId);

    await expect(sut.execute(wifi._id)).rejects.toEqual(
      new CustomError(
        "error_not_found",
        "user wifi not found or wifi does not belong to user"
      )
    );
  });
});
