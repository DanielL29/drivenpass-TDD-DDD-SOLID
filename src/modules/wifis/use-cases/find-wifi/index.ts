import { prisma } from "@infra/prisma/config";
import { PrismaWifiRepo } from "@modules/wifis/repositories/implements/prisma-wifi-repo";
import { FindWifiController } from "./find-wifi.controller";
import { FindWifiUseCase } from "./find-wifi.use-case";

function findWifiControllerFactory() {
  const repo = new PrismaWifiRepo(prisma);
  const useCase = new FindWifiUseCase(repo);

  return new FindWifiController(useCase);
}

export const findWifiController = findWifiControllerFactory();
