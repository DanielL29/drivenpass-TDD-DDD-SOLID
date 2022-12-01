import { credentialRepoInMemory } from "@modules/credentials/infra/http/in-memory";
import { FindCredentialUseCase } from "./find-credential.use-case";
import { FindCredentialController } from "./find-credential.controller";

function findCredentialControllerFactory() {
  const repo = credentialRepoInMemory;
  const useCase = new FindCredentialUseCase(repo);

  return new FindCredentialController(useCase);
}

export const findCredentialController = findCredentialControllerFactory();
