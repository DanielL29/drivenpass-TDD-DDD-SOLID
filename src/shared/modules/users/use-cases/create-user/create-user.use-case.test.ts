import { CustomError } from "@core/logic/error";
import { faker } from "@faker-js/faker";
import { InMemoryUserRepo } from "@shared/modules/users/repositories/implements/in-memory-user-repo";
import { UserRepo } from "@shared/modules/users/repositories/interfaces/user-repo";
import { CreateUserDTO } from "@shared/dtos/users/create-user.dto";
import { CreateUserUseCase } from "./create-user.use-case";

function createFakeUserDTO(): CreateUserDTO {
  return {
    name: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(6),
  };
}

describe("create user use-case", () => {
  let userRepo: UserRepo;
  let sut: CreateUserUseCase;

  beforeEach(() => {
    userRepo = new InMemoryUserRepo();
    sut = new CreateUserUseCase(userRepo);
  });

  it("should create an user", async () => {
    const createUserReq = createFakeUserDTO();

    const result = await sut.execute(createUserReq);

    expect(result).toHaveProperty("id");
  });

  it("should throw an error if user already exists", async () => {
    const createUserReq = createFakeUserDTO();
    await sut.execute(createUserReq);

    await expect(sut.execute(createUserReq)).rejects.toEqual(
      new CustomError("error_conflict", "user[email] is already registered")
    );
  });
});
