import { prisma } from "@infra/prisma/config";
import { PrismaCardRepo } from "@modules/cards/repositories/implements/prisma-card.repo";
import { RemoveCardController } from "./remove-card.controller";
import { RemoveCardUseCase } from "./remove-card.use-case";

function removeCardControllerFactory() {
  const repo = new PrismaCardRepo(prisma);
  const useCase = new RemoveCardUseCase(repo);

  return new RemoveCardController(useCase);
}

export const removeCardController = removeCardControllerFactory();
