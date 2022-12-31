import { prisma } from "@infra/prisma/config";
import { PrismaWifiRepo } from "@modules/wifis/repositories/implements/prisma-wifi-repo";
import { FindAllWifiController } from "./find-all-wifi.controller";
import { FindAllWifiUseCase } from "./find-all-wifi.use-case";

function findAllWifiControllerFactory() {
  const repo = new PrismaWifiRepo(prisma);
  const useCase = new FindAllWifiUseCase(repo);

  return new FindAllWifiController(useCase);
}

export const findAllWifiController = findAllWifiControllerFactory();
