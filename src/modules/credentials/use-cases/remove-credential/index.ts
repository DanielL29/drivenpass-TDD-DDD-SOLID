import { credentialRepoInMemory } from "@modules/credentials/infra/http/in-memory";
import { RemoveCredentialUseCase } from "./remove-credential.use-case";
import { RemoveCredentialController } from "./remove-credential.controller";

function removeCredentialControllerFactory() {
  const repo = credentialRepoInMemory;
  const useCase = new RemoveCredentialUseCase(repo);

  return new RemoveCredentialController(useCase);
}

export const removeCredentialController = removeCredentialControllerFactory();
