import { cardRepoInMemory } from "@modules/cards/infra/http/in-memory";
import { FindCardController } from "./find-card.controller";
import { FindCardUseCase } from "./find-card.use-case";

function findCardControllerFactory() {
  const repo = cardRepoInMemory;
  const useCase = new FindCardUseCase(repo);

  return new FindCardController(useCase);
}

export const findCardController = findCardControllerFactory();
