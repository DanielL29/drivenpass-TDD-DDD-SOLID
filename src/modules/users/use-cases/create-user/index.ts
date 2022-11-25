import { prisma } from "@infra/prisma/config";
import { PrismaUserRepo } from "@modules/users/repositories/implements/prisma-user-repo";
import { CreateUserController } from "./create-user.controller";
import { CreateUserUseCase } from "./create-user.use-case";

function createUserControllerFactory() {
  const userRepo = new PrismaUserRepo(prisma);
  const useCase = new CreateUserUseCase(userRepo);

  return new CreateUserController(useCase);
}

export const createUserController = createUserControllerFactory();
