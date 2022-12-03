import { CustomError } from "@core/logic/error";
import { faker } from "@faker-js/faker";
import { Credential } from "@modules/credentials/domain/credential";
import { InMemoryCredentialRepo } from "@modules/credentials/repositories/implements/in-memory-credential-repo";
import { CredentialRepo } from "@modules/credentials/repositories/interfaces/credential-repo";
import { createFakeCredentialDTO } from "../create-fake-credential-factory";
import { FindCredentialUseCase } from "./find-credential.use-case";

describe("find credential use case", () => {
  let repo: CredentialRepo;
  let sut: FindCredentialUseCase;

  beforeEach(() => {
    repo = new InMemoryCredentialRepo();
    sut = new FindCredentialUseCase(repo);
  });

  it("should find a existing user credential", async () => {
    const createCredentialReq = createFakeCredentialDTO();
    const userId = faker.datatype.uuid();
    const credential = Credential.create(createCredentialReq, userId);
    const createdCredential = await repo.create(credential);

    const result = await sut.execute(createdCredential._id);

    expect(result).toHaveProperty("id");
    expect(result.id).toEqual(createdCredential._id);
  });

  it("should throw an error if not found user credential", async () => {
    const credentialId = faker.datatype.uuid();

    await expect(sut.execute(credentialId)).rejects.toEqual(
      new CustomError(
        "error_not_found",
        "user credential not found or credential does not belong to user"
      )
    );
  });
});
