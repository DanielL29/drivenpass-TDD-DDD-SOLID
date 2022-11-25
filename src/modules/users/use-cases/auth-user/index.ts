import { prisma } from "@infra/prisma/config";
import { PrismaUserRepo } from "@modules/users/repositories/implements/prisma-user-repo";
import { AuthUserController } from "./auth-user.controller";
import { AuthUserUseCase } from "./auth-user.use-case";

function authUserControllerFactory() {
  const userRepo = new PrismaUserRepo(prisma);
  const useCase = new AuthUserUseCase(userRepo);

  return new AuthUserController(useCase);
}

export const authUserController = authUserControllerFactory();
