import { cardRepoInMemory } from "@modules/cards/infra/http/in-memory";
import { CreateCardController } from "./create-card.controller";
import { CreateCardUseCase } from "./create-card.use-case";

function createCardControllerFactory() {
  const repo = cardRepoInMemory;
  const useCase = new CreateCardUseCase(repo);

  return new CreateCardController(useCase);
}

export const createCardController = createCardControllerFactory();
