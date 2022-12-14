import { FindAllCredentialUseCase } from "./find-all-credential.use-case";
import { FindAllCredentialController } from "./find-all-credential.controller";
import { PrismaCredentialRepo } from "@modules/credentials/repositories/implements/prisma-credential-repo";
import { prisma } from "@infra/prisma/config";

function findAllCredentialControllerFactory() {
  const repo = new PrismaCredentialRepo(prisma);
  const useCase = new FindAllCredentialUseCase(repo);

  return new FindAllCredentialController(useCase);
}

export const findAllCredentialController = findAllCredentialControllerFactory();
