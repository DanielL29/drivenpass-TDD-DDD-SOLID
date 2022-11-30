import { CustomError } from "@core/logic/error";
import { faker } from "@faker-js/faker";
import { InMemoryCredentialRepo } from "@modules/credentials/repositories/implements/in-memory-credential-repo";
import { CredentialRepo } from "@modules/credentials/repositories/interfaces/credential-repo";
import { InMemoryUserRepo } from "@shared/modules/users/repositories/implements/in-memory-user-repo";
import { UserRepo } from "@shared/modules/users/repositories/interfaces/user-repo";
import { CreateUserUseCase } from "@shared/modules/users/use-cases/create-user/create-user.use-case";
import { CreateCredentialDTO } from "@shared/dtos/credentials/create-credential.dto";
import { CreateUserDTO } from "@shared/dtos/users/create-user.dto";
import { CreateCredentialUseCase } from "./create-credential.use-case";

function createFakeCredentialDTO(): CreateCredentialDTO {
  return {
    title: faker.random.word(),
    url: faker.internet.url(),
    name: faker.lorem.word(),
    password: faker.internet.password(6),
  };
}

function createFakeUserDTO(): CreateUserDTO {
  return {
    name: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(6),
  };
}

describe("create user use-case", () => {
  let credentialRepo: CredentialRepo;
  let userRepo: UserRepo;
  let sutUser: CreateUserUseCase;
  let sut: CreateCredentialUseCase;

  beforeEach(() => {
    credentialRepo = new InMemoryCredentialRepo();
    userRepo = new InMemoryUserRepo();
    sutUser = new CreateUserUseCase(userRepo);
    sut = new CreateCredentialUseCase(credentialRepo);
  });

  it("should create a credential", async () => {
    const createCredentialReq = createFakeCredentialDTO();
    const createUserReq = createFakeUserDTO();
    const user = await sutUser.execute(createUserReq);

    const result = await sut.execute(createCredentialReq, user.id);

    expect(result).toHaveProperty("id");
  });

  it("should throw an error if credential[title] is already registered", async () => {
    const createCredentialReq = createFakeCredentialDTO();
    const createUserReq = createFakeUserDTO();
    const user = await sutUser.execute(createUserReq);
    await sut.execute(createCredentialReq, user.id);

    await expect(sut.execute(createCredentialReq, user.id)).rejects.toEqual(
      new CustomError(
        "error_conflict",
        "credential[title] is already registered"
      )
    );
  });
});
