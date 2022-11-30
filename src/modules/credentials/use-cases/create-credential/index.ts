import { credentialRepoInMemory } from "@modules/credentials/infra/http/in-memory";
import { CreateCredentialUseCase } from "./create-credential.use-case";
import { CreateCredentialController } from "./create-credential.controller";

function createCredentialControllerFactory() {
  const useCase = new CreateCredentialUseCase(credentialRepoInMemory);

  return new CreateCredentialController(useCase);
}

export const createCredentialController = createCredentialControllerFactory();
