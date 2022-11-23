import { userRepoInMemory } from "@modules/users/infra/http/in-memory";
import { CreateUserController } from "./create-user.controller";
import { CreateUserUseCase } from "./create-user.use-case";

function createUserControllerFactory() {
  const useCase = new CreateUserUseCase(userRepoInMemory);

  return new CreateUserController(useCase);
}

export const createUserController = createUserControllerFactory();
