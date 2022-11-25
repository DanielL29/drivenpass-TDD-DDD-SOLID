import { userRepoInMemory } from "@modules/users/infra/http/in-memory";
import { AuthUserController } from "./auth-user.controller";
import { AuthUserUseCase } from "./auth-user.use-case";

function authUserControllerFactory() {
  const useCase = new AuthUserUseCase(userRepoInMemory);

  return new AuthUserController(useCase);
}

export const authUserController = authUserControllerFactory();
