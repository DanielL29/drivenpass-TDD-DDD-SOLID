import { prisma } from "@infra/prisma/config";
import { PrismaCardRepo } from "@modules/cards/repositories/implements/prisma-card.repo";
import { FindAllCardController } from "./find-all-card.controller";
import { FindAllCardUseCase } from "./find-all-card.use-case";

function findAllCardControllerFactory() {
  const repo = new PrismaCardRepo(prisma);
  const useCase = new FindAllCardUseCase(repo);

  return new FindAllCardController(useCase);
}

export const findAllCardController = findAllCardControllerFactory();
