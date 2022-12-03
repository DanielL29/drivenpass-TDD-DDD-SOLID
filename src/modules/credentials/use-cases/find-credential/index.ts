import { FindCredentialUseCase } from "./find-credential.use-case";
import { FindCredentialController } from "./find-credential.controller";
import { PrismaCredentialRepo } from "@modules/credentials/repositories/implements/prisma-credential-repo";
import { prisma } from "@infra/prisma/config";

function findCredentialControllerFactory() {
  const repo = new PrismaCredentialRepo(prisma);
  const useCase = new FindCredentialUseCase(repo);

  return new FindCredentialController(useCase);
}

export const findCredentialController = findCredentialControllerFactory();
