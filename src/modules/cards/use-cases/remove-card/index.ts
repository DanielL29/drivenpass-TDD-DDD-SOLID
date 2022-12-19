import { cardRepoInMemory } from "@modules/cards/infra/http/in-memory";
import { RemoveCardController } from "./remove-card.controller";
import { RemoveCardUseCase } from "./remove-card.use-case";

function removeCardControllerFactory() {
  const repo = cardRepoInMemory;
  const useCase = new RemoveCardUseCase(repo);

  return new RemoveCardController(useCase);
}

export const removeCardController = removeCardControllerFactory();
