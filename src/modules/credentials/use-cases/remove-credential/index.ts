import { RemoveCredentialUseCase } from "./remove-credential.use-case";
import { RemoveCredentialController } from "./remove-credential.controller";
import { PrismaCredentialRepo } from "@modules/credentials/repositories/implements/prisma-credential-repo";
import { prisma } from "@infra/prisma/config";

function removeCredentialControllerFactory() {
  const repo = new PrismaCredentialRepo(prisma);
  const useCase = new RemoveCredentialUseCase(repo);

  return new RemoveCredentialController(useCase);
}

export const removeCredentialController = removeCredentialControllerFactory();
