import { CustomError } from "@core/logic/error";
import { faker } from "@faker-js/faker";
import { InMemoryCredentialRepo } from "@modules/credentials/repositories/implements/in-memory-credential-repo";
import { CredentialRepo } from "@modules/credentials/repositories/interfaces/credential-repo";
import { createFakeCredentialDTO } from "../create-fake-credential-factory";
import { CreateCredentialUseCase } from "./create-credential.use-case";

describe("create user use-case", () => {
  let credentialRepo: CredentialRepo;
  let sut: CreateCredentialUseCase;

  beforeEach(() => {
    credentialRepo = new InMemoryCredentialRepo();
    sut = new CreateCredentialUseCase(credentialRepo);
  });

  it("should create a credential", async () => {
    const createCredentialReq = createFakeCredentialDTO();
    const userId = faker.datatype.uuid();

    const result = await sut.execute(createCredentialReq, userId);

    expect(result).toHaveProperty("id");
  });

  it("should throw an error if credential[title] is already registered", async () => {
    const createCredentialReq = createFakeCredentialDTO();
    const userId = faker.datatype.uuid();
    await sut.execute(createCredentialReq, userId);

    await expect(sut.execute(createCredentialReq, userId)).rejects.toEqual(
      new CustomError(
        "error_conflict",
        "credential[title] is already registered"
      )
    );
  });
});
