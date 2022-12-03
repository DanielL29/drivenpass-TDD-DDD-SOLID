import { CreateCredentialUseCase } from "./create-credential.use-case";
import { CreateCredentialController } from "./create-credential.controller";
import { PrismaCredentialRepo } from "@modules/credentials/repositories/implements/prisma-credential-repo";
import { prisma } from "@infra/prisma/config";

function createCredentialControllerFactory() {
  const repo = new PrismaCredentialRepo(prisma);
  const useCase = new CreateCredentialUseCase(repo);

  return new CreateCredentialController(useCase);
}

export const createCredentialController = createCredentialControllerFactory();
