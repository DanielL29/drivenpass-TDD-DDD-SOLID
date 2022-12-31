import { prisma } from "@infra/prisma/config";
import { PrismaWifiRepo } from "@modules/wifis/repositories/implements/prisma-wifi-repo";
import { CreateWifiController } from "./create-wifi.controller";
import { CreateWifiUseCase } from "./create-wifi.use-case";

function createWifiControllerFactory() {
  const repo = new PrismaWifiRepo(prisma);
  const useCase = new CreateWifiUseCase(repo);

  return new CreateWifiController(useCase);
}

export const createWifiController = createWifiControllerFactory();
