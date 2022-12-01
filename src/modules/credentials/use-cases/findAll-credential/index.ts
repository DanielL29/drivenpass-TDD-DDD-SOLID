import { credentialRepoInMemory } from "@modules/credentials/infra/http/in-memory";
import { FindAllCredentialUseCase } from "./findAll-credential.use-case";
import { FindAllCredentialController } from "./findAll-credential.controller";

function findAllCredentialControllerFactory() {
  const repo = credentialRepoInMemory;
  const useCase = new FindAllCredentialUseCase(repo);

  return new FindAllCredentialController(useCase);
}

export const findAllCredentialController = findAllCredentialControllerFactory();
