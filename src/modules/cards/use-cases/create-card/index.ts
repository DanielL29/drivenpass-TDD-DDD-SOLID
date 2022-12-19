import { prisma } from "@infra/prisma/config";
import { PrismaCardRepo } from "@modules/cards/repositories/implements/prisma-card.repo";
import { CreateCardController } from "./create-card.controller";
import { CreateCardUseCase } from "./create-card.use-case";

function createCardControllerFactory() {
  const repo = new PrismaCardRepo(prisma);
  const useCase = new CreateCardUseCase(repo);

  return new CreateCardController(useCase);
}

export const createCardController = createCardControllerFactory();
