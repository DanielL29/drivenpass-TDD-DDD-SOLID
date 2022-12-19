import { prisma } from "@infra/prisma/config";
import { PrismaCardRepo } from "@modules/cards/repositories/implements/prisma-card.repo";
import { FindCardController } from "./find-card.controller";
import { FindCardUseCase } from "./find-card.use-case";

function findCardControllerFactory() {
  const repo = new PrismaCardRepo(prisma);
  const useCase = new FindCardUseCase(repo);

  return new FindCardController(useCase);
}

export const findCardController = findCardControllerFactory();
