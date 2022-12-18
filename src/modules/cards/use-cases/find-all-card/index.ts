import { cardRepoInMemory } from "@modules/cards/infra/http/in-memory";
import { FindAllCardController } from "./find-all-card.controller";
import { FindAllCardUseCase } from "./find-all-card.use-case";

function findAllCardControllerFactory() {
  const repo = cardRepoInMemory;
  const useCase = new FindAllCardUseCase(repo);

  return new FindAllCardController(useCase);
}

export const findAllCardController = findAllCardControllerFactory();
