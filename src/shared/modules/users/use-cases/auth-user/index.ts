import { prisma } from "@infra/prisma/config";
import { PrismaUserRepo } from "@shared/modules/users/repositories/implements/prisma-user-repo";
import { userRepoInMemory } from "../../infra/http/in-memory";
import { AuthUserController } from "./auth-user.controller";
import { AuthUserUseCase } from "./auth-user.use-case";

function authUserControllerFactory() {
  // const userRepo = new PrismaUserRepo(prisma);
  const userRepo = userRepoInMemory;
  const useCase = new AuthUserUseCase(userRepo);

  return new AuthUserController(useCase);
}

export const authUserController = authUserControllerFactory();
