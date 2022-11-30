import { prisma } from "@infra/prisma/config";
import { PrismaUserRepo } from "@shared/modules/users/repositories/implements/prisma-user-repo";
import { userRepoInMemory } from "../../infra/http/in-memory";
import { CreateUserController } from "./create-user.controller";
import { CreateUserUseCase } from "./create-user.use-case";

function createUserControllerFactory() {
  // const userRepo = new PrismaUserRepo(prisma);
  const userRepo = userRepoInMemory;
  const useCase = new CreateUserUseCase(userRepo);

  return new CreateUserController(useCase);
}

export const createUserController = createUserControllerFactory();
