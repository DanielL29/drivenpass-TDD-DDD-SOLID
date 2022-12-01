import { faker } from "@faker-js/faker";
import { CredentialRepo } from "@modules/credentials/repositories/interfaces/credential-repo";
import { InMemoryCredentialRepo } from "@modules/credentials/repositories/implements/in-memory-credential-repo";
import { FindAllCredentialUseCase } from "./findAll-credential.use-case";
import { Credential } from "@modules/credentials/domain/credential";
import { createFakeCredentialDTO } from "../create-fake-credential-factory";

describe("find all credential use case", () => {
  let credentialRepo: CredentialRepo;
  let sut: FindAllCredentialUseCase;
  let userId = faker.datatype.uuid();

  beforeEach(async () => {
    credentialRepo = new InMemoryCredentialRepo();
    sut = new FindAllCredentialUseCase(credentialRepo);
  });

  it("should return an array of credential", async () => {
    const createCredentialReq = createFakeCredentialDTO();
    const credential = Credential.create(createCredentialReq, userId);
    await credentialRepo.create(credential);

    const result = await sut.execute(undefined, userId);

    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(1);
    expect(result[0]).toHaveProperty("id");
  });
});
