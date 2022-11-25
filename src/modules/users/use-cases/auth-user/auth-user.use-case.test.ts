import { CustomError } from "@core/logic/error";
import { faker } from "@faker-js/faker";
import { InMemoryUserRepo } from "@modules/users/repositories/implements/in-memory-user-repo";
import { UserRepo } from "@modules/users/repositories/interfaces/user-repo";
import { CreateUserDTO } from "@shared/dtos/users/create-user.dto";
import { CreateUserUseCase } from "../create-user/create-user.use-case";
import { AuthUserUseCase } from "./auth-user.use-case";

function createFakeUserDTO(): CreateUserDTO {
  return {
    name: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(6),
  };
}

describe("auth user use-case", () => {
  let userRepo: UserRepo;
  let sutUser: CreateUserUseCase;
  let sut: AuthUserUseCase;

  beforeEach(() => {
    userRepo = new InMemoryUserRepo();
    sutUser = new CreateUserUseCase(userRepo);
    sut = new AuthUserUseCase(userRepo);
  });

  it("should authenticate an user", async () => {
    const createUserReq = createFakeUserDTO();
    await sutUser.create(createUserReq);

    const result = await sut.login({
      email: createUserReq.email,
      password: createUserReq.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("should throw an error if user[email] does not exist", async () => {
    const createUserReq = createFakeUserDTO();

    await expect(
      sut.login({
        email: createUserReq.email,
        password: createUserReq.password,
      })
    ).rejects.toEqual(
      new CustomError("error_not_found", "user[email] not found")
    );
  });

  it("should throw an error if user[password] is wrong", async () => {
    const createUserReq = createFakeUserDTO();
    await sutUser.create(createUserReq);

    await expect(
      sut.login({
        email: createUserReq.email,
        password: faker.internet.password(7),
      })
    ).rejects.toEqual(
      new CustomError("error_bad_request", "user[password] is wrong")
    );
  });
});
