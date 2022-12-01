import { faker } from "@faker-js/faker";
import { CreateCredentialDTO } from "@shared/dtos/credentials/create-credential.dto";
import { CredentialRepo } from "@modules/credentials/repositories/interfaces/credential-repo";
import { InMemoryCredentialRepo } from "@modules/credentials/repositories/implements/in-memory-credential-repo";
import { FindAllCredentialUseCase } from "./findAll-credential.use-case";
import { Credential } from "@modules/credentials/domain/credential";

function createFakeCredentialDTO(): CreateCredentialDTO {
  return {
    title: faker.random.word(),
    url: faker.internet.url(),
    name: faker.lorem.word(),
    password: faker.internet.password(6),
  };
}

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
    const credential = Credential.create(createCredentialReq, userId, false);
    await credentialRepo.create(credential);

    const result = await sut.execute(undefined, userId);

    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(1);
    expect(result[0]).toHaveProperty("id");
  });
});
