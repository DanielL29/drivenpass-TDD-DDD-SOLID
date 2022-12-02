import { CustomError } from "@core/logic/error";
import { faker } from "@faker-js/faker";
import { Credential } from "@modules/credentials/domain/credential";
import { InMemoryCredentialRepo } from "@modules/credentials/repositories/implements/in-memory-credential-repo";
import { CredentialRepo } from "@modules/credentials/repositories/interfaces/credential-repo";
import { createFakeCredentialDTO } from "../create-fake-credential-factory";
import { RemoveCredentialUseCase } from "./remove-credential.use-case";

describe("remove credential use case", () => {
  let repo: CredentialRepo;
  let sut: RemoveCredentialUseCase;

  beforeEach(() => {
    repo = new InMemoryCredentialRepo();
    sut = new RemoveCredentialUseCase(repo);
  });

  it("should remove a user credential", async () => {
    const createCredentialReq = createFakeCredentialDTO();
    const userId = faker.datatype.uuid();
    const credential = Credential.create(createCredentialReq, userId);
    await repo.create(credential);

    const result = await sut.execute(credential._id, userId);

    expect(result).toHaveProperty("id");
    expect(result.id).toEqual(credential._id);
  });

  it("should throw an error if user credential was not found", async () => {
    const createCredentialReq = createFakeCredentialDTO();
    const userId = faker.datatype.uuid();
    const credential = Credential.create(createCredentialReq, userId);

    await expect(sut.execute(credential._id, userId)).rejects.toEqual(
      new CustomError(
        "error_not_found",
        "user credential not found or credential does not belong to user"
      )
    );
  });
});
